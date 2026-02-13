import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'documents';

    if (!file) {
      return NextResponse.json(
        { error: 'Файл не предоставлен' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '_');
    const filename = `${folder}/${timestamp}-${originalName}`;

    const fileRef = storage.file(filename);
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type || 'application/octet-stream',
      },
    });

    const publicUrl = `https://storage.googleapis.com/${storage.bucket.name}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (err: any) {
    console.error('Upload file error:', err);
    return NextResponse.json(
      { error: err.message || 'Ошибка при загрузке файла' },
      { status: 500 }
    );
  }
}
