import { MainLayout } from "@/layouts/MainLayout";
import { dir } from "i18next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { languages } from "../i18n/settings";
import "./globals.scss";
import { Providers } from "./providers";


const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sarbon.me'),
  title: "Sarbon",
  description:
    "питак, logistics, logistika, sarbon, фурго, перевозка, перевозки, автоперевозки, юк ташиш, фурада юк ташиш, ставка, транзит, реф, firgo, погрузка, груз, аванс, затаможка, растаможка, догруз, глонасс, запрос, ref, adr, адр, грузовые перевозки",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sarbon",
    startupImage: [
      "/apple-touch-icon.png",
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Sarbon",
    description:
      "Добро пожаловать в Sarbon, вашего надежного партнера в сфере безупречных логистических решений. Мы специализируемся на транспортировке, складировании и управлении цепочкой поставок с акцентом на эффективности и надежности. Наша высококвалифицированная команда применяет передовые технологии для оптимизации операций, гарантируя своевременную и безопасную доставку вашего груза.",
    url: "https://sarbon.me/",
    siteName: "Sarbon",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 800,
        alt: "Sarbon Logo"
      },
      {
        url: "/favicon.ico",
        width: 1600,
        height: 1600,
        alt: "Sarbon Logo"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarbon",
    description: "Добро пожаловать в Sarbon, вашего надежного партнера в сфере безупречных логистических решений.",
    images: ["/favicon.ico"],
  },
  type: "website",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#26BD49" },
    { media: "(prefers-color-scheme: dark)", color: "#26BD49" },
  ],
};

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)} className={`${inter.variable} html layout`}>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Sarbon" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sarbon" />
        <meta name="description" content="Comprehensive logistics platform for cargo transportation, vehicle tracking, and supply chain management" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#26BD49" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#26BD49" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon.png" />

        {/* Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Splash Screens */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Apple Splash Screen Images */}
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />

        {/* Additional PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-title" content="Sarbon" />

        {/* Windows Tiles */}
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <meta name="msapplication-TileColor" content="#26BD49" />
        <meta name="msapplication-navbutton-color" content="#26BD49" />

        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#26BD49" />

        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sarbon" />
      </head>
      <body style={{ backgroundColor:`#f6f7f8` }} className={inter.className}>
        <Providers>
          <MainLayout locale={locale}>{children}</MainLayout>
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
