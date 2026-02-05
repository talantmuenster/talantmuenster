import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { messagesWithDefault } from "@/lib/i18n";

export default async function IntlProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const messages = await getMessages();
  const merged = await messagesWithDefault(messages, locale);

  return (
    <NextIntlClientProvider locale={locale} messages={merged}>
      {children}
    </NextIntlClientProvider>
  );
}
