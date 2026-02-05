// Admin Panel Type Definitions

export type Locale = 'ru' | 'en' | 'de';

export type LocalizedContent = {
  ru: string;
  en: string;
  de: string;
};

// Events (Мероприятия)
export type Event = {
  id?: string;
  title: LocalizedContent;
  description: LocalizedContent;
  date: string;
  startTime: string;
  endTime: string;
  location?: LocalizedContent;
  registrationUrl?: string;
  imageUrl?: string;
  published: boolean;
  registrationCount?: number;
  createdAt: string;
  updatedAt: string;
};

// News (Новости)
export type News = {
  id?: string;
  title: LocalizedContent;
  content: LocalizedContent;
  excerpt: LocalizedContent;
  imageUrl: string;
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

// Projects (Проекты)
export type Project = {
  id?: string;
  title: LocalizedContent;
  description: LocalizedContent;
  content: LocalizedContent;
  imageUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

// Organization Settings (Реквизиты организации)
export type OrganizationSettings = {
  id?: string;
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
  updatedAt: string;
};

// Admin User
export type AdminUser = {
  uid: string;
  email: string;
  role: 'admin' | 'editor';
  displayName?: string;
  createdAt: string;
};

// API Response Types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Form State
export type FormState = {
  isLoading: boolean;
  error: string | null;
  success: string | null;
};
