import { Phone, Mail, MapPin } from "lucide-react";
import { Subscribe } from "@/components/home/Subscribe";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LINKS } from "@/lib/links";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../../components/ui/Button";

export default function ContactPage() {
    const t = useTranslations("contactsus");
  return (
    <section className="pt-20 lg:pt-20   bg-white">
      <div className="max-w-7xl mx-auto lg:px-4">
        {/* Breadcrumbs */}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT */}
          {/* LEFT */}
          <div className="px-4">
            <Breadcrumbs
              items={[
                { label: t("breadcrumbs.home"), href: LINKS.home },
                { label: t("breadcrumbs.contact") },
              ]}
            />
            <h1 className="text-4xl lg:text-5xl pt-4 font-bold mb-6">
              <span>{t("title")}</span>
              <span className="text-primary-light"> {t("title1")}</span>
            </h1>

            <p className="text-gray-700 max-w-xl mb-10 leading-relaxed">
              {t("description")}
            </p>

            {/* Info box */}
            <div className="grid sm:grid-cols-2 gap-6 bg-white lg:border lg:border-secondary rounded-3xl p-8 lg:shadow-sm">
              <Info icon={<Phone className="w-7 h-7" />} title={t("phone")}>
                +49 176 64217368{" "}
              </Info>

              <Info
                icon={<Mail className="w-7 h-7" />}
                title={t("email")}
              >
                talantmuenster@gmail.com
              </Info>

              <Info
                icon={<MapPin className="w-7 h-7" />}
                title={t("officeAddress")}
              >
                Heinrich-Ebel-Str. 48
                <br />
                48161 Münster
              </Info>

              <Info
                icon={<MapPin className="w-7 h-7" />}
                title={t("coursesAndEvents")}
                class
              >
                Im La Vie, Dieckmannstr. 127
                <br />
                48161 Münster
              </Info>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-[#EEF2FF] rounded-3xl p-8">
            <form className="space-y-4">
              <Input label={t("form.name")} placeholder={t("form.name")} />
              <Input label={t("phone")} placeholder={t("phone")} />
              <Input
                label={t("form.email")}
                placeholder={t("form.email")}
              />

              <div>
                <label className="text-sm font-medium">{t("form.message")}</label>
                <textarea
                  className="mt-1 w-full rounded-xl border px-4 py-3 resize-none"
                  rows={4}
                  placeholder={t("form.message")}
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mt-1 shrink-0 rounded border-gray-300"
                />

                <span className="leading-relaxed">
                  {t("form.consentText")}{" "}
                  <Link
                    href={LINKS.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary hover:text-primary-dark transition"
                  >
                    {t("form.privacyPolicy")}
                  </Link>
                </span>
              </label>

              <Button type="submit" >
                {t("form.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Subscribe />
    </section>
  );
}

/* Components */
function Info({ icon, title, children }: any) {
  return (
    <div className="flex gap-4 items-start">
      {/* Иконка теперь выровнена по верхней линии текста */}
      <div className="text-primary-light shrink-0 mt-1">{icon}</div>

      <div>
        {/* Заголовок: меньше размер (text-sm/base) и серый цвет */}
        <div className="text-lgg text-gray-700 mb-0.5 leading-tight">
          {title}
        </div>
        {/* Контент: жирный (font-bold/semibold) и темный цвет */}
        <div className="text-lg font-medium text-primary leading-snug">
          {children}
        </div>
      </div>
    </div>
  );
} 

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="mt-1 w-full rounded-xl border px-4 py-3" />
    </div>
  );
}
