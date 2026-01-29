import { DocSection } from "@/type/type";

export const DOCUMENTS: DocSection[] = [
  {
    type: "certificate",
    items: [
      {
        title: "Сертификат",
        description:
          "Пояснительный текст о том, что это за сертификат, желательно короткий",
        href: "/documents/certificate-1",
      },
      {
        title: "Сертификат",
        description:
          "Пояснительный текст о том, что это за сертификат, желательно короткий",
        href: "/documents/certificate-2",
        mode: "download",
      },
    ],
  },
  {
    type: "publication",
    items: [
      {
        title: "Публикация",
        description:
          "Пояснительный текст о том, что это за публикация, желательно короткий",
        href: "/documents/publication-1",
      },
      {
        title: "Публикация",
        description:
          "Пояснительный текст о том, что это за публикация, желательно короткий",
        href: "/documents/publication-2",
      },
    ],
  },
];
