"use client";

import { ProfileLayout } from "@/layouts/ProfileLayout";
import { PersonalInfo } from "@/modules/PersonalInfo";
import { useMediaQuery } from "@chakra-ui/react";

export default function Profile() {

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return <ProfileLayout>
    {
      isLargerThan845 && <PersonalInfo />
    }
  </ProfileLayout>;
}
