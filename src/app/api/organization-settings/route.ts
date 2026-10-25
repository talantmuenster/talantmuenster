import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

const SETTINGS_DOC_ID = 'organization';

// These details are intentionally public: they are displayed in the site footer
// and on the contact page. Updates from the admin panel must appear immediately.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const doc = await db.collection('settings').doc(SETTINGS_DOC_ID).get();

    if (!doc.exists) {
      return NextResponse.json({}, { headers: { 'Cache-Control': 'no-store' } });
    }

    const { address, phone, email, website, socialLinks } = doc.data() ?? {};
    return NextResponse.json(
      { address, phone, email, website, socialLinks },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('Unable to load public organization settings:', error);
    return NextResponse.json(
      { error: 'Unable to load organization settings' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
