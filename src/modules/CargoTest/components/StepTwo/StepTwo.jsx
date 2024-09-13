import React from 'react'
import cls from './style.module.scss';
import { Box, Flex } from '@chakra-ui/react';
import { IconAStep, IconBStep, IconCEnterStepTwoIcon, LoadStepIcon } from '@/assets/icons/icons';

const StepTwo = () => {
  return (
    <Flex position={`relative`} width={`100%`} gap={`24px`} >
      <Box className={cls.step}>
        <Flex width={"100%"} gap={"13px"}>
          <IconAStep />
          <Box width={"100%"}>
            <Flex justifyContent={`space-between`} alignItems={`center`}>
              <p className={cls.stepTitle}>Адрес загрузки груза</p>
              <p className={cls.adressBtn}>Выбрать на карте</p>
            </Flex>
            <Flex gap={"24px"} mt={"60px"}>
       
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box className={cls.centerIcon}>
        <IconCEnterStepTwoIcon />
      </Box>
      <Box className={cls.step}>
        <Flex width={"100%"} gap={"13px"}>
          <IconBStep />
          <Box width={"100%"}>
            <Flex justifyContent={`space-between`} alignItems={`center`}>
              <p className={cls.stepTitle}>Адрес доставки груза</p>
              <p className={cls.adressBtn}>Выбрать на карте</p>
            </Flex>
            <Flex gap={"24px"} mt={"10px"}>

            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default StepTwo;
