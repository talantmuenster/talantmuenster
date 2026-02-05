import { getAuth } from 'firebase-admin/auth';

export async function verifyAdminSession(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const sessionCookie = cookies.find((c) => c.startsWith('session='))?.split('=')[1];

  if (!sessionCookie) {
    throw new Error('No session');
  }

  try {
    const decoded = await getAuth().verifySessionCookie(sessionCookie, true);
    return decoded;
  } catch (err) {
    throw new Error('Invalid session');
  }
}
