// Projects Management Page

'use client';

import { useEffect, useState } from 'react';
import LanguageEditor from '@/admin/components/LanguageEditor';
import ImageUpload from '@/admin/components/ImageUpload';
import { Project, LocalizedContent } from '@/admin/types';

const emptyLocalized: LocalizedContent = { ru: '', en: '', de: '' };

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setItems(data || []);
    } catch (err) {
      setError('Ошибка при загрузке проектов');
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
      description: emptyLocalized,
      content: emptyLocalized,
      imageUrl: '',
      featured: false,
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
      const url = editing.id ? `/api/admin/projects?id=${editing.id}` : '/api/admin/projects';
      const method = editing.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess(editing.id ? '✅ Проект обновлён' : '✅ Проект создан');
      setEditing(null);
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить этот проект?')) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка при удалении');

      setSuccess('✅ Проект удалён');
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление проектами</h1>
        <button
          onClick={startNew}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          + Новый проект
        </button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500 col-span-full">Загрузка...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500 col-span-full">Нет проектов</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title?.ru}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {item.title?.ru || item.title?.en || item.title?.de || 'Без названия'}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description?.ru || item.description?.en}
                  </p>
                  <div className="flex gap-2 pt-2">
                    {item.featured && (
                      <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                        ⭐ Избранное
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.published ? '✓ Опубликовано' : 'Черновик'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setEditing(item)}
                      className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
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
              </div>
            ))
          )}
        </div>
      )}

      {/* Form */}
      {editing && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
          <h2 className="text-2xl font-semibold">
            {editing.id ? 'Редактировать' : 'Новый'} проект
          </h2>

          <ImageUpload
            onUpload={(url) => setEditing({ ...editing, imageUrl: url })}
            currentImageUrl={editing.imageUrl}
            folder="projects"
          />

          <LanguageEditor
            content={editing.title}
            onChange={(c) => setEditing({ ...editing, title: c })}
            fieldName="Название проекта"
            placeholder="Название"
          />

          <LanguageEditor
            content={editing.description}
            onChange={(c) => setEditing({ ...editing, description: c })}
            fieldName="Краткое описание"
            isTextarea
            rows={3}
            placeholder="Короткое описание для списка"
          />

          <LanguageEditor
            content={editing.content}
            onChange={(c) => setEditing({ ...editing, content: c })}
            fieldName="Полное описание проекта"
            isTextarea
            rows={8}
            placeholder="Подробное описание проекта"
          />

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Избранный проект
              </label>
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
