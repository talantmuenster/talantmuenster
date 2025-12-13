import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log("API HIT");

    const data = await req.json();

    const {
      fullName = "",
      age = "",
      city = "",
      nomination = "",
      workTitle = "",
      email = "",
    } = data;

    const html = `
      <h2>Новая заявка на конкурс</h2>
      <p><b>ФИО:</b> ${fullName}</p>
      <p><b>Возраст:</b> ${age}</p>
      <p><b>Город:</b> ${city}</p>
      <p><b>Номинация:</b> ${nomination}</p>
      <p><b>Название работы:</b> ${workTitle}</p>
      <p><b>Email:</b> ${email}</p>
    `;

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!.split(","),
      subject: "Новая заявка — Конкурс Новогодних Игрушек 2025",
      html,
    });

    console.log("Resend OK:", result);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("SEND ERROR:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
