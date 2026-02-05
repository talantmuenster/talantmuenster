import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { upsertClient } from '@/lib/clients';

export async function GET(request: Request) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const snapshot = await db.collection('clients').orderBy('updatedAt', 'desc').get();
    const clients = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString?.() || null,
      updatedAt: doc.data().updatedAt?.toDate?.().toISOString?.() || null,
    }));

    return NextResponse.json(clients);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const body = await request.json();
    const { name, email, phone, city, country } = body;

    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone required' }, { status: 400 });
    }

    const clientId = await upsertClient({
      name,
      email,
      phone,
      city,
      country,
      source: 'admin',
    });

    return NextResponse.json({ success: true, id: clientId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const body = await request.json();
    const { id, name, email, phone, city, country } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    await db.collection('clients').doc(id).set(
      {
        name: name || '',
        email: email || '',
        phone: phone || '',
        city: city || '',
        country: country || '',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
