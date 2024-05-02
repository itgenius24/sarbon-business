import "./globals.scss";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { MainLayout } from "@/layouts/MainLayout";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap"
});

export const metadata = {
  title: "Furgo",
  description: "питак, pitak, tent, тент, фурго, перевозка, перевозки, автоперевозки, юк ташиш, фурада юк ташиш, ставка, транзит, реф, рефрижератор, погрузка, груз, аванс, затаможка, растаможка, догруз, глонасс, запрос, ref, adr, адр, грузовые перевозки",
  icons: { icon: "/favicon.ico" }
};

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)} className="html layout">
      <body className={inter.className}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&suggest_apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY}&load=package.full&lang=en_US`}
      />
    </html>
  );
}
