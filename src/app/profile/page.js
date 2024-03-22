"use client";

import { ProfileLayout } from "@/layouts/ProfileLayout";
import { PersonalInfo } from "@/modules/PersonalInfo";

export default function Profile() {

  return <ProfileLayout>
    <PersonalInfo />
  </ProfileLayout>;
}
