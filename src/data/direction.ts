export type Direction = {
  id: string;
  label: string;
  href?: string;
};

export const DIRECTIONS: Direction[] = [
  { id: 'music', label: 'Музыка', href: '/programs/music' },
  { id: 'sport', label: 'Спорт', href: '/programs/sport' },
  { id: 'dance', label: 'Танцы', href: '/programs/dance' },
  { id: 'languages', label: 'Языки', href: '/programs/languages' },
  { id: 'it', label: 'Информатика', href: '/programs/it' },
  { id: 'math', label: 'Математика', href: '/programs/math' },
  { id: 'art', label: 'Искусство', href: '/programs/art' },
  { id: 'cooking', label: 'Кулинария', href: '/programs/cooking' },
  { id: 'theatre', label: 'Театр', href: '/programs/theatre' },
  { id: 'tutoring', label: 'Репетиторство', href: '/programs/tutoring' },
  { id: 'kids', label: 'Детям до 3 лет', href: '/programs/kids' },
];
