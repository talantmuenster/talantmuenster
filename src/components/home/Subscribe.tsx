"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function Subscribe() {
  const t = useTranslations('home.subscribe');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !isEmailValid(email)) return;

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) throw new Error('Subscribe failed');

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-2 lg:py-[120px]">
      <div className="mx-auto max-w-7xl lg:px-12">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[520px_1fr]
            rounded-2xl
            bg-background-orange
            overflow-hidden
          "
        >
          {/* IMAGE */}
          <div className="hidden lg:block relative h-[240px] sm:h-[320px] lg:h-auto">
            <Image
              src="/home/subscribe-image.png"
              alt="Subscribe"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CONTENT */}
          <div
            className="
              px-6 py-8
              sm:px-10 sm:py-12
              lg:px-16 lg:py-20
              flex flex-col
              justify-center
              gap-6
              text-center
              lg:text-left
            "
          >
            <h2 className="text-xl sm:text-2xl lg:text-heading-lg font-bold text-primary">
            {t('title')}{" "}
              <span className="text-accent">{t('subtitle')}</span>
            </h2>

            <p className="text-gray-600 max-w-md mx-auto lg:mx-0">
              {t('description')}
            </p>

            <form
              className="
                  flex flex-col
                  gap-4
                  w-full
                  max-w-md
                  mx-auto
                  lg:mx-0
              "
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder={t('mail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  h-[48px]
                 flex-1
                  rounded-xl
                  px-4 py-4 
                  border border-gray-200
                "
              />
              <div className="items-center w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="sm"
                  className=""
                  disabled={isSubmitting || !isEmailValid(email)}
                >
                  {t('subscribe')}
                </Button>
              </div>
            </form>

            {status === 'success' && (
              <div className="text-sm text-green-700">{t('successMessage')}</div>
            )}
            {status === 'error' && (
              <div className="text-sm text-red-700">{t('errorMessage')}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
