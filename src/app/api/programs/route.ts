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
    console.log('📚 Programs API - Documents found:', snapshot.size);
    
    const programs = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((program: any) => {
        const isPublished = program.published === true || program.published === 'true' || program.published === 1;
        console.log(`Program ${program.slug}: published=${program.published}, isPublished=${isPublished}`);
        return isPublished;
      });
    
    console.log('📚 Programs API - Returning programs:', programs.length);
    return NextResponse.json(programs);
  } catch (err: any) {
    console.error('❌ Programs API error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
