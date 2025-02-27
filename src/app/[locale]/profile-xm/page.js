"use client";


import { ProfileLayout } from "@/layouts/ProfileLayout-new";
import { PersonalInfo } from "@/modules/PersonalInfoNew";

import { useMediaQuery } from "@chakra-ui/react";

export default function Profile() {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return <ProfileLayout>
    {
      isLargerThan845 && <PersonalInfo />
    }
  </ProfileLayout>;
}
