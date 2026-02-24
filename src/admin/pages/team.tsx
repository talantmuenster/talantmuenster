// Team Management Page

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageUpload from '@/admin/components/ImageUpload';
import type { TeamMember } from '@/admin/types';

const emptyMember: TeamMember = {
  name: { ru: '', en: '', de: '' },
  role: { ru: '', en: '', de: '' },
  image: '',
  skills: [],
  published: true,
  createdAt: '',
  updatedAt: '',
};

export default function TeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team', { credentials: 'include' });
      const data = await res.json();
      setItems(data || []);
    } catch {
      setError('Ошибка при загрузке команды');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startNew = () => {
    const now = new Date().toISOString();
    setEditing({ ...emptyMember, createdAt: now, updatedAt: now });
    setError('');
    setSuccess('');
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.name.ru || !editing.role.ru) {
      setError('Заполните имя и роль');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = editing.id ? `/api/admin/team?id=${editing.id}` : '/api/admin/team';
      const method = editing.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess(editing.id ? '✅ Участник обновлён' : '✅ Участник добавлен');
      setEditing(null);
      await fetchItems();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка при сохранении';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить этого участника?')) return;

    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Ошибка при удалении');

      setSuccess('✅ Участник удалён');
      await fetchItems();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ошибка при удалении';
      setError(message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Команда</h1>
          <button
            onClick={startNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Добавить участника
          </button>
        </div>
        <div>
          <a
            href="/about"
            className="px-3 py-1 text-sm rounded-full border bg-blue-600 text-white border-blue-600"
          >
            Открыть страницу «О нас»
          </a>
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
            <div className="text-center py-8 text-gray-500">Нет участников</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-r from-white to-blue-50 p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition flex justify-between items-start gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name?.ru || 'Участник'}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                      фото
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 truncate">
                      {item.name?.ru || 'Без имени'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.role?.ru || 'Без роли'}</p>
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                          item.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {item.published ? '✓ Опубликовано' : '○ Черновик'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => setEditing(item)}
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => remove(item.id!)}
                    className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
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
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
          <h2 className="text-2xl font-semibold">
            {editing.id ? 'Редактировать' : 'Новый'} участник
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя (русский)
              </label>
              <input
                type="text"
                value={editing.name.ru}
                onChange={(e) => setEditing({ ...editing, name: { ...editing.name, ru: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Анна Фёдорова"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Должность (русский)
              </label>
              <input
                type="text"
                value={editing.role.ru}
                onChange={(e) => setEditing({ ...editing, role: { ...editing.role, ru: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Преподаватель музыки"
              />
            </div>
          </div>

          <ImageUpload
            onUpload={(url) => setEditing({ ...editing, image: url })}
            currentImageUrl={editing.image}
            folder="team"
            previewSizeClass="w-[200px] h-[200px]"
            onUploadStart={() => setUploading(true)}
            onUploadEnd={() => setUploading(false)}
          />

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
              disabled={uploading}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Отмена
            </button>
            <button
              onClick={save}
              disabled={loading || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Сохранение...' : uploading ? 'Загрузка фото...' : 'Сохранить'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
