// Admin Dashboard

'use client';

import { useEffect, useState } from 'react';

interface Stats {
  events: number;
  news: number;
  projects: number;
  publishedEvents: number;
  publishedNews: number;
  publishedProjects: number;
}

interface StatCard {
  label: string;
  value: number;
  color: string;
  icon: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    events: 0,
    news: 0,
    projects: 0,
    publishedEvents: 0,
    publishedNews: 0,
    publishedProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [eventsRes, newsRes, projectsRes] = await Promise.all([
        fetch('/api/admin/events', { credentials: 'include' }),
        fetch('/api/admin/news', { credentials: 'include' }),
        fetch('/api/admin/projects', { credentials: 'include' }),
      ]);

      const events = await eventsRes.json();
      const news = await newsRes.json();
      const projects = await projectsRes.json();

      setStats({
        events: events.length || 0,
        news: news.length || 0,
        projects: projects.length || 0,
        publishedEvents: events.filter((e: any) => e.published).length || 0,
        publishedNews: news.filter((n: any) => n.published).length || 0,
        publishedProjects: projects.filter((p: any) => p.published).length || 0,
      });
    } catch (err) {
      setError('Ошибка при загрузке статистики');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statCards: StatCard[] = [
    {
      label: 'Мероприятия',
      value: stats.events,
      color: 'blue',
      icon: '📅',
    },
    {
      label: 'Новости',
      value: stats.news,
      color: 'purple',
      icon: '📰',
    },
    {
      label: 'Проекты',
      value: stats.projects,
      color: 'green',
      icon: '🎨',
    },
    {
      label: 'Опубликованные мероприятия',
      value: stats.publishedEvents,
      color: 'cyan',
      icon: '✅',
    },
    {
      label: 'Опубликованные новости',
      value: stats.publishedNews,
      color: 'indigo',
      icon: '✅',
    },
    {
      label: 'Опубликованные проекты',
      value: stats.publishedProjects,
      color: 'emerald',
      icon: '✅',
    },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          Панель управления
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Добро пожаловать! Здесь вы можете управлять всем контентом сайта</p>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            fontSize: '16px',
            color: '#64748b',
          }}
        >
          ⏳ Загрузка статистики...
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            {statCards.map((card, idx) => {
              const colorMap: { [key: string]: { bg: string; icon: string; value: string } } = {
                blue: { bg: '#dbeafe', icon: '📅', value: '#0284c7' },
                purple: { bg: '#e9d5ff', icon: '📰', value: '#7c3aed' },
                green: { bg: '#dcfce7', icon: '🎨', value: '#16a34a' },
                cyan: { bg: '#cffafe', icon: '✅', value: '#0891b2' },
                indigo: { bg: '#e0e7ff', icon: '✅', value: '#4f46e5' },
                emerald: { bg: '#d1fae5', icon: '✅', value: '#059669' },
              };

              const colors = colorMap[card.color] || colorMap.blue;

              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>{card.label}</span>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: colors.bg,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: colors.value }}>{card.value}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Быстрые действия</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              }}
            >
              {[
                { label: 'Добавить мероприятие', href: '/admin/events', color: '#3b82f6' },
                { label: 'Добавить новость', href: '/admin/news', color: '#8b5cf6' },
                { label: 'Добавить проект', href: '/admin/projects', color: '#10b981' },
                { label: 'Редактировать реквизиты', href: '/admin/settings', color: '#6b7280' },
              ].map((action, idx) => (
                <a
                  key={idx}
                  href={action.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    backgroundColor: `${action.color}15`,
                    border: `1px solid ${action.color}40`,
                    borderRadius: '8px',
                    color: action.color,
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${action.color}25`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${action.color}15`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  ➕ {action.label}
                </a>
              ))}
            </div>
          </div>

          {/* Information Cards */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>ℹ️ Полезная информация</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  icon: '🌐',
                  title: 'Многоязычный контент',
                  desc: 'Каждый материал доступен на русском, английском и немецком языках',
                },
                {
                  icon: '🖼️',
                  title: 'Качественные изображения',
                  desc: 'Добавляйте четкие и привлекательные изображения для лучшей визуализации',
                },
                {
                  icon: '📢',
                  title: 'Публикация контента',
                  desc: 'Опубликованный контент видит на сайте, черновики видны только вам',
                },
                {
                  icon: '🏢',
                  title: 'Информация организации',
                  desc: 'Данные будут отображаться в подвале сайта и контактной информации',
                },
              ].map((info, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: '3px solid #3b82f6',
                  }}
                >
                  <span style={{ fontSize: '18px', minWidth: '24px' }}>{info.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{info.title}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{info.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
