// Organization Settings API endpoint

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { OrganizationSettings } from '@/admin/types';

const SETTINGS_DOC_ID = 'organization';
const collection = db.collection('settings');

export async function GET() {
  try {
    const doc = await collection.doc(SETTINGS_DOC_ID).get();

    if (!doc.exists) {
      // Return default if not found
      return NextResponse.json({
        name: { ru: '', en: '', de: '' },
        description: { ru: '', en: '', de: '' },
        address: '',
        phone: '',
        email: '',
      });
    }

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const body = await request.json();
    const data = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await collection.doc(SETTINGS_DOC_ID).set(data, { merge: true });
    const doc = await collection.doc(SETTINGS_DOC_ID).get();

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
