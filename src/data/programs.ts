
import type { ProgramHeroData } from '@/lib/programs';

export const programs: ProgramHeroData[] = [
  {
    slug: 'art',
    title: {
      ru: 'Искусство',
      en: 'Art',
      de: 'Kunst',
    },
    subtitle: {
      ru: 'Описание направления в коротком формате, чтобы немного ввести в курс дела, что там произошло.',
      en: 'Short description to introduce the program and its focus.',
      de: 'Kurze Beschreibung, um das Programm vorzustellen.',
    },
    cover: '/home/programs/art.png',
    heroSlides: ['/program/slider/1.png', '/home/programs/art.png', '/home/programs/dance.png'],
    courseTabs: [
      {
        title: { ru: 'Акварельная живопись', en: 'Watercolor', de: 'Aquarell' },
        description: {
          ru: 'Описание направления в длинном формате, чтобы немного ввести в курс дела, что там произошло. Описание направления в длинном формате, чтобы немного ввести в курс дела, что там произошло.',
          en: 'Longer description of the course to introduce the content and goals.',
          de: 'Längere Beschreibung des Kurses mit Zielen und Inhalten.',
        },
        address: 'Heinrich-Ebel-Str. 48 48161 Münster',
        duration: '2 часа',
        price: '20€',
        ctaLabel: { ru: 'Записаться на курс →', en: 'Enroll →', de: 'Anmelden →' },
      },
      {
        title: { ru: 'Масляная живопись', en: 'Oil Painting', de: 'Ölmalerei' },
        description: {
          ru: 'Описание направления в длинном формате, чтобы немного ввести в курс дела, что там произошло.',
          en: 'Course description for oil painting.',
          de: 'Kursbeschreibung für Ölmalerei.',
        },
        address: 'Heinrich-Ebel-Str. 48 48161 Münster',
        duration: '2 часа',
        price: '20€',
      },
      {
        title: { ru: 'Акриловая живопись', en: 'Acrylic', de: 'Acryl' },
        description: {
          ru: 'Описание направления в длинном формате, чтобы немного ввести в курс дела, что там произошло.',
          en: 'Course description for acrylic painting.',
          de: 'Kursbeschreibung für Acrylmalerei.',
        },
        address: 'Heinrich-Ebel-Str. 48 48161 Münster',
        duration: '2 часа',
        price: '20€',
      },
    ],
    teachers: [
      {
        name: { ru: 'Алексей Синельников', en: 'Alexey Sinelnikov', de: 'Alexej Sinelnikov' },
        role: { ru: 'Учитель живописи', en: 'Painting teacher', de: 'Mallehrer' },
        bio: {
          ru: 'Преподаватель акварельной живописи, выпускник художественного университета в Германии. В работе сочетает академическую школу и современный подход, помогая ученикам раскрыть чувство цвета и формы в акварели.',
          en: 'Watercolor teacher, graduate of an art university in Germany. Combines academic school with a modern approach, helping students develop a sense of color and form in watercolor.',
          de: 'Aquarelllehrer, Absolvent einer Kunstuniversität in Deutschland. Verbindet akademische Schule mit modernem Ansatz und hilft, Farb- und Formgefühl zu entwickeln.',
        },
        avatar: '/team/teacher-1.jpg',
        tags: [
          { ru: 'Акварель', en: 'Watercolor', de: 'Aquarell' },
          { ru: 'Масло', en: 'Oil', de: 'Öl' },
          { ru: 'Академический рисунок', en: 'Academic drawing', de: 'Akademisches Zeichnen' },
        ],
      },
    ],
    schedule: {
      items: [
        {
          day: 'tue',
          time: '13:00',
          title: { ru: 'Акварель 16+', en: 'Watercolor 16+', de: 'Aquarell 16+' },
          teacher: { ru: 'Альбина Синельникова', en: 'Albina Sinelnikova', de: 'Albina Sinelnikova' },
        },
        {
          day: 'thu',
          time: '13:00',
          title: { ru: 'Акварель 16+', en: 'Watercolor 16+', de: 'Aquarell 16+' },
          teacher: { ru: 'Альбина Синельникова', en: 'Albina Sinelnikova', de: 'Albina Sinelnikova' },
        },
        {
          day: 'mon',
          time: '14:00',
          title: { ru: 'Акварель 16+', en: 'Watercolor 16+', de: 'Aquarell 16+' },
          teacher: { ru: 'Альбина Синельникова', en: 'Albina Sinelnikova', de: 'Albina Sinelnikova' },
        },
        {
          day: 'wed',
          time: '07:30',
          title: { ru: 'Акварель 16+', en: 'Watercolor 16+', de: 'Aquarell 16+' },
          teacher: { ru: 'Альбина Синельникова', en: 'Albina Sinelnikova', de: 'Albina Sinelnikova' },
        },
        {
          day: 'sun',
          time: '07:30',
          title: { ru: 'Акварель 16+', en: 'Watercolor 16+', de: 'Aquarell 16+' },
          teacher: { ru: 'Альбина Синельникова', en: 'Albina Sinelnikova', de: 'Albina Sinelnikova' },
        },
      ],
    },
    published: true,
  },
  {
    slug: 'music',
    title: {
      ru: 'Музыка',
      en: 'Music',
      de: 'Musik',
    },
    subtitle: {
      ru: 'Короткое описание направления с упором на практику и творчество.',
      en: 'Short description focused on practice and creativity.',
      de: 'Kurze Beschreibung mit Fokus auf Praxis und Kreativität.',
    },
    cover: '/home/programs/music.png',
    heroSlides: ['/program/slider/1.png', '/home/programs/music.png', '/home/programs/it.png'],
    courseTabs: [
      {
        title: { ru: 'Фортепиано', en: 'Piano', de: 'Klavier' },
        description: {
          ru: 'Курс игры на фортепиано для начинающих с упором на практику.',
          en: 'Beginner piano course with hands-on practice.',
          de: 'Klavierkurs für Anfänger mit Praxisfokus.',
        },
        address: 'Heinrich-Ebel-Str. 48 48161 Münster',
        duration: '1.5 часа',
        price: '25€',
      },
      {
        title: { ru: 'Вокал', en: 'Vocal', de: 'Gesang' },
        description: {
          ru: 'Основы вокала и развитие слуха.',
          en: 'Vocal basics and ear training.',
          de: 'Gesang und Gehörbildung.',
        },
        address: 'Heinrich-Ebel-Str. 48 48161 Münster',
        duration: '1.5 часа',
        price: '25€',
      },
    ],
    teachers: [
      {
        name: { ru: 'Иван Иванов', en: 'Ivan Ivanov', de: 'Ivan Ivanov' },
        role: { ru: 'Вокал и фортепиано', en: 'Vocal & Piano', de: 'Gesang & Klavier' },
        bio: {
          ru: 'Преподаватель с упором на практику и развитие слуха. Помогает ученикам раскрыть голос и освоить базовую технику.',
          en: 'Instructor focused on practice and ear training. Helps students develop their voice and master basic technique.',
          de: 'Lehrer mit Fokus auf Praxis und Gehörbildung. Hilft, die Stimme zu entwickeln und die Basistechnik zu beherrschen.',
        },
        avatar: '/team/teacher-2.jpg',
        tags: [
          { ru: 'Вокал', en: 'Vocal', de: 'Gesang' },
          { ru: 'Фортепиано', en: 'Piano', de: 'Klavier' },
          { ru: 'Сольфеджио', en: 'Ear training', de: 'Gehörbildung' },
        ],
      },
      {
        name: { ru: 'Мария Келлер', en: 'Maria Keller', de: 'Maria Keller' },
        role: { ru: 'Вокал и фортепиано', en: 'Vocal & Piano', de: 'Gesang & Klavier' },
        bio: {
          ru: 'Преподаватель с упором на практику и развитие слуха. Помогает ученикам раскрыть голос и освоить базовую технику.',
          en: 'Instructor focused on practice and ear training. Helps students develop their voice and master basic technique.',
          de: 'Lehrerin mit Fokus auf Praxis und Gehörbildung. Hilft, die Stimme zu entwickeln und die Basistechnik zu beherrschen.',
        },
        avatar: '/team/teacher-2.jpg',
        tags: [
          { ru: 'Вокал', en: 'Vocal', de: 'Gesang' },
          { ru: 'Фортепиано', en: 'Piano', de: 'Klavier' },
          { ru: 'Сольфеджио', en: 'Ear training', de: 'Gehörbildung' },
        ],
      },
    ],
    published: true,
  },
];
