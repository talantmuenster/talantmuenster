import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";

import Header from "@/components/header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { MenuProvider } from "@/utils/MenuProvider";
import IntlProvider from "./intl-provider";

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
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IntlProvider locale={params.locale}>
          <MenuProvider>
            <Header />
            <MobileMenu />
            {children}
            <Footer />
          </MenuProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
