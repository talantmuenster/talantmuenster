import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { programs as localPrograms } from '@/data/programs';

export async function POST(request: NextRequest) {
  try {
    // Проверка прав администратора
    const { verifyAdminSession } = await import('@/lib/adminAuth');
    await verifyAdminSession(request);

    const collection = db.collection('programs');
    const results = [];

    for (const program of localPrograms) {
      const data = {
        slug: program.slug,
        title: program.title,
        subtitle: program.subtitle,
        cover: program.cover || '',
        heroSlides: program.heroSlides || [],
        courseTabs: program.courseTabs || [],
        teachers: program.teachers || [],
        schedule: program.schedule || { items: [] },
        published: program.published ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Проверить существует ли уже программа с таким slug
      const existingQuery = await collection.where('slug', '==', program.slug).get();

      if (existingQuery.empty) {
        // Создать новую
        const ref = await collection.add(data);
        results.push({ action: 'created', slug: program.slug, id: ref.id });
      } else {
        // Обновить существующую с merge:true для сохранения всех полей
        const docId = existingQuery.docs[0].id;
        await collection.doc(docId).set(data, { merge: true });
        results.push({ action: 'updated', slug: program.slug, id: docId });
      }
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (err: any) {
    console.error('Migration error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
