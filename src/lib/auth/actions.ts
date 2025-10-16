'use server';
import { initializeFirebase } from '@/firebase/server';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const { auth: serverAuth } = initializeFirebase();

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A palavra-passe deve ter pelo menos 6 caracteres' }),
});

async function setAuthCookie(idToken: string) {
    cookies().set('firebaseIdToken', idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
    })
}

async function clearAuthCookie() {
    cookies().delete('firebaseIdToken');
}

export async function clientLogin(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Dados de login inválidos.',
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const userCredential = await signInWithEmailAndPassword(serverAuth, email, password);
        const idToken = await userCredential.user.getIdToken();
        await setAuthCookie(idToken);
    } catch (error: any) {
        if (error.code === 'auth/invalid-credential') {
             return { message: 'Email ou palavra-passe incorretos.' };
        }
        return { message: 'Ocorreu um erro ao fazer login.' };
    }
    
    redirect('/client-dashboard');
}

export async function clientSignup(prevState: any, formData: FormData) {
     const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Dados de registo inválidos.',
        };
    }
    const { email, password } = validatedFields.data;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(serverAuth, email, password);
        const idToken = await userCredential.user.getIdToken();
        await setAuthCookie(idToken);
    } catch (error: any) {
         if (error.code === 'auth/email-already-in-use') {
             return { message: 'Este email já está a ser utilizado.' };
        }
        return { message: 'Ocorreu um erro ao criar a conta.' };
    }

    redirect('/client-dashboard');
}


export async function clientLogout() {
    await clearAuthCookie();
    redirect('/');
}
