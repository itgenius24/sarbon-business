"use client";

import { CreateCarDis } from "@/modules/CreateCarDis";
import { Box } from "@chakra-ui/react";

export default function AddCarPage({ params }) {
  const { locale } = params;
  return (
    <Box>
      <CreateCarDis locale={locale} />
    </Box>
  );
}
