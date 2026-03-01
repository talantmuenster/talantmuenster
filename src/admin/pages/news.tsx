// News Management Page

'use client';

import { useEffect, useState } from 'react';
import LanguageEditor, { LanguageEditorProvider, LanguageTabs } from '@/admin/components/LanguageEditor';
import ImageUpload from '@/admin/components/ImageUpload';
import { News, LocalizedContent } from '@/admin/types';

const emptyLocalized: LocalizedContent = { ru: '', en: '', de: '' };

export default function NewsPage() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/news', { credentials: 'include' });
      const data = await res.json();
      setItems(data || []);
    } catch (err) {
      setError('Ошибка при загрузке новостей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startNew = () => {
    setEditing({
      title: emptyLocalized,
      content: emptyLocalized,
      excerpt: emptyLocalized,
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setError('');
    setSuccess('');
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.title.ru || !editing.imageUrl) {
      setError('Заполните название и загрузите изображение');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = editing.id ? `/api/admin/news?id=${editing.id}` : '/api/admin/news';
      const method = editing.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess(editing.id ? '✅ Новость обновлена' : '✅ Новость создана');
      setEditing(null);
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить эту новость?')) return;

    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Ошибка при удалении');

      setSuccess('✅ Новость удалена');
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Управление новостями</h1>
          <button
            onClick={startNew}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Новая новость
          </button>
        </div>
        <div>
          <a href="/news" className="px-3 py-1 text-sm rounded-full border bg-blue-600 text-white border-blue-600">Открыть страницу «Новости»</a>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* List */}
      {!editing && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Загрузка...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Нет новостей</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start"
              >
                <div className="flex-1 flex gap-4">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title?.ru}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">
                        {item.title?.ru || item.title?.en || item.title?.de || 'Без названия'}
                      </h3>
                      {item.id && (
                        <a
                          href={`/news/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition ml-2"
                        >
                          Открыть
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.excerpt?.ru || item.excerpt?.en || item.excerpt?.de}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">📅 {item.date}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                        item.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.published ? '✓ Опубликовано' : 'Черновик'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditing(item)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => remove(item.id!)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Form */}
      {editing && (
        <LanguageEditorProvider>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            <h2 className="text-2xl font-semibold">
              {editing.id ? 'Редактировать' : 'Новая'} новость
            </h2>

            <LanguageTabs />

      <ImageUpload
  folder="news"
  currentImageUrl={editing.imageUrl}
  onUpload={(url) =>
    setEditing({ ...editing, imageUrl: url })
  }
/>

            <LanguageEditor
              content={editing.title}
              onChange={(c) => setEditing({ ...editing, title: c })}
              fieldName="Заголовок новости"
              placeholder="Привлекательный заголовок"
            />

            <LanguageEditor
              content={editing.excerpt}
              onChange={(c) => setEditing({ ...editing, excerpt: c })}
              fieldName="Краткое описание"
              isTextarea
              rows={2}
              placeholder="Краткая анонс для списка новостей"
            />

            <LanguageEditor
              content={editing.content}
              onChange={(c) => setEditing({ ...editing, content: c })}
              fieldName="Полный текст новости"
              isTextarea
              rows={8}
              placeholder="Полный текст статьи"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата публикации</label>
              <input
                type="date"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-sm font-medium">
                Опубликовать
              </label>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={save}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </LanguageEditorProvider>
      )}
    </div>
  );
}
