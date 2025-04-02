import { Box, Button, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import cls from "./style.module.scss";
import {
  CloseIconStatus,
  NotesIconOutline,
  QuestionIcon,
  RejectIconOutline,
  SuccessIconOutline,
} from "@/assets/icons/icons";
import TextariaInput from "../TextariaInput/TextariaInput";
import TooltipComponents from "@/components/TooltipComponents/TooltipConponents";
import FileUploaderComponent from "@/components/FileUploaderComponent";
import StatusComponent from "../StatusComponent/StatusComponent";
import FileConponent from "../FileConponent/FileConponent";

const Notes = () => {
  const [statusActive, setStatusActive] = useState({});
  const [files, setFiles] = useState([]);

  const statusArr = [
    {
      id: 1,
      name: `Отлично`,
      tooltip: `Надежный партнер, с которым приятно работать.`,
      icon: <SuccessIconOutline />,
    },
    {
      id: 2,
      name: `Замечание`,
      tooltip: `Есть нюансы, которые стоит учитывать.`,
      icon: <NotesIconOutline />,
    },
    {
      id: 3,
      name: `Плохо`,
      tooltip: `Были проблемы при сотрудничестве.`,

      icon: <RejectIconOutline />,
    },
  ];

  const deleteFile = (file) => {
    setFiles((prevData) => prevData.filter((item) => item.id !== file?.id));
  };
  const statusFn = (status) => {
    setStatusActive(status);
  };

  const setFileFn = (file) => {
    setFiles((prev) => [
      ...prev,
      {
        id: prev?.length + 1,
        type:
          file?.file_name_download.includes(`png`) ||
          file?.file_name_download.includes(`jpg`)
            ? `img`
            : `file`,
        name: file?.file_name_download,
        link: process.env.NEXT_PUBLIC_MEDIA_URL + file?.link,
      },
    ]);
  };
  return (
    <Box className={cls.box}>
      <Flex gap={`8px`} alignItems={`center`}>
        <Heading fontSize="20px">Оценка надёжности</Heading>
        <TooltipComponents
          label={`Оцените надежность и добавьте заметку о перевозчике.`}
        >
          <QuestionIcon />
        </TooltipComponents>
      </Flex>
      <TextariaInput deleteFile={deleteFile} files={files} />
      <Flex alignItems={`center`} justifyContent={`space-between`} mt={`11px`}>
        <Flex gap={`20px`} alignItems={`center`}>
          {statusArr.map((item) => (
            <TooltipComponents  key={item.id} label={item.tooltip}>
            <Flex
              cursor={`pointer`}
   
              onClick={() => statusFn(item)}
              className={
                statusActive.id === item.id
                  ? cls.statusActiveWrap
                  : cls.statusWrap
              }
            >
              {item.icon}
            
                <span className={cls.statusName}>{item.name}</span>
            
            </Flex>
            </TooltipComponents>
          ))}
        </Flex>
        <Flex gap={`20px`}>
          <FileUploaderComponent setFileFn={setFileFn} />
          <Button>Добавить</Button>
        </Flex>
      </Flex>
      <Box mt={`30px`}>
        <Flex className={cls.resItem}>
          <Box className={cls.flex1}>
            <StatusComponent status={`reject`} date={new Date()} />
          </Box>
          <Flex justifyContent={`space-between`} className={cls.flex2}>
            <Box>
              <p className={cls.text}>
              wlekdwendkwedn edlwendwe dklwejd wkendkw edk we dwjed wke dwke djwejd wed wjed wed we d wed wjed wedwedjwedj we dwejdwjedwlekdwendkwedn edlwendwe dklwejd wkendkw edk we dwjed wke dwke djwejd wed wjed wed we d wed wjed wedwedjwedj we dwejdwjedwlekdwendkwedn edlwendwe dklwejd wkendkw edk we dwjed wke dwke djwejd wed wjed wed we d wed wjed wedwedjwedj we dwejdwjed
              </p>
              <Flex mt={`16px`} gap={`18px`} width={`100%`}>
                {files.map((item) => (
                  <FileConponent
                    deleteFile={deleteFile}
                    cls={cls}
                    key={item.name}
                    item={item}
                  />
                ))}
              </Flex>
            </Box>
            <Box marginLeft={`20px`} cursor={`pointer`}>
              <CloseIconStatus />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Notes;
