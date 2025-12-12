import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY!);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com",
  });
}

export const db = getFirestore();
export const storage = getStorage().bucket();
