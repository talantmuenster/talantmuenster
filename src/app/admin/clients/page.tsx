'use client';

import { useEffect, useState } from 'react';

type Client = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  sources?: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'newsletter' | 'event-registration'>('all');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', country: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', phone: '', city: '', country: '' });

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      if (!res.ok) throw new Error('Ошибка при загрузке клиентов');
      const data = await res.json();
      setClients(data || []);
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке клиентов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email && !formData.phone) {
      setError('Укажите email или телефон');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          city: formData.city.trim(),
          country: formData.country.trim(),
        }),
      });
      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess('Клиент добавлен');
      setFormData({ name: '', email: '', phone: '', city: '', country: '' });
      await fetchClients();
    } catch (err: any) {
      setError(err.message || 'Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  const openClient = async (client: Client) => {
    setSelectedClient(client);
    setIsEditing(false);
    setEditData({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      city: client.city || '',
      country: client.country || '',
    });
    setHistory([]);
    setHistoryLoading(true);

    try {
      const params = new URLSearchParams();
      if (client.email) params.set('email', client.email);
      if (client.phone) params.set('phone', client.phone);

      const res = await fetch(`/api/event-registration?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data || []);
      }
    } catch (err) {
      console.error('Failed to load client history', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const saveClient = async () => {
    if (!selectedClient) return;
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedClient.id,
          ...editData,
        }),
      });
      if (!res.ok) throw new Error('Ошибка при сохранении');

      setSuccess('Клиент обновлён');
      const updatedClient = { ...selectedClient, ...editData } as Client;
      setSelectedClient(updatedClient);
      setIsEditing(false);
      await fetchClients();
    } catch (err: any) {
      setError(err.message || 'Ошибка при сохранении');
    }
  };

  const exportToCsv = () => {
    const rows = [
      ['name', 'email', 'phone', 'sources', 'updatedAt'],
      ...clients.map((c) => [
        c.name || '',
        c.email || '',
        c.phone || '',
        (c.sources || []).join('|'),
        c.updatedAt || '',
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clients-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredClients = clients.filter((client) => {
    if (sourceFilter === 'all') return true;
    return (client.sources || []).includes(sourceFilter);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Клиенты</h1>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">Всего: {filteredClients.length}</div>
          <button
            onClick={exportToCsv}
            className="px-3 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Экспорт CSV
          </button>
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

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="font-semibold text-gray-900 mb-3">Добавить клиента</div>
        <form className="grid grid-cols-1 md:grid-cols-5 gap-3" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Телефон"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Город"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Страна"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={isSaving}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 md:col-span-5"
          >
            {isSaving ? 'Сохранение...' : 'Добавить'}
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSourceFilter('all')}
          className={`px-3 py-1 text-sm rounded-full border ${
            sourceFilter === 'all'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setSourceFilter('newsletter')}
          className={`px-3 py-1 text-sm rounded-full border ${
            sourceFilter === 'newsletter'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          Подписка на новости
        </button>
        <button
          onClick={() => setSourceFilter('event-registration')}
          className={`px-3 py-1 text-sm rounded-full border ${
            sourceFilter === 'event-registration'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          Регистрации на мероприятия
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Загрузка...</div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Нет клиентов</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Контакты
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Источник
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Обновлено
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Карточка
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {client.name || '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{client.email || '—'}</div>
                    <div className="text-sm text-gray-500">{client.phone || '—'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {(client.sources || []).map((source) => (
                        <span
                          key={source}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            source === 'newsletter'
                              ? 'bg-green-100 text-green-700'
                              : source === 'admin'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {source === 'newsletter'
                            ? 'Новости'
                            : source === 'admin'
                              ? 'Админ'
                              : 'Мероприятия'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {client.updatedAt
                      ? new Date(client.updatedAt).toLocaleString('ru-RU')
                      : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openClient(client)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Карточка
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Карточка клиента</h3>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900">Данные клиента</div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {isEditing ? 'Отмена' : 'Редактировать'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Имя</div>
                  {isEditing ? (
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div className="font-semibold text-gray-900">{selectedClient.name || '—'}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  {isEditing ? (
                    <input
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-900">{selectedClient.email || '—'}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Телефон</div>
                  {isEditing ? (
                    <input
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-900">{selectedClient.phone || '—'}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Город</div>
                  {isEditing ? (
                    <input
                      value={editData.city}
                      onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-900">{selectedClient.city || '—'}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Страна</div>
                  {isEditing ? (
                    <input
                      value={editData.country}
                      onChange={(e) => setEditData({ ...editData, country: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-900">{selectedClient.country || '—'}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Источники</div>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {(selectedClient.sources || []).map((source) => (
                      <span
                        key={source}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          source === 'newsletter'
                            ? 'bg-green-100 text-green-700'
                            : source === 'admin'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {source === 'newsletter'
                          ? 'Новости'
                          : source === 'admin'
                            ? 'Админ'
                            : 'Мероприятия'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    onClick={saveClient}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Сохранить
                  </button>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="font-semibold text-gray-900 mb-2">История мероприятий</div>
                {historyLoading ? (
                  <div className="text-gray-500">Загрузка...</div>
                ) : history.length === 0 ? (
                  <div className="text-gray-500">История не найдена</div>
                ) : (
                  <ul className="space-y-2">
                    {history.map((reg) => (
                      <li key={reg.id} className="flex items-center justify-between text-sm">
                        <div className="text-gray-900">{reg.eventTitle || 'Мероприятие'}</div>
                        <div className="text-gray-500">
                          {reg.createdAt ? new Date(reg.createdAt).toLocaleString('ru-RU') : '—'}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t">
              <button
                onClick={() => setSelectedClient(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
