import { Phone, Mail, MapPin } from "lucide-react";
import { Subscribe } from "@/components/home/Subscribe";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LINKS } from "@/lib/links";
import Link from "next/link";

export default function ContactPage() {
  return (
    <section className=" pt-20 lg:pt-0   bg-white">
      <div className="max-w-7xl mx-auto lg:px-4">
        {/* Breadcrumbs */}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT */}
          {/* LEFT */}
          <div className="px-4">
            <Breadcrumbs
              items={[
                { label: "Главная", href: LINKS.home },
                { label: "Контакты" },
              ]}
            />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span>Свяжитесь с нами любым</span>
              <span className="text-primary-light"> удобным способом</span>
            </h1>

            <p className="text-gray-700 max-w-xl mb-10 leading-relaxed">
              Мы здесь, чтобы помочь! Независимо от того, есть ли у вас вопрос о
              наших услугах, нужна консультация или вы хотите оставить отзыв,
              наша команда готова вам помочь.
            </p>

            {/* Info box */}
            <div className="grid sm:grid-cols-2 gap-6 bg-white lg:border lg:border-secondary rounded-3xl p-8 lg:shadow-sm">
              <Info icon={<Phone className="w-7 h-7" />} title="Номер телефона">
                +49 176 64217368{" "}
              </Info>

              <Info
                icon={<Mail className="w-7 h-7" />}
                title="Электронная почта"
              >
                talantmuenster@gmail.com
              </Info>

              <Info
                icon={<MapPin className="w-7 h-7" />}
                title="Офис и почтовый адрес"
              >
                Heinrich-Ebel-Str. 48
                <br />
                48161 Münster
              </Info>

              <Info
                icon={<MapPin className="w-7 h-7" />}
                title="Курсы и мероприятия"
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
              <Input label="Имя" placeholder="Имя" />
              <Input label="Номер телефона" placeholder="Номер телефона" />
              <Input
                label="Электронная почта"
                placeholder="Электронная почта"
              />

              <div>
                <label className="text-sm font-medium">Сообщение</label>
                <textarea
                  className="mt-1 w-full rounded-xl border px-4 py-3 resize-none"
                  rows={4}
                  placeholder="Сообщение"
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mt-1 shrink-0 rounded border-gray-300"
                />

                <span className="leading-relaxed">
                  Я согласен(на) на обработку моих данных в соответствии с{" "}
                  <Link
                    href={LINKS.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary hover:text-primary-dark transition"
                  >
                    Политикой конфиденциальности
                  </Link>
                </span>
              </label>

              <button className="bg-primary text-white px-6 py-3 rounded-full font-medium">
                Отправить
              </button>
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
    <div className="flex gap-3 items-center">
      <div className="text-primary-light shrink-0">{icon}</div>

      <div>
        <div className="text-lg font-regular text-gray-700 mb-1">{title}</div>
        <div className="text-lg text-primary">{children}</div>
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
