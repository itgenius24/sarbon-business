import { Main } from "@/modules/Main";

export default function Home({ params }) {
  const { locale } = params;
  return <Main locale={locale} />;
}
