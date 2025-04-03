import ExpeditorPage from "@/modules/ExpeditorPage/ExpeditorPage";

export default function UserManagementPage({ params }) {
  const { locale } = params;
  return <ExpeditorPage locale={locale} />;
}
