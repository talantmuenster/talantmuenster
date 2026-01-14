export const locales = ['ru', 'en', 'de'] as const;
export const defaultLocale = 'ru' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  de: 'Deutsch',
};

export const localeFlags: Record<Locale, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
  de: '🇩🇪',
};