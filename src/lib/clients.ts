import { db } from '@/lib/firebase';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

type ClientInput = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  source: 'event-registration' | 'newsletter' | 'admin';
};

export async function upsertClient({ name, email, phone, city, country, source }: ClientInput) {
  if (!email && !phone) return null;

  const clientsCol = db.collection('clients');
  let existingDoc: FirebaseFirestore.QueryDocumentSnapshot | null = null;

  if (email) {
    const emailSnap = await clientsCol.where('email', '==', email).limit(1).get();
    if (!emailSnap.empty) {
      existingDoc = emailSnap.docs[0];
    }
  }

  if (!existingDoc && phone) {
    const phoneSnap = await clientsCol.where('phone', '==', phone).limit(1).get();
    if (!phoneSnap.empty) {
      existingDoc = phoneSnap.docs[0];
    }
  }

  const now = Timestamp.now();

  if (existingDoc) {
    const prev = existingDoc.data();
    await existingDoc.ref.set(
      {
        name: name || prev.name || '',
        email: email || prev.email || '',
        phone: phone || prev.phone || '',
        city: city || prev.city || '',
        country: country || prev.country || '',
        updatedAt: now,
        sources: FieldValue.arrayUnion(source),
      },
      { merge: true }
    );
    return existingDoc.id;
  }

  const docRef = await clientsCol.add({
    name: name || '',
    email: email || '',
    phone: phone || '',
    city: city || '',
    country: country || '',
    createdAt: now,
    updatedAt: now,
    sources: [source],
  });

  return docRef.id;
}
