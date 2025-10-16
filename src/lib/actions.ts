"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Appointment } from "./types";

// --- IN-MEMORY DATABASE ---
// NOTE: This is a non-persistent in-memory store. Data will be lost on server restart.
// For production, replace this with a real database (e.g., Firebase Firestore, PostgreSQL).
let appointments: Appointment[] = [];
const MAX_APPOINTMENTS_PER_DAY = 5;

const appointmentSchema = z.object({
  clientName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  clientEmail: z.string().email({ message: "Por favor, insira um email válido." }),
  date: z.string(),
  time: z.string(),
  service: z.string(),
});

// --- APPOINTMENT ACTIONS ---

export async function getAppointments() {
  return appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getAppointmentById(id: string) {
  return appointments.find(appt => appt.id === id);
}

export async function getDailyBookingsCount() {
  const counts: Record<string, number> = {};
  appointments.forEach(appt => {
    counts[appt.date] = (counts[appt.date] || 0) + 1;
  });
  return counts;
}

export async function createAppointment(prevState: any, formData: FormData) {
  const validatedFields = appointmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'A validação falhou.',
    };
  }

  const { date } = validatedFields.data;
  const todaysBookings = appointments.filter(appt => appt.date === date).length;

  if (todaysBookings >= MAX_APPOINTMENTS_PER_DAY) {
    return { message: 'Este dia está totalmente reservado.' };
  }

  const newAppointment: Appointment = {
    id: crypto.randomUUID(),
    ...validatedFields.data,
  };

  appointments.push(newAppointment);
  revalidatePath('/book');
  revalidatePath('/admin/dashboard');
  redirect(`/my-appointment/${newAppointment.id}`);
}

export async function updateAppointment(id: string, prevState: any, formData: FormData) {
  const validatedFields = appointmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'A validação falhou.',
    };
  }
  
  const appointmentIndex = appointments.findIndex(appt => appt.id === id);
  if (appointmentIndex === -1) {
    return { message: 'Marcação não encontrada.' };
  }

  appointments[appointmentIndex] = { ...appointments[appointmentIndex], ...validatedFields.data };
  revalidatePath('/admin/dashboard');
  revalidatePath(`/my-appointment/${id}`);
  redirect(`/my-appointment/${id}?success=true`);
}

export async function deleteAppointment(id: string) {
  appointments = appointments.filter(appt => appt.id !== id);
  revalidatePath('/admin/dashboard');
  revalidatePath('/book');
}

export async function exportAppointments() {
  const data = await getAppointments();
  if (data.length === 0) return "Nenhuma marcação para exportar.";
  
  const headers = "id,clientName,clientEmail,date,time,service";
  const rows = data.map(appt => 
    `${appt.id},"${appt.clientName}","${appt.clientEmail}",${appt.date},${appt.time},"${appt.service}"`
  ).join("\n");

  return `${headers}\n${rows}`;
}


// --- AUTH ACTIONS ---

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { message: 'Dados inválidos.' };
  }

  const { username, password } = validatedFields.data;
  
  // IMPORTANT: This is NOT secure and for demonstration purposes only.
  // Use a proper auth library like NextAuth.js or Lucia in production.
  if (username === 'hairline' && password === 'HairLineStudio01') {
    cookies().set('is_admin', 'true', { httpOnly: true, path: '/' });
    redirect('/admin/dashboard');
  }

  return { message: 'Utilizador ou palavra-passe inválidos.' };
}

export async function logout() {
  cookies().delete('is_admin');
  redirect('/login');
}
