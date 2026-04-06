'use client';

import { useTranslations } from 'next-intl';

export default function CookiePolicyPage() {
  const t = useTranslations('cookiePage');

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">
          {t('title')}
        </h1>

        <div className="space-y-8 text-base leading-7">
          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s1Title')}</h2>
            <p>{t('s1Text')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s2Title')}</h2>
            <p>{t('s2Text')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s3Title')}</h2>
            <p className="mb-3">{t('s3Intro')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s3i1')}</li>
              <li>{t('s3i2')}</li>
              <li>{t('s3i3')}</li>
              <li>{t('s3i4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s4Title')}</h2>
            <p className="mb-3">{t('s4Intro')}</p>
            <p className="mb-3">{t('s4Intro2')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s4bi1')}</li>
              <li>{t('s4bi2')}</li>
              <li>{t('s4bi3')}</li>
              <li>{t('s4bi4')}</li>
            </ul>
            <p className="mt-3">{t('s4Outro')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s5Title')}</h2>

            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-lg font-medium">{t('s51Title')}</h3>
                <p>{t('s51Text')}</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">{t('s52Title')}</h3>
                <p>{t('s52Text')}</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">{t('s53Title')}</h3>
                <p>{t('s53Text')}</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">{t('s54Title')}</h3>
                <p>{t('s54Text')}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s6Title')}</h2>
            <p className="mb-3">{t('s6Text1')}</p>
            <p>{t('s6Text2')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s7Title')}</h2>
            <p>{t('s7Text')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s8Title')}</h2>
            <p className="mb-3">{t('s8Intro')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s8bi1')}</li>
              <li>{t('s8bi2')}</li>
              <li>{t('s8bi3')}</li>
            </ul>
            <p className="mt-3">{t('s8Outro')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s9Title')}</h2>
            <p>{t('s9Text')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s10Title')}</h2>
            <p>{t('s10Text')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s11Title')}</h2>
            <p className="mb-3">{t('s11Intro')}</p>
            <div className="space-y-1">
              <p>{t('contactName')}</p>
              <p>{t('contactAddress1')}</p>
              <p>{t('contactAddress2')}</p>
              <p>{t('contactCountry')}</p>
              <p>{t('contactEmail')}</p>
              <p>{t('contactPhone')}</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}