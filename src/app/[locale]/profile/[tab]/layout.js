"use client";

import { ProfileLayout } from "@/layouts/ProfileLayout";

export default function Layout({ handbook, personalInfo, wantBuy, myAd, params }) {
  const tab = params.tab;

  const components = {
    handbook,
    "want-buy": wantBuy,
    "my-ad": myAd,
    "personal-data": personalInfo,
  };

  return <ProfileLayout>
    {components[tab] ?? personalInfo}
  </ProfileLayout>;

}
