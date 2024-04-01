import "./globals.scss";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { MainLayout } from "@/layouts/MainLayout";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap"
});

export const metadata = {
  title: "Logistics",
  description: "X Logistics",
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
    </html>
  );
}
