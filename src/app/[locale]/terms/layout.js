import { MainLayout } from "@/layouts/MainLayout";

export default function TermsLayout({ children, params: { locale } }) {
  return <MainLayout locale={locale}>{children}</MainLayout>;
}
