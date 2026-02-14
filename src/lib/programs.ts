export type ProgramModule = {
  title: string;
  description?: string;
};

export type ProgramSection = {
  title: string;
  modules: ProgramModule[];
};

export type Locale = 'ru' | 'en' | 'de';

export type LocalizedContent = {
  ru: string;
  en: string;
  de: string;
};

export type ProgramStatic = {
  slug: string;
  title: LocalizedContent;
  description: LocalizedContent;
  content: LocalizedContent;
  sections?: ProgramSection[];
  imageUrl?: string;
  published?: boolean;
  // сюда можно добавлять другие блоки/компоненты позже
};

export type ProgramHeroData = {
  slug: string;
  title: LocalizedContent;
  subtitle: LocalizedContent;
  cover: string;
  heroSlides?: string[];
  courseTabs?: ProgramCourseTab[];
  teachers?: ProgramTeacher[];
  schedule?: ProgramSchedule;
  published?: boolean;
  // сюда можно добавлять другие блоки/компоненты позже
};

export type ProgramCourseTab = {
  title: LocalizedContent;
  description: LocalizedContent;
  address?: string;
  duration?: string;
  price?: string;
  ctaLabel?: LocalizedContent;
};

export type ProgramTeacher = {
  name: LocalizedContent;
  role?: LocalizedContent;
  bio?: LocalizedContent;
  avatar: string;
  tags?: string[];
};

export type ProgramScheduleItem = {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  time: string;
  title: LocalizedContent;
  teacher?: LocalizedContent;
};

export type ProgramSchedule = {
  timeSlots?: string[];
  items: ProgramScheduleItem[];
};
