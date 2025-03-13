"use client";

import ProfileDispatcher from "@/modules/ProfileDispatcher/ProfileDispatcher";

export default function ProfileDispatcherPage({params}) {
  const { locale } = params;
  return <ProfileDispatcher locale={locale} />;
}
