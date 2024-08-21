import {
  LoadOulineIcon,
  NextCheckIcon,
  SearchIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import CheckBoxComponent from "./CheckBoxComponent";
import { Checkbox } from "@/components/Checkbox";

const SelectCargo = ({ cls }) => {
  return (
    <div className={cls.selectCargo}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        className={cls.selectCargoTop}
      >
        <p className={cls.topTitle}>Выберите груз</p>
        <InputGroup className={cls.inputWrap}>
          <Input placeholder="Поиск" className={cls.input} />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Box className={cls.modalContend}>
        <CheckBoxComponent active={true}>
          <Box className={cls.countryWrap}>
            <Flex gap={3}>
              <p>Новосибирск</p> <NextCheckIcon /> <p>Бухара</p>{" "}
            </Flex>
            <Flex className={cls.subTitle} gap={3}>
              Текстильные изделия
              <Flex gap={1} alignItems={"center"}>

                <StoneIcon /> 22 т.
              </Flex>
              <Flex gap={1} alignItems={"center"}>

                <LoadOulineIcon /> 86m3
              </Flex>
            </Flex>
          </Box>
        </CheckBoxComponent>
        <CheckBoxComponent active={false}>
          <Box className={cls.countryWrap}>
            <Flex gap={3}>
              <p>Новосибирск</p> <NextCheckIcon /> <p>Бухара</p>{" "}
            </Flex>
            <Flex className={cls.subTitle} gap={3}>
              Текстильные изделия
              <Flex gap={1} alignItems={"center"}>

                <StoneIcon /> 22 т.
              </Flex>
              <Flex gap={1} alignItems={"center"}>

                <LoadOulineIcon /> 86m3
              </Flex>
            </Flex>
          </Box>
        </CheckBoxComponent>
      </Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        className={cls.selectCargoBottom}
      >
        <Checkbox>
        Отображать только мои грузы
        </Checkbox>
        <Flex gap={2}>

          <Button
            className={cls.topButton}

            variant="secondaryWhite"
            size="md"
            border="1px solid #D0D5DD"
          >
                      Отменить
          </Button>
          <Button
            className={cls.topButton}
            size="md"
          >
                     Предложить
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default SelectCargo;
