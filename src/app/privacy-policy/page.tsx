'use client';

import React, { useState } from "react";

type Lang = 'ru' | 'en' | 'de';

const policies: Record<Lang, string> = {
  ru: `# Политика конфиденциальности

Дата вступления в силу: 01.03.2026

## 1. Общие положения
Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта talantmuenster.ru (далее — «Сайт»), а также права пользователей в соответствии с Федеральным законом РФ №152-ФЗ «О персональных данных» и Общим регламентом по защите данных (GDPR).

## 2. Какие данные мы собираем
Мы собираем только те данные, которые вы добровольно предоставляете через формы на сайте:
- Адрес электронной почты (для подписки на новости)
- Имя, e-mail, сообщение (при отправке через форму обратной связи)
- Техническая информация: IP-адрес, cookies, данные о браузере и устройстве (автоматически, для аналитики и безопасности)

## 3. Цели обработки данных
Ваши персональные данные используются исключительно для:
- Отправки новостных и информационных рассылок (с вашего согласия)
- Ответа на ваши обращения через форму обратной связи
- Улучшения работы сайта и пользовательского опыта (аналитика)
- Соблюдения требований законодательства

## 4. Правовые основания обработки
- Ваше согласие (ст. 6 ФЗ-152, ст. 6 GDPR)
- Выполнение договора (например, предоставление услуги подписки)
- Законные интересы (например, обеспечение безопасности сайта)

## 5. Хранение и защита данных
- Данные хранятся на защищённых серверах, доступ к которым имеют только уполномоченные лица.
- Мы принимаем все разумные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.

## 6. Передача данных третьим лицам
- Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законом или необходимых для выполнения сервиса (например, сервисы рассылки, хостинг-провайдеры).
- Все такие сервисы соответствуют требованиям GDPR и ФЗ-152.

## 7. Cookies и аналитика
- Сайт может использовать cookies и сторонние сервисы аналитики (например, Google Analytics) для сбора обезличенных данных о посещениях.
- Вы можете отключить cookies в настройках вашего браузера.

## 8. Права пользователя
Вы имеете право:
- Запросить доступ к своим персональным данным
- Требовать их исправления, удаления или ограничения обработки
- Отозвать согласие на обработку данных в любой момент
- Подать жалобу в надзорный орган (Роскомнадзор или соответствующий орган ЕС)

Для реализации своих прав вы можете связаться с нами по адресу: [ваш e-mail или форма обратной связи на сайте].

## 9. Согласие
Отправляя свои данные через формы на сайте, вы подтверждаете согласие с данной Политикой и разрешаете обработку ваших персональных данных.

## 10. Изменения политики
Мы можем время от времени обновлять настоящую Политику. Актуальная версия всегда доступна на этой странице.
`,
  en: `# Privacy Policy

Effective date: 01.03.2026

## 1. General Provisions
This Privacy Policy describes how personal data of users of talantmuenster.ru (the "Site") is processed and protected, and outlines your rights in accordance with Russian Federal Law No. 152-FZ "On Personal Data" and the General Data Protection Regulation (GDPR).

## 2. What Data We Collect
We only collect data you voluntarily provide via forms on the site:
- Email address (for newsletter subscription)
- Name, e-mail, message (when using the contact form)
- Technical information: IP address, cookies, browser and device data (automatically, for analytics and security)

## 3. Purposes of Data Processing
Your personal data is used exclusively for:
- Sending newsletters and informational mailings (with your consent)
- Responding to your inquiries via the contact form
- Improving the website and user experience (analytics)
- Compliance with legal requirements

## 4. Legal Basis for Processing
- Your consent (Art. 6 of 152-FZ, Art. 6 GDPR)
- Performance of a contract (e.g., providing subscription services)
- Legitimate interests (e.g., ensuring website security)

## 5. Data Storage and Protection
- Data is stored on secure servers accessible only to authorized personnel.
- We take all reasonable measures to protect your data from unauthorized access, alteration, disclosure, or destruction.

## 6. Data Transfer to Third Parties
- We do not transfer your personal data to third parties, except as required by law or necessary for service provision (e.g., mailing services, hosting providers).
- All such services comply with GDPR and 152-FZ requirements.

## 7. Cookies and Analytics
- The site may use cookies and third-party analytics services (e.g., Google Analytics) to collect anonymized visit data.
- You can disable cookies in your browser settings.

## 8. User Rights
You have the right to:
- Request access to your personal data
- Request correction, deletion, or restriction of processing
- Withdraw consent to data processing at any time
- File a complaint with a supervisory authority (Roskomnadzor or the relevant EU authority)

To exercise your rights, contact us at: [your e-mail or contact form on the site].

## 9. Consent
By submitting your data via forms on the site, you confirm your consent to this Policy and authorize the processing of your personal data.

## 10. Policy Changes
We may update this Policy from time to time. The current version is always available on this page.
`,
  de: `# Datenschutzrichtlinie

Gültig ab: 01.03.2026

## 1. Allgemeine Bestimmungen
Diese Datenschutzrichtlinie beschreibt, wie personenbezogene Daten der Nutzer von talantmuenster.ru (im Folgenden "Website") verarbeitet und geschützt werden und erläutert Ihre Rechte gemäß dem russischen Bundesgesetz Nr. 152-FZ "Über personenbezogene Daten" sowie der Datenschutz-Grundverordnung (DSGVO).

## 2. Welche Daten wir erheben
Wir erheben nur die Daten, die Sie freiwillig über Formulare auf der Website bereitstellen:
- E-Mail-Adresse (für den Newsletter)
- Name, E-Mail, Nachricht (bei Nutzung des Kontaktformulars)
- Technische Informationen: IP-Adresse, Cookies, Browser- und Gerätedaten (automatisch, für Analyse und Sicherheit)

## 3. Zwecke der Datenverarbeitung
Ihre personenbezogenen Daten werden ausschließlich verwendet für:
- Versand von Newslettern und Informationsmaterial (mit Ihrer Einwilligung)
- Beantwortung Ihrer Anfragen über das Kontaktformular
- Verbesserung der Website und Nutzererfahrung (Analyse)
- Einhaltung gesetzlicher Anforderungen

## 4. Rechtsgrundlagen der Verarbeitung
- Ihre Einwilligung (Art. 6 des 152-FZ, Art. 6 DSGVO)
- Vertragserfüllung (z.B. Bereitstellung von Abonnementdiensten)
- Berechtigte Interessen (z.B. Gewährleistung der Sicherheit der Website)

## 5. Speicherung und Schutz der Daten
- Die Daten werden auf sicheren Servern gespeichert, auf die nur autorisiertes Personal Zugriff hat.
- Wir ergreifen alle angemessenen Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen.

## 6. Weitergabe von Daten an Dritte
- Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, außer wenn dies gesetzlich vorgeschrieben ist oder zur Erbringung von Dienstleistungen erforderlich ist (z.B. Newsletter-Dienste, Hosting-Anbieter).
- Alle diese Dienste entsprechen den Anforderungen der DSGVO und des 152-FZ.

## 7. Cookies und Analyse
- Die Website kann Cookies und Dienste von Drittanbietern (z.B. Google Analytics) verwenden, um anonymisierte Besucherdaten zu erfassen.
- Sie können Cookies in den Einstellungen Ihres Browsers deaktivieren.

## 8. Rechte der Nutzer
Sie haben das Recht:
- Zugang zu Ihren personenbezogenen Daten zu verlangen
- Berichtigung, Löschung oder Einschränkung der Verarbeitung zu verlangen
- Ihre Einwilligung zur Datenverarbeitung jederzeit zu widerrufen
- Eine Beschwerde bei der Aufsichtsbehörde (Roskomnadzor oder der zuständigen EU-Behörde) einzureichen

Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter: [Ihre E-Mail-Adresse oder Kontaktformular auf der Website].

## 9. Einwilligung
Durch das Absenden Ihrer Daten über Formulare auf der Website bestätigen Sie Ihr Einverständnis mit dieser Richtlinie und erlauben die Verarbeitung Ihrer personenbezogenen Daten.

## 10. Änderungen der Richtlinie
Wir können diese Richtlinie von Zeit zu Zeit aktualisieren. Die aktuelle Version ist immer auf dieser Seite verfügbar.
`,
};

const langs: { code: Lang; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Lang>("ru");
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Политика конфиденциальности / Privacy Policy / Datenschutz</h1>
      <div className="flex gap-2 justify-center mb-6">
        {langs.map(l => (
          <button
            key={l.code}
            className={`px-4 py-2 rounded border ${lang === l.code ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
            onClick={() => setLang(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: policies[lang].replace(/\n/g, '<br/>' ) }} />
      </div>
    </div>
  );
}
