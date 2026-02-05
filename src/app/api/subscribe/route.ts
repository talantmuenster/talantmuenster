import { NextRequest, NextResponse } from 'next/server';
import { upsertClient } from '@/lib/clients';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await upsertClient({
      name,
      email,
      phone,
      source: 'newsletter',
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe', details: error.message },
      { status: 500 }
    );
  }
}
