import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const fullName = form.get('fullName') as string;
    const age = form.get('age') as string;
    const city = form.get('city') as string;
    const nomination = form.get('nomination') as string;
    const workTitle = form.get('workTitle') as string;
    const email = form.get('email') as string;

    const files = form.getAll('files') as File[];

    // 🔹 превращаем файлы в attachments
    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    const transporter = nodemailer.createTransport({
      host: process.env.RESEND_SMTP_HOST,
      port: Number(process.env.RESEND_SMTP_PORT),
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
      attachments, // 👈 ВОТ ТУТ ФАЙЛЫ
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('SMTP ATTACH ERROR:', err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
