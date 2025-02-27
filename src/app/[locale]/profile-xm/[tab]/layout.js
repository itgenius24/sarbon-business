"use client";

import { ProfileLayout } from "@/layouts/ProfileLayout";
import { useMediaQuery } from "@chakra-ui/react";

export default function Layout({ handbook, personalInfo, wantBuy, myAd, params }) {
  const { tab, locale } = params;

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

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
