import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../lib/firebase';
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    // Извлекаем путь файла из URL
    const bucketName = storage.name;

    const filePath = url
      .replace(`https://storage.googleapis.com/${bucketName}/`, '');

    const file = storage.file(filePath);

    await file.delete();

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
