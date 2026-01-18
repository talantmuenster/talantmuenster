export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  registrationUrl?: string;
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
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  content: ProjectContentBlock[];
};
export type NewsContentBlock = {
  title?: string;
  text: string;
};

export type News = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  href: string;
  cover: string;
  content: NewsContentBlock[];
};

export type DocItem = {
  title: string;
  description: string;
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
