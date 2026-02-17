import type { Project } from "@/type/type";

export const projects: Project[] = [
  {
    slug: { ru: "youth-support", en: "youth-support", de: "youth-support" },
    title: { ru: "Заголовок проекта", en: "Project Title", de: "Projekttitel" },
    subtitle: {
      ru: "Описание новости в коротком формате, чтобы немного ввести в курс дела.",
      en: "Short description to introduce the project",
      de: "Kurzbeschreibung zum Einführen des Projekts"
    },
    cover: "/projects/project-1.png",
    content: [
      {
        text:
          "Реализация проекта, представленная планирование обеспечивает широкому кругу участие...",
      },
      {
        title: "Заголовок 2",
        text:
          "Реализация проекта, представленная планирование обеспечивает широкому кругу участие...",
      },
      {
        title: "Заголовок 2",
        text:
          "Реализация проекта, представленная планирование обеспечивает широкому кругу участие...",
      },
    ],
  },
];
