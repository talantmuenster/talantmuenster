'use client';

import { useEffect, useState } from 'react';
import { DocumentItem } from '@/admin/types';
import LanguageEditor, { LanguageEditorProvider, LanguageTabs } from '@/admin/components/LanguageEditor';
import FileUpload from '@/admin/components/FileUpload';

const emptyDoc: DocumentItem = {
  type: 'certificate',
  title: { ru: '', en: '', de: '' },
  description: { ru: '', en: '', de: '' },
  href: '',
  mode: 'view',
  published: true,
  createdAt: '',
  updatedAt: '',
};

export default function DocumentsAdminPage() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [editing, setEditing] = useState<DocumentItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [linkMode, setLinkMode] = useState<'upload' | 'link'>('link');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/documents');
      const data = await res.json();
      setItems(data || []);
    } catch (err) {
      setError('Ошибка при загрузке документов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startNew = () => {
    setEditing({ ...emptyDoc, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    setLinkMode('link');
    setError('');
    setSuccess('');
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.title?.ru || !editing.href) {
      setError('Заполните название и ссылку');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = editing.id ? `/api/admin/documents?id=${editing.id}` : '/api/admin/documents';
      const method = editing.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess(editing.id ? '✅ Документ обновлён' : '✅ Документ создан');
      setEditing(null);
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить этот документ?')) return;

    try {
      const res = await fetch(`/api/admin/documents?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка при удалении');

      setSuccess('✅ Документ удалён');
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Сертификаты и публикации</h1>
          <button
            onClick={startNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Добавить
          </button>
        </div>
        <div>
          <a href="/documents" className="px-3 py-1 text-sm rounded-full border bg-blue-600 text-white border-blue-600">Открыть страницу «Документы»</a>
        </div>
      </div>

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

      {!editing && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Загрузка...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Нет документов</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title?.ru || item.title?.en || item.title?.de}</h3>
                  <p className="text-sm text-gray-600">{item.description?.ru || item.description?.en || item.description?.de}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.type === 'certificate' ? 'Сертификат' : 'Публикация'} • {item.mode === 'download' ? 'Скачать' : 'Смотреть'}</p>
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
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setLinkMode('link');
                    }}
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

      {editing && (
        <LanguageEditorProvider>
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
            <h2 className="text-2xl font-semibold">
              {editing.id ? 'Редактировать' : 'Новый'} документ
            </h2>

            <LanguageTabs />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Тип</label>
              <select
                value={editing.type}
                onChange={(e) => setEditing({ ...editing, type: e.target.value as DocumentItem['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="certificate">Сертификат</option>
                <option value="publication">Публикация</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Действие</label>
              <select
                value={editing.mode}
                onChange={(e) => setEditing({ ...editing, mode: e.target.value as DocumentItem['mode'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="view">Смотреть</option>
                <option value="download">Скачать</option>
              </select>
            </div>
          </div>

          <div>
            <LanguageEditor
              content={editing.title}
              onChange={(c) => setEditing({ ...editing, title: c })}
              fieldName="Название"
              placeholder="Введите название"
            />
          </div>

          <div>
            <LanguageEditor
              content={editing.description}
              onChange={(c) => setEditing({ ...editing, description: c })}
              fieldName="Описание"
              placeholder="Введите описание"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Файл или ссылка</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLinkMode('upload')}
                className={`px-3 py-1 text-sm rounded-full border ${
                  linkMode === 'upload'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Загрузить файл
              </button>
              <button
                type="button"
                onClick={() => setLinkMode('link')}
                className={`px-3 py-1 text-sm rounded-full border ${
                  linkMode === 'link'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Вставить ссылку
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ссылка</label>
            {linkMode === 'link' ? (
              <input
                type="text"
                value={editing.href}
                onChange={(e) => setEditing({ ...editing, href: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <FileUpload
                folder="documents"
                currentUrl={editing.href}
                onUpload={(url) => setEditing({ ...editing, href: url })}
              />
            )}
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
