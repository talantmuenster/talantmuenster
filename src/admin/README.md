# Admin Panel Module

Модульная админ-панель для управления контентом в Next.js приложениях с Firebase.

## ✨ Возможности

- ✅ Управление мероприятиями (События)
- ✅ Публикация новостей с изображениями
- ✅ Управление проектами с фото
- ✅ Редактирование реквизитов организации
- ✅ Поддержка 3 языков (RU/EN/DE)
- ✅ Загрузка изображений в Firebase Storage
- ✅ Многоязычное редактирование контента

## 📁 Структура

```
src/
├── admin/
│   ├── config.ts              # Конфигурация модуля
│   ├── hooks/                 # Кастомные хуки
│   ├── lib/                   # Утилиты и помощники
│   ├── api/                   # API endpoints (server-side)
│   │   ├── events/route.ts
│   │   ├── news/route.ts
│   │   ├── projects/route.ts
│   │   └── org-settings/route.ts
│   ├── components/            # Переиспользуемые компоненты
│   │   ├── LanguageEditor.tsx # Редактор на 3 языках
│   │   ├── ImageUpload.tsx    # Загрузка фото
│   │   └── FormCard.tsx       # Карточка формы
│   ├── pages/                 # Страницы админ-панели
│   │   ├── dashboard.tsx
│   │   ├── events.tsx
│   │   ├── news.tsx
│   │   ├── projects.tsx
│   │   └── org-settings.tsx
│   └── types.ts               # TypeScript типы
```

## 🚀 Быстрый старт

### 1. Инициализация

```typescript
// src/app/admin/layout.tsx
import AdminProvider from '@/admin/config'

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}
```

### 2. Использование в проекте

```typescript
// src/app/admin/page.tsx
import AdminDashboard from '@/admin/pages/dashboard'

export default function AdminPage() {
  return <AdminDashboard />
}
```

## 🔧 Конфигурация Firebase

Убедитесь, что `.env.local` содержит:

```env
# Firebase Admin SDK
FIREBASE_ADMIN_KEY={"type":"service_account",...}

# Firebase Web App
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 📝 API Endpoints

### События (Events)
- `GET /api/admin/events` - Список
- `POST /api/admin/events` - Создать
- `PUT /api/admin/events?id=X` - Обновить
- `DELETE /api/admin/events?id=X` - Удалить

### Новости (News)
- `GET /api/admin/news` - Список
- `POST /api/admin/news` - Создать
- `PUT /api/admin/news?id=X` - Обновить
- `DELETE /api/admin/news?id=X` - Удалить

### Проекты (Projects)
- `GET /api/admin/projects` - Список
- `POST /api/admin/projects` - Создать
- `PUT /api/admin/projects?id=X` - Обновить
- `DELETE /api/admin/projects?id=X` - Удалить

### Реквизиты организации (Organization Settings)
- `GET /api/admin/org-settings` - Получить
- `PUT /api/admin/org-settings` - Обновить

## 🎨 Компоненты

### LanguageEditor
Редактор контента на 3 языках (RU/EN/DE):

```tsx
<LanguageEditor
  content={item.title}
  onChange={(c) => setItem({...item, title: c})}
  fieldName="Название"
  isTextarea={false}
/>
```

### ImageUpload
Загрузка изображений в Firebase Storage:

```tsx
<ImageUpload
  onUpload={(url) => setImage(url)}
  folder="news"
  maxSizeMB={5}
/>
```

## 🔐 Аутентификация

Админ-панель использует Firebase Authentication. Для входа нужна учётная запись с email/паролем.

## 📦 Подключение в другой проект

1. Скопируйте папку `src/admin` в целевой проект
2. Убедитесь, что установлены зависимости:
   ```bash
   npm install firebase firebase-admin
   ```
3. Настройте `.env.local` с Firebase credentials
4. Импортируйте компоненты в ваши страницы

## 📄 Типы данных

Все типы определены в `src/admin/types.ts` и наследуют `LocalizedContent` для многоязычности.

---

**Версия:** 1.0.0  
**Лицензия:** MIT  
**Требования:** Next.js 14+, Firebase 10+, React 18+
