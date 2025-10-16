'use server';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

interface FirebaseAdminServices {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

function initializeFirebaseAdmin(): FirebaseAdminServices {
    if (getApps().length > 0) {
        const app = getApp();
        return {
            app,
            auth: getAuth(app),
            firestore: getFirestore(app),
        };
    }

    const app = initializeApp({
        // When deployed to App Hosting, GOOGLE_CLOUD_PROJECT is automatically set
        projectId: process.env.GOOGLE_CLOUD_PROJECT || firebaseConfig.projectId,
    });

    return {
        app,
        auth: getAuth(app),
        firestore: getFirestore(app),
    };
}

const { app, auth, firestore } = initializeFirebaseAdmin();

export { app as adminApp, auth as adminAuth, firestore as adminFirestore };

// This separate export is for server actions that need to initialize
// without clashing with the global singleton pattern.
export const initializeFirebase = initializeFirebaseAdmin;
