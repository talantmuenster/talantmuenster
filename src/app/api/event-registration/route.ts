import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { upsertClient } from '@/lib/clients';

// POST - Create new registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, eventTitle, name, phone, email, message } = body;

    if (!eventId || !name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const registrationData = {
      eventId,
      eventTitle,
      name,
      phone,
      email,
      message: message || '',
      createdAt: Timestamp.now(),
      status: 'pending', // pending, confirmed, cancelled
    };

    const docRef = await db.collection('event-registrations').add(registrationData);

    try {
      await upsertClient({
        name,
        email,
        phone,
        source: 'event-registration',
      });
    } catch (clientError: any) {
      console.error('Failed to upsert client:', clientError);
    }

    try {
      await db
        .collection('events')
        .doc(eventId)
        .set(
          {
            registrationCount: FieldValue.increment(1),
            lastRegistrationAt: Timestamp.now(),
          },
          { merge: true }
        );
    } catch (updateError: any) {
      console.error('Failed to update event registrationCount:', updateError);
    }

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Registration successful',
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create registration', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Get registrations (optionally filtered by eventId)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    let query;
    if (eventId) {
      query = db
        .collection('event-registrations')
        .where('eventId', '==', eventId);
    } else if (email && phone) {
      query = db
        .collection('event-registrations')
        .where('email', '==', email)
        .where('phone', '==', phone);
    } else if (email) {
      query = db
        .collection('event-registrations')
        .where('email', '==', email);
    } else if (phone) {
      query = db
        .collection('event-registrations')
        .where('phone', '==', phone);
    } else {
      query = db
        .collection('event-registrations')
        .orderBy('createdAt', 'desc');
    }

    const snapshot = await query.get();
    const registrations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString?.() || null,
    }));

    if (eventId || email || phone) {
      registrations.sort((a: any, b: any) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
    }

    return NextResponse.json(registrations);
  } catch (error: any) {
    console.error('Get registrations error:', error);
    return NextResponse.json(
      { error: 'Failed to get registrations', details: error.message },
      { status: 500 }
    );
  }
}
