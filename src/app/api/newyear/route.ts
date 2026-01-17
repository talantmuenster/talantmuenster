import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // ⛔️ Во время build / без ключа — просто выходим
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: true, skipped: "RESEND_API_KEY missing" },
      { status: 200 }
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const form = await req.formData();

    const fullName = form.get("fullName")?.toString() || "";
    const age = form.get("age")?.toString() || "";
    const city = form.get("city")?.toString() || "";
    const nomination = form.get("nomination")?.toString() || "";
    const workTitle = form.get("workTitle")?.toString() || "";
    const email = form.get("email")?.toString() || "";

    const html = `
      <h2>Новая заявка на конкурс!</h2>
      <p><b>ФИО:</b> ${fullName}</p>
      <p><b>Возраст:</b> ${age}</p>
      <p><b>Город:</b> ${city}</p>
      <p><b>Номинация:</b> ${nomination}</p>
      <p><b>Название работы:</b> ${workTitle}</p>
      <p><b>Email:</b> ${email}</p>
    `;

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: "Новая заявка — Конкурс Новогодних Игрушек 2025",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Email send failed" },
      { status: 500 }
    );
  }
}
