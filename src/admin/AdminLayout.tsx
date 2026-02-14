// Admin Dashboard Layout - Modern Design

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIdleTimer } from '@/hooks/useIdleTimer';

type Tab = 'dashboard' | 'events' | 'programs' | 'documents' | 'news' | 'projects' | 'clients' | 'settings';

interface NavItem {
  id: Tab;
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Панель управления', icon: '📊', href: '/admin' },
  { id: 'events', label: 'Мероприятия', icon: '📅', href: '/admin/events' },
  { id: 'programs', label: 'Программы', icon: '📚', href: '/admin/programs' },
  { id: 'documents', label: 'Документы', icon: '📄', href: '/admin/documents' },
  { id: 'news', label: 'Новости', icon: '📰', href: '/admin/news' },
  { id: 'projects', label: 'Проекты', icon: '🎨', href: '/admin/projects' },
  { id: 'clients', label: 'Клиенты', icon: '👥', href: '/admin/clients' },
  { id: 'settings', label: 'Настройки', icon: '⚙️', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showIdleWarning, setShowIdleWarning] = useState(false);
  const pathname = usePathname();

  // Warning at 9 minutes (1 minute before logout)
  useIdleTimer({
    timeout: 9 * 60 * 1000, // 9 minutes
    onIdle: () => {
      setShowIdleWarning(true);
    },
    enabled: true,
  });

  // Auto-logout after 10 minutes of inactivity
  useIdleTimer({
    timeout: 10 * 60 * 1000, // 10 minutes
    onIdle: async () => {
      try {
        await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      } catch (err) {
        console.error('Logout failed', err);
      } finally {
        window.location.href = '/admin/login';
      }
    },
    enabled: true,
  });

  // Reset warning on any activity
  useEffect(() => {
    const handleActivity = () => {
      if (showIdleWarning) {
        setShowIdleWarning(false);
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [showIdleWarning]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc', color: '#1e293b' }}>
      {/* Idle Warning Banner */}
      {showIdleWarning && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: '#fef3c7',
            borderBottom: '2px solid #f59e0b',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <span style={{ color: '#92400e', fontWeight: '600', fontSize: '14px' }}>
            Вы неактивны. Автоматический выход через 1 минуту.
          </span>
        </div>
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? '280px' : '80px',
          height: '100vh',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          zIndex: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarOpen ? '24px' : '16px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {sidebarOpen && (
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Talant</h1>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              backgroundColor: 'transparent',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            ☰
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px', overflow: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: active ? '#3b82f6' : '#64748b',
                    textDecoration: 'none',
                    backgroundColor: active ? '#eff6ff' : 'transparent',
                    borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
                    fontSize: '14px',
                    fontWeight: active ? '600' : '500',
                    transition: 'all 0.2s ease',
                    paddingLeft: active ? '12px' : '12px',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#64748b';
                    }
                  }}
                >
                  <span style={{ fontSize: '18px', minWidth: '20px' }}>{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={async () => {
              try {
                await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
                window.location.href = '/admin/login';
              } catch (err) {
                console.error('Logout failed', err);
                window.location.href = '/admin/login';
              }
            }}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fecaca')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
          >
            <span style={{ fontSize: '14px' }}>🚪</span>
            {sidebarOpen && 'Выход'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            height: '64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 24px', height: '100%', gap: '16px' }}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                color: '#0f172a',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eef2ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
            >
              На главную
            </a>
            {/* User Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6',
                  fontWeight: '700',
                  fontSize: '14px',
                }}
              >
                A
              </div>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Администратор</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            backgroundColor: '#f8fafc',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
