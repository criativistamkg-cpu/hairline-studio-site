import admin from 'firebase-admin';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

// Check if the app is already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
    // Log the environment variables to check if they are being read correctly
    console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
    console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
    console.log("FIREBASE_PRIVATE_KEY exists:", !!process.env.FIREBASE_PRIVATE_KEY);
  }
}

const adminFirestore: Firestore = getFirestore();
const adminApp = admin.app();
const adminAuth = admin.auth();

export { adminApp, adminAuth, adminFirestore };
