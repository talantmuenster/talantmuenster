import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    const snapshot = await db.collection('team').orderBy('createdAt', 'desc').get();
    const members = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((member: any) => member.published === undefined || member.published === true);

    return NextResponse.json(members);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
