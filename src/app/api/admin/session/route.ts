import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import '@/lib/firebase'; // Initialize Firebase Admin

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idToken = body.idToken;

    if (!idToken) {
      return NextResponse.json({ error: 'idToken required' }, { status: 400 });
    }

    // 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ success: true });
    
    // For localhost development: don't set Secure flag
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlaug = isProduction ? 'Secure;' : '';
    
    res.headers.append('Set-Cookie', `session=${sessionCookie}; Max-Age=${expiresIn / 1000}; Path=/; HttpOnly; ${secureFlaug} SameSite=Lax`);
    return res;
  } catch (err: any) {
    console.error('Session error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create session' }, { status: 500 });
  }
}
