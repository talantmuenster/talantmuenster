"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { DOCUMENTS } from "@/data/document";

export function DocumentsSection() {
  const t = useTranslations("document");

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-12">
      {DOCUMENTS.map((section) => (
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
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-700">{item.description}</p>
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
