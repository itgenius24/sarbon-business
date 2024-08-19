import { SearchIcon } from '@/assets/icons/icons';
import { Box, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';

const SelectCargo = ({cls}) => {
  return (
    <div className={cls.selectCargo}>
        <Flex justifyContent={`space-between`} alignItems={`center`} className={cls.selectCargoTop}>
             <p className={cls.topTitle}>
             Выберите груз
             </p>
             <InputGroup className={cls.inputWrap}>
                <Input placeholder='Поиск' className={cls.input} />
                <InputRightElement>
                    <SearchIcon />
                </InputRightElement>
             </InputGroup>
        </Flex>
    </div>
  );
};

export default SelectCargo;