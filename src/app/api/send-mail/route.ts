
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getEmailHtml } from "@/email-templates/emailHtml";

export async function POST(req: NextRequest) {

const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, phone, email, message } = await req.json();

  // Генерируем HTML с помощью функции
  const html = getEmailHtml({ name, email, phone, message });

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: "Новая заявка с сайта Talant Münster",
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Ошибка отправки" }, { status: 500 });
  }
}