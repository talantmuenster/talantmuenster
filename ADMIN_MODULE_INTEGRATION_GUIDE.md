# Admin Panel Integration Guide

## Overview

The **Talant Admin Module** is a fully modular, reusable admin panel system for Next.js projects. It's designed to be copied into any Next.js project and integrated seamlessly.

## Features

✅ **Multi-language Support** (Russian, English, German)  
✅ **Complete CRUD Operations** for Events, News, Projects, and Organization Settings  
✅ **Firebase Integration** (Firestore + Storage)  
✅ **Image Upload & Management** with drag-and-drop  
✅ **Responsive Design** (mobile-friendly)  
✅ **Dashboard & Statistics** with quick actions  
✅ **Server-Side APIs** for secure database operations  

## Quick Start (Copy-Paste Integration)

### 1. Copy the admin module into your project

```bash
# From your Next.js project root
cp -r /path/to/talantmuenster/src/admin ./src/
cp -r /path/to/talantmuenster/src/app/api/admin ./src/app/api/
```

### 2. Update your Next.js configuration for image optimization

Ensure your `next.config.ts` includes Firebase Storage domain:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
```

### 3. Set up environment variables

Create `.env.local` with Firebase configuration:

```env
# Firebase Admin SDK (server-side only)
FIREBASE_ADMIN_KEY='{"type":"service_account","project_id":"your-project","..."}'

# Firebase Public Config (client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456:web:abc
```

### 4. Initialize Firebase in your project

Ensure you have Firebase admin and client libraries set up in `src/lib/`:

**src/lib/firebase.ts** (Server-side):
```typescript
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const db = admin.firestore();
export const storage = admin.storage();
```

**src/lib/firebase-client.ts** (Client-side):
```typescript
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
```

### 5. Access the admin panel

Visit: `http://localhost:3000/admin`

**Available routes:**
- `/admin` — Dashboard with statistics
- `/admin/events` — Manage events
- `/admin/news` — Manage news articles
- `/admin/projects` — Manage projects
- `/admin/settings` — Organization settings

## Module Structure

```
src/admin/
├── README.md                    # Module documentation
├── types.ts                     # TypeScript definitions
├── AdminLayout.tsx              # Sidebar + header layout
├── components/
│   ├── LanguageEditor.tsx       # 3-language content editor
│   └── ImageUpload.tsx          # Drag-drop image uploader
└── pages/
    ├── events.tsx               # Events management
    ├── news.tsx                 # News management
    ├── projects.tsx             # Projects management
    └── org-settings.tsx         # Organization settings

src/app/
├── admin/
│   ├── layout.tsx               # Admin layout wrapper
│   ├── page.tsx                 # Dashboard
│   ├── events/page.tsx          # Events route
│   ├── news/page.tsx            # News route
│   ├── projects/page.tsx        # Projects route
│   └── settings/page.tsx        # Settings route
└── api/admin/
    ├── events/route.ts          # Events API (GET/POST/PUT/DELETE)
    ├── news/route.ts            # News API (GET/POST/PUT/DELETE)
    ├── projects/route.ts        # Projects API (GET/POST/PUT/DELETE)
    ├── org-settings/route.ts    # Settings API (GET/PUT)
    └── upload-image/route.ts    # Image upload handler
```

## API Endpoints

### Events
- `GET /api/admin/events` — Get all events
- `POST /api/admin/events` — Create event
- `PUT /api/admin/events?id=<id>` — Update event
- `DELETE /api/admin/events?id=<id>` — Delete event

### News
- `GET /api/admin/news` — Get all news
- `POST /api/admin/news` — Create article
- `PUT /api/admin/news?id=<id>` — Update article
- `DELETE /api/admin/news?id=<id>` — Delete article

### Projects
- `GET /api/admin/projects` — Get all projects
- `POST /api/admin/projects` — Create project
- `PUT /api/admin/projects?id=<id>` — Update project
- `DELETE /api/admin/projects?id=<id>` — Delete project

### Organization Settings
- `GET /api/admin/org-settings` — Get settings
- `PUT /api/admin/org-settings` — Update settings

### Image Upload
- `POST /api/admin/upload-image` — Upload image to Firebase Storage
  - FormData with `file` and `folder` fields
  - Returns `{ url: 'https://storage.googleapis.com/...' }`

## Data Models

### Event
```typescript
{
  id?: string;
  title: LocalizedContent;        // { ru: '', en: '', de: '' }
  description: LocalizedContent;
  date: string;                   // ISO date
  startTime: string;              // HH:mm
  endTime: string;                // HH:mm
  location?: string;
  registrationUrl?: string;
  imageUrl?: string;
  published: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
```

### News
```typescript
{
  id?: string;
  title: LocalizedContent;
  content: LocalizedContent;
  excerpt: LocalizedContent;
  imageUrl: string;
  date: string;                   // ISO date
  published: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
```

### Project
```typescript
{
  id?: string;
  title: LocalizedContent;
  description: LocalizedContent;
  content: LocalizedContent;
  imageUrl: string;
  featured: boolean;
  published: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
```

### OrganizationSettings
```typescript
{
  name: LocalizedContent;
  description: LocalizedContent;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logoUrl?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
}
```

## Using Components in Your App

### LanguageEditor Component

```typescript
import LanguageEditor from '@/admin/components/LanguageEditor';
import { LocalizedContent } from '@/admin/types';

export default function MyComponent() {
  const [content, setContent] = useState<LocalizedContent>({
    ru: '',
    en: '',
    de: '',
  });

  return (
    <LanguageEditor
      content={content}
      onChange={setContent}
      fieldName="Article Title"
      isTextarea={false}
      placeholder="Enter title"
    />
  );
}
```

### ImageUpload Component

```typescript
import ImageUpload from '@/admin/components/ImageUpload';

export default function MyComponent() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUpload
      onUpload={setImageUrl}
      currentImageUrl={imageUrl}
      folder="my-folder"
      maxSizeMB={5}
    />
  );
}
```

## Fetching Data in Your Frontend

### Server Component Example
```typescript
import { db } from '@/lib/firebase';
import { collection, query, where } from 'firebase/firestore';

export default async function EventsList() {
  const eventsRef = collection(db, 'events');
  const q = query(eventsRef, where('published', '==', true));
  const snapshot = await getDocs(q);
  const events = snapshot.docs.map(doc => doc.data());

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>{event.title.en}</div>
      ))}
    </div>
  );
}
```

### Client Component Example
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/admin/events');
      const data = await res.json();
      setEvents(data.filter(e => e.published));
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>{event.title.en}</div>
      ))}
    </div>
  );
}
```

## Firebase Firestore Collections

The admin panel creates and manages these collections:

- **events** — Stores all events
- **news** — Stores all news articles
- **projects** — Stores all projects
- **settings** — Stores organization settings (document ID: `organization`)

## Authentication Notes

Currently, the admin panel is **public** for demonstration. To add authentication:

1. Create a login page at `/admin/login`
2. Use Firebase Authentication (Email/Password)
3. Protect routes with middleware checking `Authorization` header
4. Store auth token in a cookie or localStorage

Example protected middleware:

```typescript
import { middleware } from 'next/request';

export function adminMiddleware(request) {
  const authToken = request.cookies.get('adminToken')?.value;
  
  if (!authToken && request.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/admin/login', request.url));
  }
}
```

## Customization

### Add new language

Edit `src/admin/types.ts`:

```typescript
export interface LocalizedContent {
  ru: string;
  en: string;
  de: string;
  fr?: string; // Add French
}
```

Then update `LanguageEditor.tsx` to include French tab.

### Change admin colors

Edit `src/admin/AdminLayout.tsx` and component pages. Replace Tailwind classes:

```tsx
// Change from slate-900 to your color
className="bg-your-color"
```

### Add custom fields to Event/News/Project

1. Update `src/admin/types.ts`
2. Update API endpoints in `src/app/api/admin/*`
3. Update form in `src/admin/pages/*.tsx`

## Troubleshooting

### Images not uploading

1. Check Firebase Storage rules allow uploads
2. Verify `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` in `.env.local`
3. Ensure service account has Storage admin permissions

### "Collection not found" errors

1. Firestore collections are created automatically on first write
2. Check your Firestore database is initialized
3. Verify project ID matches in Firebase config

### 3-language content not saving

1. Check `LanguageEditor` is passing `LocalizedContent` object with all 3 keys
2. Verify API endpoints handle the `LocalizedContent` type correctly
3. Check browser console for validation errors

## Support & Contributions

For issues or feature requests, check the main project repository or contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**License:** MIT
