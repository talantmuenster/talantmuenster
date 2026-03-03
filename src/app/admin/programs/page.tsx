'use client';

import { useEffect, useState } from 'react';
import { Program, LocalizedContent, TeamMember } from '@/admin/types';
import ImageUpload from '@/admin/components/ImageUpload';

const emptyLocalized: LocalizedContent = { ru: '', en: '', de: '' };
type LanguageType = 'ru' | 'en' | 'de';

export default function ProgramsAdminPage() {
  const [items, setItems] = useState<Program[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [migratingData, setMigratingData] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('ru');
  const [activeTab, setActiveTab] = useState<'info' | 'courses' | 'teachers' | 'schedule'>('info');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/programs', { credentials: 'include' });
      const data = await res.json();
      setItems(data || []);
    } catch {
      setError('Ошибка при загрузке направлений');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setTeamMembers(data || []);
    } catch {
      console.error('Ошибка при загрузке команды');
    }
  };

  useEffect(() => {
    fetchItems();
    fetchTeam();
  }, []);

  const migrateFromLocal = async () => {
    if (!confirm('Загрузить данные из локального файла в Firebase?')) return;
    setMigratingData(true);
    try {
      const res = await fetch('/api/admin/programs-migrate', { method: 'POST', credentials: 'include' });
      if (!res.ok) throw new Error('Ошибка при миграции');
      const result = await res.json();
      setSuccess(`✅ Загружено ${result.results.length} программ`);
      await fetchItems();
    } catch (err) {
      setError(`Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    } finally {
      setMigratingData(false);
    }
  };

  const startNew = () => {
    setEditing({
      slug: '',
      title: emptyLocalized,
      subtitle: emptyLocalized,
      cover: '',
      heroSlides: [],
      courseTabs: [],
      teachers: [],
      schedule: { items: [] },
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setSelectedLanguage('ru');
    setActiveTab('info');
  };

  const save = async () => {
    if (!editing) return;
    const normalizedSlug = editing.slug.trim().toLowerCase();
    if (!normalizedSlug || !editing.title?.ru) {
      setError('Заполните slug и название');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Создаем новых преподавателей в команде
      const updatedTeachers = await Promise.all(
        (editing.teachers || []).map(async (teacher) => {
          if (teacher.isNew) {
            // Создаем нового члена команды
            const teamMemberData = {
              name: teacher.name,
              role: teacher.role,
              image: teacher.avatar,
              skills: teacher.tags?.map(tag => tag.ru) || [],
              published: true,
            };

            const res = await fetch('/api/admin/team', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(teamMemberData),
              credentials: 'include',
            });

            if (!res.ok) throw new Error('Ошибка при создании члена команды');

            const newMember = await res.json();

            // Обновляем список команды
            await fetchTeam();

            // Возвращаем преподавателя с ID члена команды
            return {
              ...teacher,
              teamMemberId: newMember.id,
              isNew: false,
            };
          }
          return teacher;
        })
      );
      const url = editing.id ? `/api/admin/programs?id=${editing.id}` : '/api/admin/programs';
      const method = editing.id ? 'PUT' : 'POST';

      const payload = {
        ...editing,
        slug: normalizedSlug,
        title: editing.title,
        subtitle: editing.subtitle,
        heroSlides: editing.heroSlides || [],
        courseTabs: editing.courseTabs || [],
        teachers: updatedTeachers,
        schedule: editing.schedule || { items: [] },
        published: editing.published ?? true,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      const savedProgram = await res.json();
      
      setSuccess(editing.id ? '✅ Направление обновлено' : '✅ Направление создано');
      
      // Обновляем локальное состояние без перезагрузки страницы
      if (editing.id) {
        // Обновляем существующую программу
        setItems(prev => prev.map(item => item.id === editing.id ? savedProgram : item));
        // Обновляем форму редактирования с сохраненными данными (не закрываем карточку)
        setEditing(savedProgram);
      } else {
        // Добавляем новую программу в начало списка
        setItems(prev => [savedProgram, ...prev]);
        // Закрываем форму только при создании новой программы
        setEditing(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить?')) return;
    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Ошибка при удалении');
      setSuccess('✅ Удалено');
      // Удаляем из локального состояния без перезагрузки
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Список
  if (!editing) {
    return (
      <div className="min-w-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Программы</h1>
          <div className="flex gap-2">
            <button
              onClick={migrateFromLocal}
              disabled={migratingData}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 text-sm"
            >
              {migratingData ? '⏳ Загрузка...' : '⬆️ Из файла'}
            </button>
            <button
              onClick={startNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              ➕ Новая программа
            </button>
          </div>
        </div>

        {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">{error}</div>}
        {success && <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-4">{success}</div>}

        <div className="grid gap-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">⏳ Загрузка...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Нет программ в базе данных</h3>
              <p className="text-gray-600 mb-4">
                Загрузите данные из файла или создайте новую программу
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={migrateFromLocal}
                  disabled={migratingData}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                >
                  {migratingData ? '⏳ Загрузка...' : '⬆️ Загрузить из файла'}
                </button>
                <button
                  onClick={startNew}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  ➕ Создать новую
                </button>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition flex justify-between items-center group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{item.title?.ru || 'Без названия'}</h3>
                  <div className="flex gap-3 mt-2 text-sm text-gray-600">
                    <span>📌 {item.slug}</span>
                    <span>{item.published ? '✅ Опубликовано' : '📝 Черновик'}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => setEditing({
                      ...item,
                      title: item.title || emptyLocalized,
                      subtitle: item.subtitle || emptyLocalized,
                      teachers: (item.teachers || []).map(t => ({
                        ...t,
                        name: t.name || emptyLocalized,
                        role: t.role || emptyLocalized,
                        bio: t.bio || emptyLocalized,
                        tags: (t.tags || []).map(tag => 
                          typeof tag === 'string' 
                            ? { ru: tag, en: '', de: '' } 
                            : (tag || emptyLocalized)
                        ),
                      })),
                      courseTabs: (item.courseTabs || []).map(c => ({
                        ...c,
                        title: c.title || emptyLocalized,
                        description: c.description || emptyLocalized,
                      })),
                      schedule: {
                        ...item.schedule,
                        items: (item.schedule?.items || []).map(s => ({
                          ...s,
                          title: s.title || emptyLocalized,
                          teacher: s.teacher || emptyLocalized,
                        })),
                      },
                    })}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    onClick={() => remove(item.id!)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Редактирование
  return (
    <div className="min-w-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {editing.id ? '✏️ Редактирование' : '➕ Новая программа'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">Slug: {editing.slug || '—'}</p>
        </div>
        <button
          onClick={() => setEditing(null)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          ← Назад
        </button>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-4">{success}</div>}

      {/* Языковой переключатель */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700">Язык:</span>
        <div className="flex gap-2">
          {(['ru', 'en', 'de'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang === 'ru' }
              {lang === 'en' }
              {lang === 'de' }
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        {(['info', 'courses', 'teachers', 'schedule'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'info' && '📋 Основная информация'}
            {tab === 'courses' && '📚 Курсы'}
            {tab === 'teachers' && '👥 Преподаватели'}
            {tab === 'schedule' && '📅 Расписание'}
          </button>
        ))}
      </div>

      {/* Основная информация */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Основные данные</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Slug (идентификатор)</label>
                <input
                  type="text"
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="art, music, dance..."
                />
                <p className="text-xs text-gray-500 mt-1">Используется в URL</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  🎬 Слайдер (несколько фото)
                </label>
                <div className="space-y-3">
                  {(editing.heroSlides || []).map((slide, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-700">Фото {idx + 1}</span>
                        <button
                          onClick={() => {
                            const slides = (editing.heroSlides || []).filter((_, i) => i !== idx);
                            setEditing({ ...editing, heroSlides: slides });
                          }}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                        >
                          🗑️ Удалить
                        </button>
                      </div>
                      <ImageUpload
                        folder="programs/slides"
                        currentImageUrl={slide}
                        onUpload={(url) => {
                          const slides = [...(editing.heroSlides || [])];
                          slides[idx] = url;
                          setEditing({ ...editing, heroSlides: slides });
                        }}
                      />
                      {slide && (
                        <input
                          type="text"
                          value={slide}
                          onChange={(e) => {
                            const slides = [...(editing.heroSlides || [])];
                            slides[idx] = e.target.value;
                            setEditing({ ...editing, heroSlides: slides });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-2"
                          placeholder="https://..."
                        />
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setEditing({ ...editing, heroSlides: [...(editing.heroSlides || []), ''] })}
                    className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
                  >
                    ➕ Добавить фото
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                />
                <span className="font-medium text-gray-700">✅ Опубликовано</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Содержание на {selectedLanguage === 'ru' ? '🇷🇺 Русском' : selectedLanguage === 'en' ? '🇬🇧 Английском' : '🇩🇪 Немецком'}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Название программы</label>
                <input
                  type="text"
                  value={editing.title?.[selectedLanguage] || ''}
                  onChange={(e) => setEditing({ ...editing, title: { ...editing.title, [selectedLanguage]: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={selectedLanguage === 'ru' ? 'Введите название' : selectedLanguage === 'en' ? 'Enter title' : 'Geben Sie den Titel ein'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Короткое описание</label>
                <textarea
                  value={editing.subtitle?.[selectedLanguage] || ''}
                  onChange={(e) => setEditing({ ...editing, subtitle: { ...editing.subtitle, [selectedLanguage]: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder={selectedLanguage === 'ru' ? 'Краткое описание программы' : selectedLanguage === 'en' ? 'Brief description' : 'Kurzbeschreibung'}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Курсы */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {(editing.courseTabs || []).map((course, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{course.title?.[selectedLanguage] || `Курс ${idx + 1}`}</h3>
                <button
                  onClick={() => setEditing({ ...editing, courseTabs: editing.courseTabs?.filter((_, i) => i !== idx) })}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  🗑️ Удалить
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Название курса"
                  value={course.title?.[selectedLanguage] || ''}
                  onChange={(e) => {
                    const upd = [...(editing.courseTabs || [])];
                    upd[idx] = { ...course, title: { ...(course.title || emptyLocalized), [selectedLanguage]: e.target.value } };
                    setEditing({ ...editing, courseTabs: upd });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Описание курса"
                  value={course.description?.[selectedLanguage] || ''}
                  onChange={(e) => {
                    const upd = [...(editing.courseTabs || [])];
                    upd[idx] = { ...course, description: { ...(course.description || emptyLocalized), [selectedLanguage]: e.target.value } };
                    setEditing({ ...editing, courseTabs: upd });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Адрес"
                    value={course.address || ''}
                    onChange={(e) => {
                      const upd = [...(editing.courseTabs || [])];
                      upd[idx] = { ...course, address: e.target.value };
                      setEditing({ ...editing, courseTabs: upd });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Длительность"
                    value={course.duration || ''}
                    onChange={(e) => {
                      const upd = [...(editing.courseTabs || [])];
                      upd[idx] = { ...course, duration: e.target.value };
                      setEditing({ ...editing, courseTabs: upd });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Цена"
                    value={course.price || ''}
                    onChange={(e) => {
                      const upd = [...(editing.courseTabs || [])];
                      upd[idx] = { ...course, price: e.target.value };
                      setEditing({ ...editing, courseTabs: upd });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setEditing({ ...editing, courseTabs: [...(editing.courseTabs || []), { title: emptyLocalized, description: emptyLocalized, address: '', duration: '', price: '' }] })}
            className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
          >
            ➕ Добавить курс
          </button>
        </div>
      )}

      {/* Преподаватели */}
      {activeTab === 'teachers' && (
        <div className="space-y-4">
          {(editing.teachers || []).map((teacher, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">
                  {teacher.name?.[selectedLanguage] || `Преподаватель ${idx + 1}`}
                  {teacher.isNew && <span className="ml-2 text-sm text-green-600">(новый)</span>}
                </h3>
                <button
                  onClick={() => setEditing({ ...editing, teachers: editing.teachers?.filter((_, i) => i !== idx) })}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  🗑️ Удалить
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Имя преподавателя"
                  value={teacher.name?.[selectedLanguage] || ''}
                  onChange={(e) => {
                    const upd = [...(editing.teachers || [])];
                    upd[idx] = { ...teacher, name: { ...(teacher.name || emptyLocalized), [selectedLanguage]: e.target.value } };
                    setEditing({ ...editing, teachers: upd });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Должность"
                  value={teacher.role?.[selectedLanguage] || ''}
                  onChange={(e) => {
                    const upd = [...(editing.teachers || [])];
                    upd[idx] = { ...teacher, role: { ...(teacher.role || emptyLocalized), [selectedLanguage]: e.target.value } };
                    setEditing({ ...editing, teachers: upd });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Биография"
                  value={teacher.bio?.[selectedLanguage] || ''}
                  onChange={(e) => {
                    const upd = [...(editing.teachers || [])];
                    upd[idx] = { ...teacher, bio: { ...(teacher.bio || emptyLocalized), [selectedLanguage]: e.target.value } };
                    setEditing({ ...editing, teachers: upd });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
                />
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">📸 Аватар</label>
                  <ImageUpload
                    folder="teachers"
                    currentImageUrl={teacher.avatar}
                    onUpload={(url) => {
                      const upd = [...(editing.teachers || [])];
                      upd[idx] = { ...teacher, avatar: url };
                      setEditing({ ...editing, teachers: upd });
                    }}
                  />
                  {teacher.avatar && (
                    <input
                      type="text"
                      placeholder="Avatar URL"
                      value={teacher.avatar}
                      onChange={(e) => {
                        const upd = [...(editing.teachers || [])];
                        upd[idx] = { ...teacher, avatar: e.target.value };
                        setEditing({ ...editing, teachers: upd });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mt-2"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">🏷️ Теги (умения, специализация)</label>
                  <div className="space-y-2 mb-3">
                    {(teacher.tags || []).map((tag, tagIdx) => (
                      <div key={tagIdx} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Тег {tagIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const upd = [...(editing.teachers || [])];
                              upd[idx] = { ...teacher, tags: (teacher.tags || []).filter((_, i) => i !== tagIdx) };
                              setEditing({ ...editing, teachers: upd });
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️ Удалить
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="🇷🇺 Русский"
                            value={tag.ru || ''}
                            onChange={(e) => {
                              const upd = [...(editing.teachers || [])];
                              const updTags = [...(teacher.tags || [])];
                              updTags[tagIdx] = { ...tag, ru: e.target.value };
                              upd[idx] = { ...teacher, tags: updTags };
                              setEditing({ ...editing, teachers: upd });
                            }}
                            className="px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="🇬🇧 English"
                            value={tag.en || ''}
                            onChange={(e) => {
                              const upd = [...(editing.teachers || [])];
                              const updTags = [...(teacher.tags || [])];
                              updTags[tagIdx] = { ...tag, en: e.target.value };
                              upd[idx] = { ...teacher, tags: updTags };
                              setEditing({ ...editing, teachers: upd });
                            }}
                            className="px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="🇩🇪 Deutsch"
                            value={tag.de || ''}
                            onChange={(e) => {
                              const upd = [...(editing.teachers || [])];
                              const updTags = [...(teacher.tags || [])];
                              updTags[tagIdx] = { ...tag, de: e.target.value };
                              upd[idx] = { ...teacher, tags: updTags };
                              setEditing({ ...editing, teachers: upd });
                            }}
                            className="px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const upd = [...(editing.teachers || [])];
                      upd[idx] = { ...teacher, tags: [...(teacher.tags || []), { ru: '', en: '', de: '' }] };
                      setEditing({ ...editing, teachers: upd });
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium text-sm"
                  >
                    ➕ Добавить тег
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">➕ Добавить преподавателя</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Выберите из команды</label>
                <select
                  onChange={(e) => {
                    const memberId = e.target.value;
                    if (!memberId) return;
                    
                    const member = teamMembers.find(m => m.id === memberId);
                    if (!member) return;

                    const newTeacher = {
                      name: member.name,
                      role: member.role,
                      bio: emptyLocalized,
                      avatar: member.image,
                      tags: [],
                      teamMemberId: member.id,
                      isNew: false,
                    };

                    setEditing({ ...editing, teachers: [...(editing.teachers || []), newTeacher] });
                    e.target.value = '';
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Выберите сотрудника из команды —</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name[selectedLanguage] || member.name.ru} - {member.role[selectedLanguage] || member.role.ru}
                  </option>
                ))}
              </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">или</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newTeacher = {
                    name: emptyLocalized,
                    role: emptyLocalized,
                    bio: emptyLocalized,
                    avatar: '',
                    tags: [],
                    isNew: true,
                  };
                  setEditing({ ...editing, teachers: [...(editing.teachers || []), newTeacher] });
                }}
                className="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
              >
                ➕ Создать нового преподавателя
              </button>
              
              <div className="text-sm text-gray-500 flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-blue-600">ℹ️</span>
                <div>
                  <p className="font-medium text-blue-900 mb-1">Как это работает:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Выберите сотрудника из команды, если он уже есть</li>
                    <li>Или создайте нового - он автоматически добавится в команду при сохранении</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Расписание */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          {(editing.schedule?.items || []).map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">
                  📅 {item.day.toUpperCase()} на {item.time}
                </h3>
                <button
                  onClick={() => setEditing({ ...editing, schedule: { ...editing.schedule, items: (editing.schedule?.items || []).filter((_, i) => i !== idx) } })}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  🗑️ Удалить
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={item.day}
                    onChange={(e) => {
                      const upd = [...(editing.schedule?.items || [])];
                      upd[idx] = { ...item, day: e.target.value as 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' };
                      setEditing({ ...editing, schedule: { ...editing.schedule, items: upd } });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((d) => (
                      <option key={d} value={d}>
                        {d.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={item.time}
                    onChange={(e) => {
                      const upd = [...(editing.schedule?.items || [])];
                      upd[idx] = { ...item, time: e.target.value };
                      setEditing({ ...editing, schedule: { ...editing.schedule, items: upd } });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Название занятия"
                  value={item.title?.[selectedLanguage] || ''}
                  onChange={(e) => {
                    const upd = [...(editing.schedule?.items || [])];
                    upd[idx] = { ...item, title: { ...(item.title || emptyLocalized), [selectedLanguage]: e.target.value } };
                    setEditing({ ...editing, schedule: { ...editing.schedule, items: upd } });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={item.teacher?.[selectedLanguage] || ''}
                  onChange={(e) => {
                    const upd = [...(editing.schedule?.items || [])];
                    upd[idx] = { ...item, teacher: { ...(item.teacher || emptyLocalized), [selectedLanguage]: e.target.value } };
                    setEditing({ ...editing, schedule: { ...editing.schedule, items: upd } });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">— Выберите преподавателя —</option>
                  {(editing.teachers || []).map((teacher, tIdx) => (
                    <option key={tIdx} value={teacher.name?.[selectedLanguage] || ''}>
                      {teacher.name?.[selectedLanguage] || 'Без имени'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            onClick={() => setEditing({ ...editing, schedule: { ...editing.schedule, items: [...(editing.schedule?.items || []), { day: 'mon', time: '10:00', title: emptyLocalized }] } })}
            className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
          >
            ➕ Добавить занятие
          </button>
        </div>
      )}

      {/* Кнопки сохранения */}
      <div className="flex gap-3 mt-8 sticky bottom-6 bg-white p-4 rounded-lg border border-gray-200 shadow-lg">
        <button
          onClick={save}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium transition"
        >
          {loading ? '⏳ Сохранение...' : '✅ Сохранить'}
        </button>
        <button
          onClick={() => setEditing(null)}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium transition"
        >
          ❌ Отмена
        </button>
      </div>
    </div>
  );
}
