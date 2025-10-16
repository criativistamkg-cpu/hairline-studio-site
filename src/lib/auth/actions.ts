'use server';
import { initializeFirebase } from '@/firebase/server';
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

// These functions now only handle the cookie and redirection part on the server.
// The actual Firebase sign-in/sign-up happens on the client.

export async function createSession(idToken: string) {
    try {
        await setAuthCookie(idToken);
    } catch (error) {
        console.error("Failed to create session:", error);
        return { message: 'Failed to create session.' };
    }
    redirect('/client-dashboard');
}


export async function clientLogin(prevState: any, formData: FormData) {
    const idToken = formData.get('idToken') as string;
    if (!idToken) {
        return { message: 'ID Token not provided.' };
    }
    await setAuthCookie(idToken);
    redirect('/client-dashboard');
}

export async function clientSignup(prevState: any, formData: FormData) {
     const idToken = formData.get('idToken') as string;
     if (!idToken) {
        return { message: 'ID Token not provided.' };
    }
    await setAuthCookie(idToken);
    redirect('/client-dashboard');
}


export async function clientLogout() {
    await clearAuthCookie();
    redirect('/');
}
