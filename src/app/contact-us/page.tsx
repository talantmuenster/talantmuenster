"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import { Subscribe } from "@/components/home/Subscribe";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LINKS } from "@/lib/links";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../../components/ui/Button";
import { useState } from "react";

export default function ContactUsPage() {
  const t = useTranslations("contactsus");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess(false);
      try {
        const res = await fetch("/api/send-mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setSuccess(true);
          setForm({ name: "", phone: "", email: "", message: "" });
        } else {
          setError("Ошибка отправки. Попробуйте позже.");
        }
      } catch {
        setError("Ошибка отправки. Попробуйте позже.");
      }
      setLoading(false);
    };
    return (
      <section className="pt-20 lg:pt-20 bg-white">
        <div className="max-w-7xl mx-auto lg:px-4">
          {/* Breadcrumbs */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                <Info icon={<Phone className="w-7 h-7" />} title={t("phone")}>+49 176 64217368</Info>
                <Info icon={<Mail className="w-7 h-7" />} title={t("email")}>talantmuenster@gmail.com</Info>
                <Info icon={<MapPin className="w-7 h-7" />} title={t("officeAddress")}>Heinrich-Ebel-Str. 48<br />48161 Münster</Info>
                <Info icon={<MapPin className="w-7 h-7" />} title={t("coursesAndEvents")}>Im La Vie, Dieckmannstr. 127<br />48161 Münster</Info>
              </div>
            </div>
            {/* RIGHT – FORM */}
            <div className="bg-[#EEF2FF] rounded-3xl p-8">
              {success ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-4">Спасибо за заявку!</h3>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input label={t("form.name")} name="name" value={form.name} onChange={handleChange} placeholder={t("form.name")} required />
                  <Input label={t("phone")} name="phone" value={form.phone} onChange={handleChange} placeholder={t("phone")} />
                  <Input label={t("form.email")} name="email" value={form.email} onChange={handleChange} placeholder={t("form.email")} required type="email" />
                  <div>
                    <label className="text-sm font-medium">{t("form.message")}</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className="mt-1 w-full rounded-xl border px-4 py-3 resize-none" rows={4} placeholder={t("form.message")} required />
                  </div>
                  <label className="flex items-start gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="mt-1 shrink-0 rounded border-gray-300" required />
                    <span className="leading-relaxed">
                      {t("form.consentText")}{" "}
                      <Link href={LINKS.privacy} target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary-dark transition">
                        {t("form.privacyPolicy")}
                      </Link>
                    </span>
                  </label>
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <Button type="submit" disabled={loading}>
                    {loading ? "Отправка..." : t("form.submit")}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
        <Subscribe />
      </section>
    );
}

function Info({ icon, title, children }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-primary-light shrink-0 mt-1">{icon}</div>
      <div>
        <div className="text-lgg text-gray-700 mb-0.5 leading-tight">{title}</div>
        <div className="text-lg font-medium text-primary leading-snug">{children}</div>
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
function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="mt-1 w-full rounded-xl border px-4 py-3" />
    </div>
  );
}