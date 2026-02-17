export type CalendarEvent = {
  id: string;
  title?: LocalizedContent;
  description?: LocalizedContent;
  date: string;
  startTime: string;
  endTime: string;
  registrationUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type LocalizedContent = {
  ru: string;
  en: string;
  de: string;
};
// type/type.ts

export type CardVariant = "news" | "project";

export type ContentCardProps = {
  variant: "news" | "project";
  image: string;
  title: string;
  description: string;
  date?: string;
  href?: string;
  featured?: boolean;
};

export type ProjectContentBlock = {
  title?: string;
  text: string;
};

export type Project = {
  id?: string;
  slug: LocalizedContent;
  title: LocalizedContent;
  subtitle: LocalizedContent;
  cover: string;
  content: ProjectContentBlock[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Post = {
  id?: string;
  title: LocalizedContent;
  content: LocalizedContent;
  excerpt: LocalizedContent;
  featuredImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminUser = {
  uid: string;
  email: string;
  role: 'admin' | 'editor';
  displayName?: string;
};
export type NewsContentBlock = {
  title?: string;
  text: string;
};

export type News = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  href: string;
  cover: string;
  content: NewsContentBlock[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type DocItem = {
  title: LocalizedContent;
  description: LocalizedContent;
  href: string;
  mode?: "view" | "download";
};

export type DocSection = {
  type: "certificate" | "publication";
  items: DocItem[];
};

export type DocumentLinkProps = {
  href: string;
  mode?: "view" | "download"; // ← default = view
};

export type ContentType = 'events' | 'news' | 'posts';

export type Locale = 'ru' | 'en' | 'de';
