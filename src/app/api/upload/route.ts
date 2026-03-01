import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../../lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${folder}/${uuidv4()}-${file.name}`;
    const bucketFile = storage.file(fileName);

    await bucketFile.save(buffer, {
      metadata: { contentType: file.type },
      public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${storage.name}/${fileName}`;

    return NextResponse.json({ url: publicUrl });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
