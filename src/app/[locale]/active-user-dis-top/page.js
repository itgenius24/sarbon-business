import ActiveUserPageDisTop from "@/modules/ActiveUserPageDisTop/ActiveUserPageDisTop";

export default function ActiveUser({ params }){
  const { locale } = params;
  return <ActiveUserPageDisTop locale={locale} />
}
