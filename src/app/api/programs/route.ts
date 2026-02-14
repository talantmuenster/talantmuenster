import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import type { Query, CollectionReference, DocumentData } from 'firebase-admin/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    let query: Query<DocumentData> | CollectionReference<DocumentData> = db.collection('programs');
    if (slug) {
      query = query.where('slug', '==', slug);
    }

    const snapshot = await query.get();
    const programs = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((program: any) =>
        program.published === true || program.published === 'true' || program.published === 1
      );
    return NextResponse.json(programs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
