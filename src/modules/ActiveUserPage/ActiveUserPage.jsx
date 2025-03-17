"use client";
import { Container } from "@/components/Container";
import { Dropdown } from "@/components/Dropdown";
import { Box, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { useProps } from "./useProps";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import cls from './style.module.scss';


const ActiveUserPage = ({ locale }) => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  const { control, errors, register, setError, setValue, watch, t,columns } =
    useProps();

  return (
    <Box >
      <Container my="40px">
        <Flex
          width={"100%"}
          alignItems={`center`}
          justifyContent={"space-between"}
          mb={isLargerThan845 ? "24px" : "12px"}
        >
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            color={`rgba(33, 31, 38, 1)`}
          >
            Журнал активности
          </Heading>
          <Flex  gap={`16px`} alignItems={`center`}>
            <Box width={`252px`}>
              <Dropdown
                control={control}
                required
                register={register}
                watch={watch}
                name="role"
                options={[{ label: `driver`, value: `driver` }]}
                errors={errors}
                placeholder={t("Все роли")}
                setValue={setValue}
              />
            </Box>
            <Box width={`252px`}>
              <Dropdown
                control={control}
                required
                register={register}
                watch={watch}
                name="user"
                options={[{ label: `driver`, value: `driver` }]}
                errors={errors}
                placeholder={t("Пользователь")}
                setValue={setValue}
              />
            </Box>
            <Box width={`252px`}>
       
            </Box>
          </Flex>
        </Flex>
        <Box   mt={`25px`}  > 
           <SarbonTable isSticky variant="table" columns={columns} data={[1,2,3]} />
        </Box>
      </Container>
    </Box>
  );
};

export default ActiveUserPage;
