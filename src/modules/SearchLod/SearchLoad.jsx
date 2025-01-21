"use client";

import { Container } from "@/components/Container";
import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { useSearchLoad } from "./useSearchLoad";
import { FilterLoad } from "./component/FilterLoad/FilterLoad";
import { TableComponent } from "./component/Tablecompoent/TableComponent";
import { useState } from "react";

export const SearchLoadModule = () => {
  const { t, setValue, control, register, watch,formState } = useSearchLoad();
  const [checkbox1,setCheckbox1] = useState(false)
  const [checkbox2,setCheckbox2] = useState(false)
  const [checkbox3,setCheckbox3] = useState(false)

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  return (
    <>
      <Container my="40px">
        <Heading
          size={isLargerThan845 ? "md" : "sm"}
          mb={isLargerThan845 ? "24px" : "12px"}
          color={`var(--primary-text)`}
        >
          {t("Поиск грузов")}
        </Heading>
        {
          isLargerThan845 && <Box
          padding={"20px 30px"}
          background={"white"}
          borderRadius={"12px"}
          mt={"22px"}
        >
          <FilterLoad
            setValue={setValue}
            control={control}
            register={register}
            watch={watch}
          />
        </Box>
        }
        <Box overflowX={ isLargerThan845 ? `none`:`scroll`}>
        <TableComponent isLargerThan845={isLargerThan845} watch={watch} formState={formState} />

        </Box>
      </Container>
    </>
  );
};
