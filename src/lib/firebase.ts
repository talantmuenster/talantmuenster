import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount: any;

if (process.env.FIREBASE_ADMIN_KEY) {
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
} else if (
  process.env.FIREBASE_ADMIN_PROJECT_ID &&
  process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
  process.env.FIREBASE_ADMIN_PRIVATE_KEY
) {
  serviceAccount = {
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
} else {
  throw new Error(
    'Firebase Admin credentials are not set. Provide FIREBASE_ADMIN_KEY or FIREBASE_ADMIN_PROJECT_ID/FIREBASE_ADMIN_CLIENT_EMAIL/FIREBASE_ADMIN_PRIVATE_KEY.'
  );
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com",
  });
}

export const db = getFirestore();
export const storage = getStorage().bucket();
