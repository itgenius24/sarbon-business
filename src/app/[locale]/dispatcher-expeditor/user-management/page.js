import UserManagement from "@/modules/UserManagement/UserManagement";

export default function UserManagementPage({ params }) {
  const { locale } = params;
  return <UserManagement locale={locale} />;
}
