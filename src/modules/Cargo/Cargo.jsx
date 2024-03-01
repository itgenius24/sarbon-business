"use client";

import { DeleteIcon, PencilIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, Text } from "@chakra-ui/react";
import { CargoDetail } from "./components/CargoDetail";
import { CargoSetup } from "./components/CargoSetup";
import { Stages } from "./components/Stages";
import { AddCargoProvider } from "./providers";
import { useAddCargoProps } from "./useAddCargoProps";
import Link from "next/link";
import { LoadBtn } from "@/components/LoadBtn";
import { statuses } from "@/utils/constants";
import { TopContent } from "./components/TopContent";

export const Cargo = ({ id, status }) => {

  const addCargoProps = useAddCargoProps({ id, status });
  const isEditing = !!id;

  function getTopContent () {
    if(status === "in_moderation") {
      return <Box display="flex" justifyContent="space-between" alignItems="center" mb="18px">
        <Heading size="md">{addCargoProps.address1} - {addCargoProps.address2} <Text as="span" color="brand.500">1235.56 km</Text></Heading>
        <Box Box display="flex" columnGap="8px">
          <LoadBtn icon={<PencilIcon />} onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}>
          Изменить
          </LoadBtn>
          {/* <LoadBtn onClick={() => {}} icon={<TruckIcon />}>
          Поиск машин
        </LoadBtn> */}
          <LoadBtn icon={<DeleteIcon color="#F04438" />} type="delete" onClick={() => addCargoProps.handleDelete()}>
          Удалить
          </LoadBtn>
        </Box>
      </Box>;
    } else if(status === "new"){
      return <TopContent
        address1={addCargoProps.address1}
        address2={addCargoProps.address2}
        userName={addCargoProps.userName}
        proposedAmount={addCargoProps.proposedAmount}
        rating={addCargoProps.rating}
        transportModel={addCargoProps.transportModel}
        phoneNumber={addCargoProps.phoneNumber}
      />;
    }

    return <></>;

  }

  return <AddCargoProvider value={addCargoProps}>
    <Box pt="48px" pb="128px">
      <Container height="100%">
        {
          isEditing && <Breadcrumb
            mb="16px"
            separator={
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#98A2B3"/>
              </svg>
            }
          >
            <BreadcrumbItem color="#98A2B3">
              <Link href="/my-loads">Мои грузы</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink color="#344054">{statuses[status]}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        <Box as="article" height="100%" display="flex" alignItems="flex-start" columnGap="32px">
          <Box flexGrow={1} maxW={id ? "100%" : "900px"} as="form">
            {
              isEditing
              ? getTopContent()
              : <Box display="flex" justifyContent="space-between" alignItems="center" mb="32px">
                <Heading size="md">Добавить груз</Heading>
                <Box display="flex" columnGap="12px">
                  {/* <Button leftIcon={<PlusIcon />} size="sm" >Заполнить из шаблона</Button> */}
                  <Button leftIcon={<DeleteIcon />} onClick={() => addCargoProps.reset({})} variant="secondaryWhite" size="sm" >Очистить форму</Button>
                </Box>
              </Box>
            }
            <CargoDetail />
            <CargoSetup />
          </Box>
          {
            !isEditing && <Stages />
          }
        </Box>
        {
          !isEditing && <Box mt="32px">
            <Box display="flex" columnGap="12px" justifyContent="flex-end" maxWidth="900px">
              {/* <Button size="sm" maxWidth="223px" variant="secondaryWhite">Сохранить как шаблон</Button> */}
              <Button size="sm" maxWidth="223px" onClick={addCargoProps.handleSubmit(addCargoProps.onSubmit)}>Опубликовать груз</Button>
            </Box>
          </Box>
        }
        {
          status === "new" && <Box display="flex" width="570px" columnGap="12px" mt="32px">
            <Button variant="outlineError" onClick={() => addCargoProps.handleCancel()}>Отказать</Button>
            <Button onClick={() => addCargoProps.handleAccept()}>Принять</Button>
          </Box>
        }
      </Container>
    </Box>
  </AddCargoProvider>;
};
