import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // ⛔️ чтобы build не падал без env
  if (
    !process.env.RESEND_SMTP_HOST ||
    !process.env.RESEND_SMTP_USER ||
    !process.env.RESEND_SMTP_PASS
  ) {
    return NextResponse.json(
      { ok: true, skipped: 'SMTP env missing' },
      { status: 200 }
    );
  }

  try {
    const form = await req.formData();

    const fullName = String(form.get('fullName') || '');
    const age = String(form.get('age') || '');
    const city = String(form.get('city') || '');
    const nomination = String(form.get('nomination') || '');
    const workTitle = String(form.get('workTitle') || '');
    const email = String(form.get('email') || '');

    const files = form.getAll('files') as File[];

    // 🔹 attachments
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const transporter = nodemailer.createTransport({
      host: process.env.RESEND_SMTP_HOST,
      port: Number(process.env.RESEND_SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.RESEND_SMTP_USER,
        pass: process.env.RESEND_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!.split(','),
      replyTo: email,
      subject: 'Новая заявка — Конкурс 2025',
      html: `
        <h2>Новая заявка</h2>
        <p><b>ФИО:</b> ${fullName}</p>
        <p><b>Возраст:</b> ${age}</p>
        <p><b>Город:</b> ${city}</p>
        <p><b>Номинация:</b> ${nomination}</p>
        <p><b>Работа:</b> ${workTitle}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Файлов:</b> ${files.length}</p>
      `,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('SMTP SEND ERROR:', err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
