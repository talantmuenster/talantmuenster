'use client';

import { useEffect, useState } from 'react';
import LanguageEditor, { LanguageEditorProvider, LanguageTabs } from '@/admin/components/LanguageEditor';
import ImageUpload from '@/admin/components/ImageUpload';
import { LocalizedContent } from '@/admin/types';
import { programs as initialPrograms } from '@/data/programs';
import type { ProgramHeroData } from '@/lib/programs';

const emptyLocalized: LocalizedContent = { ru: '', en: '', de: '' };

type ScheduleItem = {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  time: string;
  title: LocalizedContent;
  teacher?: LocalizedContent;
};

type CourseTab = {
  title: LocalizedContent;
  description: LocalizedContent;
  address: string;
  duration: string;
  price: string;
  ctaLabel?: LocalizedContent;
};

type Teacher = {
  name: LocalizedContent;
  role: LocalizedContent;
  bio: LocalizedContent;
  avatar: string;
  tags: LocalizedContent[];
};

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<ProgramHeroData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<ProgramHeroData | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'courses' | 'teachers' | 'schedule'>('info');

  useEffect(() => {
    setPrograms(initialPrograms);
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Save to file/database (simplified - in production use API)
      const updated = programs.map((p) => (p.slug === editing.slug ? editing : p));
      setPrograms(updated);
      setSuccess('Программа сохранена');
      setTimeout(() => {
        setEditing(null);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(`Ошибка: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (slug: string) => {
    if (confirm('Вы уверены?')) {
      setPrograms(programs.filter((p) => p.slug !== slug));
    }
  };

  const handleAddCourse = () => {
    if (!editing) return;
    const newCourse: CourseTab = {
      title: emptyLocalized,
      description: emptyLocalized,
      address: '',
      duration: '',
      price: '',
    };
    setEditing({
      ...editing,
      courseTabs: [...(editing.courseTabs || []), newCourse],
    });
  };

  const handleAddTeacher = () => {
    if (!editing) return;
    const newTeacher: Teacher = {
      name: emptyLocalized,
      role: emptyLocalized,
      bio: emptyLocalized,
      avatar: '',
      tags: [],
    };
    setEditing({
      ...editing,
      teachers: [...(editing.teachers || []), newTeacher],
    });
  };

  const handleAddScheduleItem = () => {
    if (!editing) return;
    const newItem: ScheduleItem = {
      day: 'mon',
      time: '10:00',
      title: emptyLocalized,
      teacher: emptyLocalized,
    };
    setEditing({
      ...editing,
      schedule: {
        ...editing.schedule,
        items: [...(editing.schedule?.items || []), newItem],
      },
    });
  };

  if (!editing) {
    return (
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Программы</h1>

        {error && <div style={{ color: '#dc2626', marginBottom: '16px' }}>{error}</div>}
        {success && <div style={{ color: '#059669', marginBottom: '16px' }}>{success}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {programs.map((program) => (
            <div
              key={program.slug}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
              }}
            >
              {program.cover && (
                <img
                  src={program.cover}
                  alt={program.title.ru}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '12px' }}
                />
              )}
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{program.title.ru}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>{program.subtitle.ru}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditing(program)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(program.slug)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
        <button
          onClick={() => setEditing(null)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ← Назад
        </button>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Редактирование: {editing.title.ru}</h1>
      </div>

      {error && <div style={{ color: '#dc2626', marginBottom: '16px' }}>{error}</div>}
      {success && <div style={{ color: '#059669', marginBottom: '16px' }}>{success}</div>}

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {(['info', 'courses', 'teachers', 'schedule'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 16px',
              backgroundColor: activeTab === tab ? '#3b82f6' : 'transparent',
              color: activeTab === tab ? '#fff' : '#64748b',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '600' : '400',
              borderRadius: '4px 4px 0 0',
            }}
          >
            {tab === 'info' && 'Основная информация'}
            {tab === 'courses' && 'Курсы'}
            {tab === 'teachers' && 'Преподаватели'}
            {tab === 'schedule' && 'Расписание'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'info' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Slug</label>
            <input
              type="text"
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
              }}
            />
          </div>

          <LanguageEditorProvider>
            <LanguageTabs>
              {['ru', 'en', 'de'].map((lang) => (
                <div key={lang} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
                  <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>{lang.toUpperCase()}</h3>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Название</label>
                    <input
                      type="text"
                      value={editing.title[lang as keyof typeof editing.title]}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          title: { ...editing.title, [lang]: e.target.value },
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Описание</label>
                    <textarea
                      value={editing.subtitle[lang as keyof typeof editing.subtitle]}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          subtitle: { ...editing.subtitle, [lang]: e.target.value },
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                        minHeight: '100px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </LanguageTabs>
          </LanguageEditorProvider>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Обложка</label>
            <input
              type="text"
              value={editing.cover}
              onChange={(e) => setEditing({ ...editing, cover: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
              }}
              placeholder="/home/programs/..."
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Статус</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              />
              Опубликовано
            </label>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {(editing.courseTabs || []).map((course, index) => (
            <div key={index} style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontWeight: '600' }}>{course.title.ru || `Курс ${index + 1}`}</h3>
                <button
                  onClick={() => {
                    setEditing({
                      ...editing,
                      courseTabs: editing.courseTabs?.filter((_, i) => i !== index),
                    });
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Удалить
                </button>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Адрес"
                  value={course.address}
                  onChange={(e) => {
                    const updated = [...(editing.courseTabs || [])];
                    updated[index] = { ...course, address: e.target.value };
                    setEditing({ ...editing, courseTabs: updated });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                  }}
                />
                <input
                  type="text"
                  placeholder="Длительность (например, 2 часа)"
                  value={course.duration}
                  onChange={(e) => {
                    const updated = [...(editing.courseTabs || [])];
                    updated[index] = { ...course, duration: e.target.value };
                    setEditing({ ...editing, courseTabs: updated });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                  }}
                />
                <input
                  type="text"
                  placeholder="Цена (например, 20€)"
                  value={course.price}
                  onChange={(e) => {
                    const updated = [...(editing.courseTabs || [])];
                    updated[index] = { ...course, price: e.target.value };
                    setEditing({ ...editing, courseTabs: updated });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleAddCourse}
            style={{
              padding: '12px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              border: '1px dashed #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            + Добавить курс
          </button>
        </div>
      )}

      {activeTab === 'teachers' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {(editing.teachers || []).map((teacher, index) => (
            <div key={index} style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontWeight: '600' }}>{teacher.name.ru || `Преподаватель ${index + 1}`}</h3>
                <button
                  onClick={() => {
                    setEditing({
                      ...editing,
                      teachers: editing.teachers?.filter((_, i) => i !== index),
                    });
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Удалить
                </button>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  value={teacher.avatar}
                  onChange={(e) => {
                    const updated = [...(editing.teachers || [])];
                    updated[index] = { ...teacher, avatar: e.target.value };
                    setEditing({ ...editing, teachers: updated });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                  }}
                />
                {/* Multilingual fields would go here */}
              </div>
            </div>
          ))}

          <button
            onClick={handleAddTeacher}
            style={{
              padding: '12px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              border: '1px dashed #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            + Добавить преподавателя
          </button>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          {(editing.schedule?.items || []).map((item, index) => (
            <div key={index} style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontWeight: '600' }}>
                  {item.day.toUpperCase()} {item.time}
                </h3>
                <button
                  onClick={() => {
                    setEditing({
                      ...editing,
                      schedule: {
                        ...editing.schedule,
                        items: editing.schedule?.items?.filter((_, i) => i !== index),
                      },
                    });
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Удалить
                </button>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                <select
                  value={item.day}
                  onChange={(e) => {
                    const updated = [...(editing.schedule?.items || [])];
                    updated[index] = { ...item, day: e.target.value as ScheduleItem['day'] };
                    setEditing({
                      ...editing,
                      schedule: { ...editing.schedule, items: updated },
                    });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                  }}
                >
                  <option value="mon">Понедельник</option>
                  <option value="tue">Вторник</option>
                  <option value="wed">Среда</option>
                  <option value="thu">Четверг</option>
                  <option value="fri">Пятница</option>
                  <option value="sat">Суббота</option>
                  <option value="sun">Воскресенье</option>
                </select>

                <input
                  type="time"
                  value={item.time}
                  onChange={(e) => {
                    const updated = [...(editing.schedule?.items || [])];
                    updated[index] = { ...item, time: e.target.value };
                    setEditing({
                      ...editing,
                      schedule: { ...editing.schedule, items: updated },
                    });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                  }}
                />

                <input
                  type="text"
                  placeholder="Название занятия (RU)"
                  value={item.title.ru}
                  onChange={(e) => {
                    const updated = [...(editing.schedule?.items || [])];
                    updated[index] = { ...item, title: { ...item.title, ru: e.target.value } };
                    setEditing({
                      ...editing,
                      schedule: { ...editing.schedule, items: updated },
                    });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleAddScheduleItem}
            style={{
              padding: '12px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              border: '1px dashed #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            + Добавить слот расписания
          </button>
        </div>
      )}

      {/* Save Button */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: loading ? '#cbd5e1' : '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
          }}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button
          onClick={() => setEditing(null)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
