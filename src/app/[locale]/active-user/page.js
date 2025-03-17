import ActiveUserPage from "@/modules/ActiveUserPage/ActiveUserPage";

export default function ActiveUser({ params }){
    const { locale } = params;
    return <ActiveUserPage locale={locale} />
}