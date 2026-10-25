'use client';

import { useEffect, useState } from 'react';

export type PublicOrganizationSettings = {
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
};

const FALLBACK_SETTINGS: PublicOrganizationSettings = {
  address: 'Heinrich-Ebel-Str. 48, 48161 Münster',
  phone: '+49 176 64217368',
  email: 'talantmuenster@gmail.com',
};

/** Loads the contact details managed in the organization settings section. */
export function useOrganizationSettings() {
  const [settings, setSettings] = useState<PublicOrganizationSettings>(FALLBACK_SETTINGS);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/organization-settings', { signal: controller.signal, cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PublicOrganizationSettings | null) => {
        if (data) {
          setSettings((current) => ({ ...current, ...data }));
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        // The fallback keeps the public site usable if the settings service is unavailable.
      });

    return () => controller.abort();
  }, []);

  return settings;
}
