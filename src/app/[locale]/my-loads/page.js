"use client";

import { MyLoadsMain } from "@/modules/MyLoadsMain";
import { Box } from "@chakra-ui/react";

export default function MyLoads({params}) {
  const { locale } = params;
  return <Box>
    <MyLoadsMain locale={locale} />
  </Box>;
}
