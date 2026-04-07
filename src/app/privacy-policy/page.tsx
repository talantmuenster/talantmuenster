'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import ExternalLink from '../../components/ui/ExternalLink';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacyPage');

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
            <div className="mt-3">
              <p>{t('contactName')}</p>
              <p>{t('contactAddress1')}</p>
              <p>{t('contactAddress2')}</p>
              <p>{t('contactCountry')}</p>
              <p>{t('contactEmail')}</p>
              <p>{t('contactPhone')}</p>
            </div>
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
              <li>{t('s3i5')}</li>
              <li>{t('s3i6')}</li>
              <li>{t('s3i7')}</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s4Title')}</h2>
            <p className="mb-3">{t('s4t1')}</p>
            <p className="mb-3">{t('s4t2')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s4i1')}</li>
              <li>{t('s4i2')}</li>
              <li>{t('s4i3')}</li>
              <li>{t('s4i4')}</li>
              <li>{t('s4i5')}</li>
            </ul>
            <p className="mt-3">{t('s4legal1')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></p>
            <p>{t('s4legal2')}</p>
            <p className="mt-3">{t('s4t3')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s5Title')}</h2>
            <p className="mb-3">{t('s5t1')}</p>
            <p className="mb-3">{t('s5t2')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s5i1')}</li>
              <li>{t('s5i2')}</li>
              <li>{t('s5i3')}</li>
              <li>{t('s5i4')}</li>
            </ul>
            <p className="mt-3 mb-2">{t('s5legal')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s5li1')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
              <li>{t('s5li2')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
            </ul>
            <p className="mt-3">{t('s5t3')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s6Title')}</h2>
            <p className="mb-3">{t('s6intro')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s6i1')}</li>
              <li>{t('s6i2')}</li>
              <li>{t('s6i3')}</li>
              <li>{t('s6i4')}</li>
            </ul>
            <p className="mt-3">{t('s6t1')}</p>
            <p className="mt-3 mb-2">{t('s6legal')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s6li1')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
              <li>{t('s6li2')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s7Title')}</h2>
            <p className="mb-3">{t('s7t1')}</p>
            <p className="mb-3">{t('s7t2')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s7i1')}</li>
              <li>{t('s7i2')}</li>
              <li>{t('s7i3')}</li>
              <li>{t('s7i4')}</li>
            </ul>
            <p className="mt-3">{t('s7t3')}</p>
            <p className="mt-3 mb-2">{t('s7legal')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s7li1')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
              <li>{t('s7li2')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
            </ul>
            <p className="mt-3">{t('s7t4')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s8Title')}</h2>
            <p className="mb-3">{t('s8intro')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s8i1')}</li>
              <li>{t('s8i2')}</li>
              <li>{t('s8i3')}</li>
              <li>{t('s8i4')}</li>
              <li>{t('s8i5')}</li>
              <li>{t('s8i6')}</li>
              <li>{t('s8i7')}</li>
            </ul>
            <p className="mt-3">{t('s8t1')}</p>
            <p className="mt-3">{t('s8legal')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /> </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s9Title')}</h2>
            <p className="mb-3">{t('s9t1')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s9i1')}</li>
              <li>{t('s9i2')}</li>
              <li>{t('s9i3')}</li>
              <li>{t('s9i4')}</li>
              <li>{t('s9i5')}</li>
              <li>{t('s9i6')}</li>
              <li>{t('s9i7')}</li>
            </ul>
            <p className="mt-3">{t('s9t2')}</p>
            <p className="mt-3 mb-2">{t('s9legal')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s9li1')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
              <li>{t('s9li2')} <ExternalLink href="https://gdpr-text.com/ru/read/article-6/?__cf_chl_tk=OzuiVQZuqDS4Vx86a7UqkFk5PJqSfmqyNeBBB7n75pI-1775596507-1.0.1.1-frl1UMil_u6or0GE7Z3jvenu9cLp_eKEIKPRVO5ljjU"  /></li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s10Title')}</h2>
            <p className="mb-3">{t('s10t1')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s10i1')}</li>
              <li>{t('s10i2')}</li>
              <li>{t('s10i3')}</li>
              <li>{t('s10i4')}</li>
            </ul>
            <p className="mt-3">{t('s10t2')} <ExternalLink href="https://gdpr-text.com/ru/read/article-28/"  /></p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s11Title')}</h2>
            <p>{t('s11t1')}</p>
            <p className="mt-3">{t('s11t2')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s12Title')}</h2>
            <p className="mb-3">{t('s12t1')}</p>
            <p className="mb-3">{t('s12t2')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s12i1')}</li>
              <li>{t('s12i2')}</li>
              <li>{t('s12i3')}</li>
              <li>{t('s12i4')}</li>
              <li>{t('s12i5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s13Title')}</h2>
            <p className="mb-3">{t('s13t1')}</p>
            <p className="mb-3">{t('s13t2')}</p>
            <p className="mb-3">{t('s13t3')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s13ai1')}</li>
              <li>{t('s13ai2')}</li>
              <li>{t('s13ai3')}</li>
              <li>{t('s13ai4')}</li>
            </ul>
            <p className="mt-3 mb-3">{t('s13t4')}</p>
            <ul className="list-disc space-y-3 pl-6">
              <li><strong>{t('s13bi1title')}</strong>{t('s13bi1text')}</li>
              <li><strong>{t('s13bi2title')}</strong>{t('s13bi2text')}</li>
              <li><strong>{t('s13bi3title')}</strong>{t('s13bi3text')}</li>
              <li><strong>{t('s13bi4title')}</strong>{t('s13bi4text')}</li>
            </ul>
            <p className="mt-3 mb-3">{t('s13t5')}</p>
            <p className="mb-3">{t('s13t6')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s13ci1')}</li>
              <li>{t('s13ci2')}</li>
              <li>{t('s13ci3')}</li>
            </ul>
            <p className="mt-3">{t('s13t7')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s14Title')}</h2>
            <p className="mb-3">{t('s14t1')}</p>
            <p>{t('s14t2')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s15Title')}</h2>
            <p className="mb-3">{t('s15intro')}</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>{t('s15i1')}</li>
              <li>{t('s15i2')}</li>
              <li>{t('s15i3')}</li>
              <li>{t('s15i4')}</li>
              <li>{t('s15i5')}</li>
              <li>{t('s15i6')}</li>
              <li>{t('s15i7')}</li>
            </ul>
            <p className="mt-3">{t('s15t1')}</p>
            <p className="mt-2">talantmuenster@gmail.com</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s16Title')}</h2>
            <p>{t('s16t1')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s17Title')}</h2>
            <p>{t('s17t1')}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">{t('s18Title')}</h2>
            <p>{t('s18t1')}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
