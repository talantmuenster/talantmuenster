import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const SAVE_API_URL = 'http://localhost:3001/save-submission'; // 🚨 Бэкэнд-бот Express

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const fio = String(form.get('fullName') ?? '');
    const age = String(form.get('age') ?? '');
    const city = String(form.get('city') ?? '');
    const nomination = String(form.get('nomination') ?? '');
    const workTitle = String(form.get('workTitle') ?? '');
    const email = String(form.get('email') ?? '');
    const files = form.getAll('files') as File[];

    // ===== 1. Собираем текст заявки =====
    const text = [
      '🎄 <b>Новая заявка на конкурс новогодних игрушек-2025</b>',
      '',
      `👤 <b>ФИО:</b> ${fio}`,
      `🎂 <b>Возраст:</b> ${age}`,
      `📍 <b>Населённый пункт, страна:</b> ${city}`,
      `🏷 <b>Номинация:</b> ${nomination}`,
      `🎨 <b>Название работы:</b> ${workTitle}`,
      `✉️ <b>Email для связи:</b> ${email}`,
    ].join('\n');

    // ===== 2. Отправляем текст в Telegram =====
    const textRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!textRes.ok) {
      const errText = await textRes.text();
      console.error('❌ sendMessage error:', errText);
      return NextResponse.json({ ok: false, error: 'TEXT_SEND_FAILED', details: errText }, { status: 500 });
    }

    // ===== 3. Отправляем фото (если есть) и сохраняем file_id =====
    let fileIdFromTelegram: string | null = null;

    if (files.length > 0) {
      const file = files[0]; // можно расширить на sendMediaGroup позже
      const fd = new FormData();
      fd.append('chat_id', CHAT_ID);
      fd.append('photo', file, file.name);

      const photoRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: fd as any,
      });

      const json = await photoRes.json();

      if (!photoRes.ok || !json.ok) {
        console.error('❌ sendPhoto error:', json);
        return NextResponse.json({ ok: false, error: 'PHOTO_SEND_FAILED' }, { status: 500 });
      }

      fileIdFromTelegram = json.result.photo.at(-1).file_id;
    }

    // ===== 4. Сохраняем в submissions.json через API бота =====
    const saveRes = await fetch(SAVE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        photo: fileIdFromTelegram,
      }),
    });

    if (!saveRes.ok) {
      const errText = await saveRes.text();
      console.error('❌ save-submission error:', errText);
      return NextResponse.json({ ok: false, error: 'SAVE_FAILED', details: errText }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('API /newyear/submit error:', e);
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
