import { DocSection } from "@/type/type";

export const DOCUMENTS: DocSection[] = [
  {
    type: "certificate",
    items: [
      {
        title: {
          ru: "Сертификат",
          en: "Certificate",
          de: "Zertifikat",
        },
        description: {
          ru: "Пояснительный текст о том, что это за сертификат, желательно короткий",
          en: "Short explanation about this certificate",
          de: "Kurze Erklärung zu diesem Zertifikat",
        },
        href: "/documents/certificate-1",
      },
      {
        title: {
          ru: "Сертификат",
          en: "Certificate",
          de: "Zertifikat",
        },
        description: {
          ru: "Пояснительный текст о том, что это за сертификат, желательно короткий",
          en: "Short explanation about this certificate",
          de: "Kurze Erklärung zu diesem Zertifikat",
        },
        href: "/documents/certificate-2",
        mode: "download",
      },
    ],
  },
  {
    type: "publication",
    items: [
      {
        title: {
          ru: "Публикация",
          en: "Publication",
          de: "Publikation",
        },
        description: {
          ru: "Пояснительный текст о том, что это за публикация, желательно короткий",
          en: "Short explanation about this publication",
          de: "Kurze Erklärung zu dieser Publikation",
        },
        href: "/documents/publication-1",
      },
      {
        title: {
          ru: "Публикация",
          en: "Publication",
          de: "Publikation",
        },
        description: {
          ru: "Пояснительный текст о том, что это за публикация, желательно короткий",
          en: "Short explanation about this publication",
          de: "Kurze Erklärung zu dieser Publikation",
        },
        href: "/documents/publication-2",
      },
    ],
  },
];
