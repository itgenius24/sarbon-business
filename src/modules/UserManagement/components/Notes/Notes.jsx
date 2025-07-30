import { Box, Button, Flex, Heading, Tooltip } from "@chakra-ui/react";
import cls from "./style.module.scss";
import { CloseIconStatus, QuestionIcon } from "@/assets/icons/icons";
import TextariaInput from "../TextariaInput/TextariaInput";
import TooltipComponents from "@/components/TooltipComponents/TooltipConponents";
import FileUploaderComponent from "@/components/FileUploaderComponent";

import useProps from "./useProps";
import StatusComponent from "../StatusComponent/StatusComponent";
import FileConponent from "../FileConponent/FileConponent";
import { extractUrlInfo } from "@/utils/extractUrlInfo";

const Notes = () => {
  const {
    statusActive,
    setStatusActive,
    files,
    setFiles,
    deleteFile,
    statusFn,
    setFileFn,
    submitComment,
    statusArr,
    setCommentFn,
    comment,
    errors,
    commentData,
    createLoading,
    deleteReliabilities
  } = useProps();

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
      <TextariaInput
        error={errors?.comment}
        deleteFile={deleteFile}
        files={files}
        setCommentFn={setCommentFn}
        comment={comment}
      />
      <Flex alignItems={`center`} justifyContent={`space-between`} mt={`11px`}>
        <Box>
          <Flex gap={`20px`} alignItems={`center`}>
            {statusArr.map((item) => (
              <TooltipComponents key={item.id} label={item.tooltip}>
                <Flex
                  cursor={`pointer`}
                  onClick={() => statusFn(item)}
                  className={
                    statusActive.value === item.value
                      ? cls.statusActiveWrap
                      : errors?.status
                      ? cls.statusErrorWrap
                      : cls.statusWrap
                  }
                >
                  {item.icon}

                  <span className={cls.statusName}>{item.name}</span>
                </Flex>
              </TooltipComponents>
            ))}
          </Flex>
          <Box mt={`15px`}>
            {errors.comment && (
              <p className={cls.errorLabel}>
                * Поле текста не может быть пустым
              </p>
            )}
            {errors.status && (
              <p className={cls.errorLabel}>
                * Оценка надёжности не выбрана. Выберите: Отлично, Замечание или
                Плохо
              </p>
            )}
          </Box>
        </Box>
        <Flex gap={`20px`}>
          {
            files.length < 5 && <FileUploaderComponent setFileFn={setFileFn} />
          }
          <Button isLoading={createLoading} onClick={() => submitComment()}>Добавить</Button>
        </Flex>
      </Flex>
      <Flex flexDirection={`column`} rowGap={`15px`} mt={`30px`}>
        {commentData?.map((item) => (
          <Flex key={item.guid} className={cls.resItem}>
            <Box className={cls.flex1}>
              <StatusComponent
                status={item?.status?.[0]}
                date={new Date(item?.create_time)}
              />
            </Box>
            <Flex justifyContent={`space-between`} className={cls.flex2}>
              <Box>
                <p className={cls.text}>{item?.comment} </p>
                <Flex flexWrap={`wrap`} mt={`16px`} gap={`18px`} width={`100%`}>
                  {
                    item?.documents?.length > 0 && item?.documents?.map((file) => (
                      <FileConponent
                        cls={cls}
                        key={file?.guid}
                        item={extractUrlInfo(file?.document)}
                      />
                    ))
                  }

                </Flex>
              </Box>
              <Box onClick={() => deleteReliabilities(item.guid)} marginLeft={`20px`} cursor={`pointer`}>
                <CloseIconStatus />
              </Box>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Notes;
