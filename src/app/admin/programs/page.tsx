'use client';

import { useEffect, useState } from 'react';
import LanguageEditor, { LanguageEditorProvider, LanguageTabs } from '@/admin/components/LanguageEditor';
import { Program, LocalizedContent } from '@/admin/types';

const emptyLocalized: LocalizedContent = { ru: '', en: '', de: '' };

export default function ProgramsAdminPage() {
  const [items, setItems] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      setItems(data || []);
    } catch (err) {
      setError('Ошибка при загрузке направлений');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startNew = () => {
    setEditing({
      slug: '',
      title: emptyLocalized,
      description: emptyLocalized,
      content: emptyLocalized,
      sections: [],
      imageUrl: '',
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setError('');
    setSuccess('');
  };

  const save = async () => {
    if (!editing) return;
    const normalizedSlug = editing.slug.trim().toLowerCase();
    if (!normalizedSlug || !editing.title.ru) {
      setError('Заполните slug и название');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = editing.id ? `/api/admin/programs?id=${editing.id}` : '/api/admin/programs';
      const method = editing.id ? 'PUT' : 'POST';

      const payload = { ...editing, slug: normalizedSlug };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess(editing.id ? '✅ Направление обновлено' : '✅ Направление создано');
      setEditing(null);
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить это направление?')) return;

    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка при удалении');

      setSuccess('✅ Направление удалено');
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const togglePublished = async (item: Program) => {
    if (!item.id) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/programs?id=${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !item.published }),
      });
      if (!res.ok) throw new Error('Ошибка при обновлении статуса');
      await fetchItems();
      setSuccess(item.published ? '✅ Переведено в черновик' : '✅ Опубликовано');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSection = (index: number, updates: { title?: string; modules?: { title: string; description: string }[] }) => {
    if (!editing) return;
    const sections = [...(editing.sections || [])];
    sections[index] = { ...sections[index], ...updates };
    setEditing({ ...editing, sections });
  };

  const addSection = () => {
    if (!editing) return;
    const sections = [...(editing.sections || []), { title: '', modules: [] }];
    setEditing({ ...editing, sections });
  };

  const removeSection = (index: number) => {
    if (!editing) return;
    const sections = [...(editing.sections || [])];
    sections.splice(index, 1);
    setEditing({ ...editing, sections });
  };

  const addModule = (sectionIndex: number) => {
    if (!editing) return;
    const sections = [...(editing.sections || [])];
    const section = sections[sectionIndex] || { title: '', modules: [] };
    const modules = [...(section.modules || []), { title: '', description: '' }];
    sections[sectionIndex] = { ...section, modules };
    setEditing({ ...editing, sections });
  };

  const updateModule = (
    sectionIndex: number,
    moduleIndex: number,
    updates: { title?: string; description?: string }
  ) => {
    if (!editing) return;
    const sections = [...(editing.sections || [])];
    const section = sections[sectionIndex] || { title: '', modules: [] };
    const modules = [...(section.modules || [])];
    modules[moduleIndex] = { ...modules[moduleIndex], ...updates };
    sections[sectionIndex] = { ...section, modules };
    setEditing({ ...editing, sections });
  };

  const removeModule = (sectionIndex: number, moduleIndex: number) => {
    if (!editing) return;
    const sections = [...(editing.sections || [])];
    const section = sections[sectionIndex] || { title: '', modules: [] };
    const modules = [...(section.modules || [])];
    modules.splice(moduleIndex, 1);
    sections[sectionIndex] = { ...section, modules };
    setEditing({ ...editing, sections });
  };

  const ensureFirstModule = () => {
    const sections = [...(editing?.sections || [])];
    if (!sections[0]) {
      sections[0] = { title: '', modules: [{ title: '', description: '' }] };
    } else if (!Array.isArray(sections[0].modules) || sections[0].modules.length === 0) {
      sections[0] = { ...sections[0], modules: [{ title: '', description: '' }] };
    }
    return sections;
  };

  const updateFirstModule = (updates: { title?: string; description?: string }) => {
    if (!editing) return;
    const sections = ensureFirstModule();
    const firstModule = sections[0].modules[0] || { title: '', description: '' };
    sections[0].modules[0] = { ...firstModule, ...updates };
    setEditing({ ...editing, sections });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Направления программ</h1>
          <button
            onClick={startNew}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + Новое направление
          </button>
        </div>
        <div>
          <a href="/programs" className="px-3 py-1 text-sm rounded-full border bg-blue-600 text-white border-blue-600">Открыть страницу «Программы»</a>
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
            <div className="text-center py-8 text-gray-500">Нет направлений</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.title?.ru || item.title?.en || item.title?.de || 'Без названия'}
                  </h3>
                  <p className="text-sm text-gray-600">Slug: {item.slug}</p>
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
                    onClick={() => togglePublished(item)}
                    className={`px-3 py-1 text-sm rounded hover:opacity-90 ${
                      item.published
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.published ? 'В черновик' : 'Опубликовать'}
                  </button>
                  <button
                    onClick={() =>
                      setEditing({
                        ...item,
                        sections: item.sections || [],
                      })
                    }
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
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            <h2 className="text-2xl font-semibold">
              {editing.id ? 'Редактировать' : 'Новое'} направление
            </h2>

            <LanguageTabs />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="например: art, music"
            />
          </div>

          <LanguageEditor
            content={editing.title}
            onChange={(c) => setEditing({ ...editing, title: c })}
            fieldName="Название направления"
            placeholder="Название"
          />

          <LanguageEditor
            content={editing.description}
            onChange={(c) => setEditing({ ...editing, description: c })}
            fieldName="Краткое описание"
            isTextarea
            rows={3}
            placeholder="Короткое описание"
          />

          <LanguageEditor
            content={editing.content}
            onChange={(c) => setEditing({ ...editing, content: c })}
            fieldName="Полное описание"
            isTextarea
            rows={6}
            placeholder="Полный текст"
          />

          <div className="space-y-3 border border-blue-200 bg-blue-50/40 rounded-lg p-4">
            <h3 className="text-lg font-semibold">Первый модуль</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название модуля</label>
              <input
                type="text"
                value={editing.sections?.[0]?.modules?.[0]?.title || ''}
                onChange={(e) => updateFirstModule({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Название первого модуля"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание модуля</label>
              <textarea
                value={editing.sections?.[0]?.modules?.[0]?.description || ''}
                onChange={(e) => updateFirstModule({ description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Описание первого модуля"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Разделы и модули</h3>
              <button
                type="button"
                onClick={addSection}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                + Добавить раздел
              </button>
            </div>

            {(editing.sections || []).length === 0 ? (
              <div className="text-sm text-gray-500">Разделов пока нет</div>
            ) : (
              <div className="space-y-4">
                {(editing.sections || []).map((section, sectionIndex) => (
                  <div
                    key={`section-${sectionIndex}`}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Название раздела
                        </label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Например: Основы, Практика, Финальный проект"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                      >
                        Удалить раздел
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Модули</h4>
                        <button
                          type="button"
                          onClick={() => addModule(sectionIndex)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          + Добавить модуль
                        </button>
                      </div>

                      {sectionIndex === 0 && (section.modules || []).length <= 1 ? (
                        <div className="text-sm text-gray-500">Модулей пока нет</div>
                      ) : (section.modules || []).length === 0 ? (
                        <div className="text-sm text-gray-500">Модулей пока нет</div>
                      ) : (
                        <div className="space-y-3">
                          {(section.modules || [])
                            .slice(sectionIndex === 0 ? 1 : 0)
                            .map((module, moduleIndex) => (
                            <div
                              key={`section-${sectionIndex}-module-${moduleIndex + (sectionIndex === 0 ? 1 : 0)}`}
                              className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 space-y-2">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Название модуля
                                    </label>
                                    <input
                                      type="text"
                                      value={module.title}
                                      onChange={(e) =>
                                        updateModule(
                                          sectionIndex,
                                          moduleIndex + (sectionIndex === 0 ? 1 : 0),
                                          { title: e.target.value }
                                        )
                                      }
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                      placeholder="Название модуля"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Описание модуля
                                    </label>
                                    <textarea
                                      value={module.description}
                                      onChange={(e) =>
                                        updateModule(sectionIndex, moduleIndex + (sectionIndex === 0 ? 1 : 0), {
                                          description: e.target.value,
                                        })
                                      }
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                      rows={3}
                                      placeholder="Короткое описание модуля"
                                    />
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeModule(sectionIndex, moduleIndex + (sectionIndex === 0 ? 1 : 0))
                                  }
                                  className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                                >
                                  Удалить
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
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
