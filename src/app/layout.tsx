import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";

import RootLayoutWrapper from "@/app/RootLayoutWrapper";
import { MenuProvider } from "@/utils/MenuProvider";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { messagesWithDefault } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talant e.V",
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();      // ← из cookie
  const messages = await getMessages();  // ← из getRequestConfig
  const mergedMessages = await messagesWithDefault(messages, locale);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={mergedMessages}>
          <MenuProvider>
            <RootLayoutWrapper>{children}</RootLayoutWrapper>
          </MenuProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
