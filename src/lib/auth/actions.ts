'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/firebase/server';

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

export async function createSession(idToken: string) {
    try {
        // Verify the ID token to ensure it's valid.
        await adminAuth.verifyIdToken(idToken);
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
    try {
        await adminAuth.verifyIdToken(idToken);
        await setAuthCookie(idToken);
        redirect('/client-dashboard');
    } catch (error) {
        console.error("Failed to log in:", error);
        return { message: 'Failed to log in. Please try again.' };
    }
}

export async function clientSignup(prevState: any, formData: FormData) {
     const idToken = formData.get('idToken') as string;
     if (!idToken) {
        return { message: 'ID Token not provided.' };
    }
    try {
        await adminAuth.verifyIdToken(idToken);
        await setAuthCookie(idToken);
        redirect('/client-dashboard');
    } catch (error) {
        console.error("Failed to sign up:", error);
        return { message: 'Failed to sign up. Please try again.' };
    }
}


export async function clientLogout() {
    await clearAuthCookie();
    redirect('/');
}
