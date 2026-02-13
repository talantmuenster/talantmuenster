"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { DOCUMENTS } from "@/data/document";
import type { DocSection } from "@/type/type";

export function DocumentsSection() {
  const t = useTranslations("document");
  const locale = useLocale();
  const [sections, setSections] = useState<DocSection[]>(DOCUMENTS);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch('/api/documents');
        if (!res.ok) return;
        const data = await res.json();

        const grouped: DocSection[] = [
          { type: 'certificate', items: [] },
          { type: 'publication', items: [] },
        ];

        (data || []).forEach((doc: any) => {
          const target = grouped.find((g) => g.type === doc.type);
          if (!target) return;
          target.items.push({
            title: doc.title,
            description: doc.description,
            href: doc.href,
            mode: doc.mode || 'view',
          });
        });

        setSections(grouped);
      } catch (err) {
        // fallback to static DOCUMENTS
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-12">
      {sections.map((section) => (
        <div key={section.type} className="space-y-6">
          {/* Заголовок */}
          <h2 className="text-xl font-semibold text-center">
            {t(`hero.${section.type}`)}
          </h2>

          {/* Пусто */}
          {section.items.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 py-8 text-center text-sm text-gray-700">
              {t("hero.empty")}
            </div>
          )}

          {/* Элементы */}
          {section.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4
              rounded-2xl border border-primary/30 px-6 py-4"
            >
              <div>
                <p className="font-medium">{item.title?.[locale as keyof typeof item.title] || item.title?.ru}</p>
                <p className="text-sm text-gray-700">{item.description?.[locale as keyof typeof item.description] || item.description?.ru}</p>
              </div>

              <Button size="sm" variant="text" withArrow>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...(item.mode === "download" ? { download: true } : {})}
                >
                  {item.mode === "download"
                    ? t("hero.download")
                    : t("hero.view")}{" "}
                </a>
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
