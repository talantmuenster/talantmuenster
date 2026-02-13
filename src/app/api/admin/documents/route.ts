import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

const collection = db.collection('documents');

export async function GET() {
  try {
    const snapshot = await collection.orderBy('createdAt', 'desc').get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(docs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const body = await request.json();
    const data = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const ref = await collection.add(data);
    return NextResponse.json({ id: ref.id, ...data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID требуется' }, { status: 400 });

    const body = await request.json();
    const data = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await collection.doc(id).update(data);
    const doc = await collection.doc(id).get();
    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID требуется' }, { status: 400 });

    await collection.doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
