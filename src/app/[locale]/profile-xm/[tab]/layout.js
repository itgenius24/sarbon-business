// app/[locale]/profile-xm/[tab]/layout.tsx
import { ProfileLayout } from "@/layouts/ProfileLayout";

export async function generateStaticParams() {
  const locales = ['en', 'ru', 'uz']; // Kerakli locale lar
  const tabs = ['handbook', 'want-buy', 'my-ad', 'personal-data'];

  return locales.flatMap(locale => 
    tabs.map(tab => ({
      locale,
      tab,
    }))
  );
}

export default function Layout({ children, params }) {
  const { locale } = params;

  return (
    <ProfileLayout locale={locale}>
      {children}
    </ProfileLayout>
  );
}
