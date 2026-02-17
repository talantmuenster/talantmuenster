
import { SectionTitle } from '@/components/ui/Sectiontitle';
import { FAQItem, FQA } from './fqa';
import { useTranslations } from 'next-intl';
export default function FqaSection() {
   const t = useTranslations('about.faq');

  const FAQ_DATA: FAQItem[] = [1, 2, 3, 4].map((id) => ({
    question: t(`items.${id}.title`),
    answer: t(`items.${id}.answer`),
  }));
  return (
    <section className="relative bg-background-blue py-20 lg:overflow-hidden">
      {/* ARCS */}
      <div
        className="pointer-events-none absolute -top-[320px] -left-[320px]
        w-[550px] h-[550px] rounded-full border-[50px] z-0 hidden lg:block"
        style={{ borderColor: '#A4B5FF', opacity: 0.10 }}
      />
      <div
        className="pointer-events-none absolute -top-[280px] -left-[280px]
        w-[400px] h-[400px] rounded-full border-[50px] z-0 hidden lg:block"
        style={{ borderColor: '#A4B5FF', opacity: 0.1 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <SectionTitle
          primary={t("title")}
          secondary={t("title1")}
          align="center"
        />

        <FQA items={FAQ_DATA} />
      </div>
    </section>
  );
}
