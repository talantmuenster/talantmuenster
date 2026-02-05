// Events Management Page

'use client';

import { useEffect, useState } from 'react';
import LanguageEditor from '@/admin/components/LanguageEditor';
import ImageUpload from '@/admin/components/ImageUpload';
import { Event, LocalizedContent } from '@/admin/types';
import { EventRegistrations } from '@/components/admin/EventRegistrations';

const emptyLocalized: LocalizedContent = { ru: '', en: '', de: '' };

export default function EventsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registrationCounts, setRegistrationCounts] = useState<Record<string, number>>({});
  const [registrationsByEvent, setRegistrationsByEvent] = useState<Record<string, any[]>>({});

  const fetchItems = async () => {
    setLoading(true);
    try {
      const [eventsRes, registrationsRes] = await Promise.all([
        fetch('/api/admin/events'),
        fetch('/api/event-registration'),
      ]);
      const eventsData = await eventsRes.json();
      const registrationsData = registrationsRes.ok ? await registrationsRes.json() : [];

      setItems(eventsData || []);

      const counts: Record<string, number> = {};
      const grouped: Record<string, any[]> = {};
      (registrationsData || []).forEach((registration: any) => {
        if (!registration?.eventId) return;
        counts[registration.eventId] = (counts[registration.eventId] || 0) + 1;
        if (!grouped[registration.eventId]) grouped[registration.eventId] = [];
        grouped[registration.eventId].push(registration);
      });

      // Ensure all events are present with default 0
      (eventsData || []).forEach((event: any) => {
        if (!event?.id) return;
        if (counts[event.id] === undefined) counts[event.id] = 0;
      });

      setRegistrationCounts(counts);
      setRegistrationsByEvent(grouped);
    } catch (err) {
      setError('Ошибка при загрузке событий');
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
      date: new Date().toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '12:00',
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setError('');
    setSuccess('');
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.title.ru || !editing.date) {
      setError('Заполните название и дату');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = editing.id ? `/api/admin/events?id=${editing.id}` : '/api/admin/events';
      const method = editing.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess(editing.id ? '✅ Событие обновлено' : '✅ Событие создано');
      setEditing(null);
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Удалить это событие?')) return;

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка при удалении');

      setSuccess('✅ Событие удалено');
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление мероприятиями</h1>
        <button
          onClick={startNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Новое событие
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
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Загрузка...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Нет событий</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-r from-white to-blue-50 p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition flex justify-between items-start gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-700 rounded-lg p-3 min-w-fit">
                      <div className="text-xs font-bold">
                        {new Date(item.date).toLocaleDateString('ru-RU', { month: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(item.date).getDate()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {item.title?.ru || item.title?.en || item.title?.de || 'Без названия'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        🕐 {item.startTime} - {item.endTime}
                      </p>
                      {item.location && (
                        <p className="text-sm text-gray-600">
                          📍 {item.location?.ru || item.location?.en}
                        </p>
                      )}
                      <div className="flex gap-3 mt-3">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                          👥 {item.registrationCount ?? registrationCounts[item.id!] ?? 0}
                        </span>
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

                      {registrationsByEvent[item.id!]?.length > 0 && (
                        <div className="mt-3 text-sm text-gray-700">
                          <div className="font-semibold mb-1">Записались:</div>
                          <ul className="list-disc pl-5 space-y-1">
                            {registrationsByEvent[item.id!].slice(0, 5).map((reg) => (
                              <li key={reg.id}>
                                {reg.name} {reg.phone ? `• ${reg.phone}` : ''}
                              </li>
                            ))}
                          </ul>
                          {registrationsByEvent[item.id!].length > 5 && (
                            <div className="text-xs text-gray-500 mt-1">
                              и ещё {registrationsByEvent[item.id!].length - 5}
                            </div>
                          )}
                        </div>
                      )}
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
            {editing.id ? 'Редактировать' : 'Новое'} событие
          </h2>

          <LanguageEditor
            content={editing.title}
            onChange={(c) => setEditing({ ...editing, title: c })}
            fieldName="Название события"
            placeholder="Введите название"
          />

          <LanguageEditor
            content={editing.description}
            onChange={(c) => setEditing({ ...editing, description: c })}
            fieldName="Описание"
            isTextarea
            placeholder="Подробное описание события"
          />

          {editing.location && (
            <LanguageEditor
              content={editing.location}
              onChange={(c) => setEditing({ ...editing, location: c })}
              fieldName="Место проведения"
              placeholder="Город, адрес"
            />
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
              <input
                type="date"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Начало</label>
              <input
                type="time"
                value={editing.startTime}
                onChange={(e) => setEditing({ ...editing, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Конец</label>
              <input
                type="time"
                value={editing.endTime}
                onChange={(e) => setEditing({ ...editing, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {editing.imageUrl && (
            <ImageUpload
              onUpload={(url) => setEditing({ ...editing, imageUrl: url })}
              currentImageUrl={editing.imageUrl}
              folder="events"
            />
          )}

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

          {/* Registrations for this event */}
          {editing.id && (
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-semibold mb-4">Регистрации на это мероприятие</h3>
              <EventRegistrations eventId={editing.id} />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
