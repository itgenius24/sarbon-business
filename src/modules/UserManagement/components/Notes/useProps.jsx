import {
  NotesIconOutline,
  RejectIconOutline,
  SuccessIconOutline,
} from "@/assets/icons/icons";
import { useCreateAddressMutation, useDeleteReliabilities, useGetNewPredData } from "@/services/api";
import authStore from "@/store/auth.store";
import { extractUrlInfo } from "@/utils/extractUrlInfo";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const useProps = () => {
  const [statusActive, setStatusActive] = useState({});
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState();
  const params = useSearchParams();
  const guid = params.get(`guid`);
  const user_type = params.get(`type`);
  const user_id = params.get(`user_id`);
  const [errors, setError] = useState({});

  const statusArr = [
    {
      id: 1,
      name: `Отлично`,
      value: `great`,
      tooltip: `Надежный партнер, с которым приятно работать.`,
      icon: <SuccessIconOutline />,
    },
    {
      id: 2,
      name: `Замечание`,
      value: `note`,
      tooltip: `Есть нюансы, которые стоит учитывать.`,
      icon: <NotesIconOutline />,
    },
    {
      id: 3,
      name: `Плохо`,
      tooltip: `Были проблемы при сотрудничестве.`,
      value: `bad`,
      icon: <RejectIconOutline />,
    },
  ];
  const { data: commentData,refetch } = useGetNewPredData({
    data: {
      data: {
        object_data: {
          firm_id: user_type === `driver` ? undefined : guid,
          driver_id: user_type === `driver` ? user_id : undefined,
          type: `reliabilitiy`,
        },
      },
    },
    
  });

  const { mutate: createAddress,isLoading:createLoading } = useCreateAddressMutation({
    onSuccess: (res) => {
      setStatusActive({});
      setFiles([]);
      setComment(``);
      refetch()
    },
  });

  const {mutate:reliabilities} = useDeleteReliabilities({
    onSuccess: (res) => {
        refetch()
      },
  })



  const deleteFile = (file) => {
    setFiles((prevData) => prevData.filter((item) => item.id !== file?.id));
  };
  const statusFn = (statusVal) => {
    setStatusActive(statusVal);
    setError((prev) => ({ comment: prev.comment, status: false }));
  };

  const setCommentFn = (e) => {
    setComment(e);
    if (e.length > 0) {
      setError((prev) => ({ status: prev.status, comment: false }));
    }
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

  const deleteReliabilities = (id) => {
    reliabilities({id:id})
  }

  const submitComment = () => {
    if (!statusActive.value) {
      setError({ status: true, comment: false });
    }
    if (!comment) {
      setError({ status: false, comment: true });
    }
    if (!comment && !statusActive.value) {
      setError({ status: true, comment: true });
    } else {
      createAddress({
        data: {
          object_data: {
            links: files.map((item) => item?.link),
            status: statusActive.value,
            comment: comment,
            dispatcher_id: authStore.userData.guid,
            firm_id: user_type === `driver` ? undefined: guid,
            driver_id: user_type === `driver` ? user_id : undefined,
            type: `reliabilitiy`,
          },
        },
      });
    }
  };

  return {
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
    commentData:commentData?.response,
    createLoading,
    deleteReliabilities
  };
};

export default useProps;
