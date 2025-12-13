import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      fullName,
      age,
      city,
      nomination,
      workTitle,
      email,
      filesCount,
    } = data;

    const transporter = nodemailer.createTransport({
      host: process.env.RESEND_SMTP_HOST,
      port: Number(process.env.RESEND_SMTP_PORT),
      secure: true, // 👈 обязательно для 465
      auth: {
        user: process.env.RESEND_SMTP_USER, // "resend"
        pass: process.env.RESEND_SMTP_PASS, // RESEND_API_KEY
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM!,        // 👈 домен talantev.de
      to: process.env.EMAIL_TO!.split(','),
      replyTo: email,                       // можно ответить участнику
      subject: 'Новая заявка — Конкурс 2025',
      html: `
        <h2>Новая заявка</h2>
        <p><b>ФИО:</b> ${fullName}</p>
        <p><b>Возраст:</b> ${age}</p>
        <p><b>Город:</b> ${city}</p>
        <p><b>Номинация:</b> ${nomination}</p>
        <p><b>Работа:</b> ${workTitle}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Файлов:</b> ${filesCount}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('RESEND SMTP ERROR:', err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
