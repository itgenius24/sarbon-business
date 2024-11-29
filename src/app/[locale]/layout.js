import "./globals.scss";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { MainLayout } from "@/layouts/MainLayout";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
});

export const metadata = {
  title: "Furgo",
  description:
    "питак, logistics, logistika, furgo, фурго, перевозка, перевозки, автоперевозки, юк ташиш, фурада юк ташиш, ставка, транзит, реф, firgo, погрузка, груз, аванс, затаможка, растаможка, догруз, глонасс, запрос, ref, adr, адр, грузовые перевозки",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Furgo",
    description:
      "Добро пожаловать в Furgo, вашего надежного партнера в сфере безупречных логистических решений. Мы специализируемся на транспортировке, складировании и управлении цепочкой поставок с акцентом на эффективности и надежности. Наша высококвалифицированная команда применяет передовые технологии для оптимизации операций, гарантируя своевременную и безопасную доставку вашего груза.",
    url: "https://furgo.uz/",
    siteName: "Furgo",
    images: [
      {
        url: "https://furgo.uz/_next/static/media/logo.56cc9102.svg", // Must be an absolute URL
        width: 800,
        height: 800,
      },
      {
        url: "https://furgo.uz/_next/static/media/logo.56cc9102.svg", // Must be an absolute URL
        width: 1600,
        height: 1600,
      },
    ],
  },
  type: "website",
};

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)} className={`${inter.variable} html layout`}>
  
      <body className={inter.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
      <Script
        async={true}
        src="https://www.googletagmanager.com/gtag/js?id=G-B2SWXD4SK3"
      />
      <Script id="gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B2SWXD4SK3');
          `}
      </Script>
      <Script type="text/javascript" id="mcjs">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
          ym(97265981, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
          });
          `}
      </Script>
      <Script
        id="yandex-maps-script"
        src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&suggest_apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY}&load=package.full&lang=en_US`}
      />
      {/* <noscript noscript><div><img src="https://mc.yandex.ru/watch/97265981" style="position:absolute; left:-9999px;" alt="" /></div></noscript> */}
    </html>
  );
}
