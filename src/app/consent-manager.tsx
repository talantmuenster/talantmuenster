import type { ReactNode } from 'react';
import {
	ConsentManagerDialog,
	ConsentManagerProvider,
	CookieBanner,
} from '@c15t/nextjs';
// For client-only apps (non-SSR), you can use:
// import { ConsentManagerProvider } from '@c15t/nextjs/client';
import { baseTranslations } from '@c15t/translations';
import { ConsentManagerClient } from './consent-manager.client';

const ruTranslations = {
	common: {
		acceptAll: 'Принять все',
		rejectAll: 'Отклонить все',
		customize: 'Настроить',
		save: 'Сохранить настройки',
	},
	cookieBanner: {
		title: 'Мы уважаем вашу конфиденциальность.',
		description:
			'Этот сайт использует файлы cookie для улучшения навигации, анализа трафика и отображения персонализированного контента.',
	},
	consentManagerDialog: {
		title: 'Настройки конфиденциальности',
		description:
			'Настройте параметры конфиденциальности здесь. Вы можете выбрать, какие типы файлов cookie и технологий отслеживания разрешены.',
	},
	consentTypes: {
		necessary: {
			title: 'Необходимые файлы cookie',
			description:
				'Эти файлы cookie необходимы для корректной работы сайта и не могут быть отключены.',
		},
		functionality: {
			title: 'Функциональные',
			description:
				'Эти файлы cookie обеспечивают расширенные возможности и персонализацию сайта.',
		},
		marketing: {
			title: 'Маркетинг',
			description:
				'Эти файлы cookie используются для показа релевантной рекламы и измерения её эффективности.',
		},
		measurement: {
			title: 'Аналитика',
			description:
				'Эти файлы cookie помогают нам понять, как посетители взаимодействуют с сайтом, чтобы улучшить навигацию.',
		},
		experience: {
			title: 'Опыт',
			description:
				'Эти файлы cookie помогают нам улучшить пользовательский опыт и тестировать новые функции.',
		},
	},
	frame: {
		title: 'Примите {category}, чтобы просмотреть этот контент.',
		actionButton: 'Дать согласие на {category}',
	},
	legalLinks: {
		privacyPolicy: 'Политика конфиденциальности',
		cookiePolicy: 'Политика использования файлов cookie',
		termsOfService: 'Условия использования',
	},
};

/**
 * Server-side rendered consent management wrapper for Next.js App Router
 *
 * This component provides SSR-compatible consent management by separating
 * server-side configuration from client-side functionality. The server handles
 * initial setup and configuration, while client-side features (callbacks,
 * scripts) are delegated to the ConsentManagerClient component.
 *
 * @param props - Component properties
 * @param props.children - Child components to render within the consent manager context
 *
 * @returns The consent manager provider with banner, dialog, and client wrapper
 *
 * @remarks
 * This split architecture is necessary because certain options like callbacks
 * and scripts cannot be serialized during server-side rendering. For
 * client-only implementations, use `<ConsentManagerProvider />` from
 * `@c15t/nextjs/client`.
 *
 * @example
 * ```tsx
 * // In your root layout.tsx
 * import { ConsentManager } from './consent-manager';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ConsentManager>
 *           {children}
 *         </ConsentManager>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ConsentManager({ children, locale }: { children: ReactNode; locale: string }) {
	return (
		<ConsentManagerProvider
			options={{
					mode: 'c15t',
					backendURL: '/api/c15t',
					consentCategories: ['necessary', 'marketing'],
					ignoreGeoLocation: true,
					// Forces the SSR pre-fetch to use the site locale instead of Accept-Language header
					overrides: { language: locale },
					// Makes the store cache key locale-specific so the store is recreated per locale
					storageConfig: { storageKey: `c15t-${locale}` },
					translations: {
						defaultLanguage: locale,
						disableAutoLanguageSwitch: true,
						translations: {
							en: baseTranslations.en,
							de: baseTranslations.de,
							ru: ruTranslations,
						},
					},
				}}
		>
			<CookieBanner />
			<ConsentManagerDialog />
			<ConsentManagerClient>{children}</ConsentManagerClient>
		</ConsentManagerProvider>
	);
}
