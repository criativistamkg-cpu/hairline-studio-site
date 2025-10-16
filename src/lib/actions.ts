'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import type { Appointment } from './types';
import { collection, getDocs, addDoc, getDoc, doc, updateDoc, deleteDoc, query, where, Timestamp } from 'firebase/firestore';
import { adminFirestore } from '@/firebase/server';

const appointmentSchema = z.object({
  clientName: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  clientEmail: z.string().email({ message: 'Por favor, insira um email válido.' }),
  date: z.string().refine((val) => val, { message: 'A data é obrigatória' }),
  time: z.string().refine((val) => val, { message: 'A hora é obrigatória' }),
  service: z.string().refine((val) => val, { message: 'O serviço é obrigatório' }),
});

const MAX_APPOINTMENTS_PER_DAY = 5;

const appointmentsCollection = collection(adminFirestore, 'appointments');


// --- APPOINTMENT ACTIONS ---

export async function getAppointments() {
    try {
        const snapshot = await getDocs(appointmentsCollection);
        const appointments: Appointment[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Appointment, 'id'>)
        }));
        return appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}


export async function getAppointmentById(id: string) {
    try {
        const docRef = doc(adminFirestore, 'appointments', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Appointment;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error("Error fetching appointment by id:", error);
        return undefined;
    }
}

export async function getDailyBookingsCount() {
    try {
        const snapshot = await getDocs(appointmentsCollection);
        const counts: Record<string, number> = {};
        snapshot.forEach(doc => {
            const apptData = doc.data();
            if(apptData.date) {
                 // Ensure date is in YYYY-MM-DD format
                const dateStr = apptData.date.split('T')[0];
                counts[dateStr] = (counts[dateStr] || 0) + 1;
            }
        });
        return counts;
    } catch (error) {
        console.error("Error getting daily bookings count:", error);
        return {};
    }
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
  
  const q = query(appointmentsCollection, where("date", "==", date));
  const todaysBookingsSnapshot = await getDocs(q);
  const todaysBookings = todaysBookingsSnapshot.size;


  if (todaysBookings >= MAX_APPOINTMENTS_PER_DAY) {
    return { message: 'Este dia está totalmente reservado.' };
  }

  try {
     const docRef = await addDoc(appointmentsCollection, {
        ...validatedFields.data,
        createdAt: Timestamp.now()
    });

    revalidatePath('/book');
    revalidatePath('/admin/dashboard');
    revalidatePath('/client-dashboard');
    redirect(`/my-appointment/${docRef.id}`);

  } catch (error) {
      console.error("Error creating appointment:", error);
      return { message: 'Não foi possível criar a marcação.' };
  }
}

export async function updateAppointment(id: string, prevState: any, formData: FormData) {
  const validatedFields = appointmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'A validação falhou.',
    };
  }
  
  try {
    const docRef = doc(adminFirestore, 'appointments', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return { message: 'Marcação não encontrada.' };
    }

    await updateDoc(docRef, {
        ...validatedFields.data
    });
    
    revalidatePath('/admin/dashboard');
    revalidatePath(`/my-appointment/${id}`);
    revalidatePath('/client-dashboard');
    redirect(`/my-appointment/${id}?success=true`);

  } catch(error) {
     console.error("Error updating appointment:", error);
     return { message: 'Não foi possível atualizar a marcação.' };
  }
}

export async function deleteAppointment(id: string) {
    try {
        const docRef = doc(adminFirestore, 'appointments', id);
        await deleteDoc(docRef);
        revalidatePath('/admin/dashboard');
        revalidatePath('/book');
        revalidatePath('/client-dashboard');
    } catch(error) {
        console.error("Error deleting appointment:", error);
        // In a real app, you'd want to return an error state
    }
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

const adminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = adminLoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { message: 'Dados inválidos.' };
  }

  const { username, password } = validatedFields.data;
  
  // IMPORTANT: This is NOT secure and for demonstration purposes only.
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
