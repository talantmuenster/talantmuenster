import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const fullName = form.get("fullName")?.toString() || "";
    const age = form.get("age")?.toString() || "";
    const city = form.get("city")?.toString() || "";
    const nomination = form.get("nomination")?.toString() || "";
    const workTitle = form.get("workTitle")?.toString() || "";
    const email = form.get("email")?.toString() || "";

    const files = form.getAll("files") as File[];

    // ====== 1. Превращаем файлы в Base64 вложения ======
    const attachments = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");

      attachments.push({
        filename: file.name,
        content: base64,
      });
    }

    // ====== 2. HTML письма ======
    const html = `
      <h2>Новая заявка на конкурс</h2>
      <p><b>ФИО:</b> ${fullName}</p>
      <p><b>Возраст:</b> ${age}</p>
      <p><b>Город:</b> ${city}</p>
      <p><b>Номинация:</b> ${nomination}</p>
      <p><b>Название работы:</b> ${workTitle}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Количество фото:</b> ${files.length}</p>
    `;

    // ====== 3. Отправка письма ======
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: "Новая заявка — Конкурс Новогодних Игрушек 2025",
      html,

    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
