"use client";

import { ProfileLayout } from "@/layouts/ProfileLayout";

export default function Layout({ handbook, personalInfo, wantBuy, myAd, params }) {
  const { tab, locale } = params;

  const components = {
    handbook,
    "want-buy": wantBuy,
    "my-ad": myAd,
    "personal-data": personalInfo,
  };

  return <ProfileLayout locale={locale} >
    {components[tab] ?? personalInfo}
  </ProfileLayout>;

}
