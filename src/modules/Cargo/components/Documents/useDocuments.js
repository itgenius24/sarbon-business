
import { useTranslation } from "@/app/i18n/client";
import { fileUpload } from '@/services/fileUpload';

export const useDocuments = ({ getEmptyFileName=()=>{}, useGetLang=()=>{},handleUploadDocument=()=>{},getValues=()=>{} }) => {
  const fileKey = getEmptyFileName();

  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    const link = process.env.NEXT_PUBLIC_MEDIA_URL + result?.link;
    handleUploadDocument(link, fileKey);
  };

  const data = getValues() || {};
  const documents = [
    { key: "file_1", value: data.file_1 },
    { key: "file_2", value: data.file_2 },
    { key: "file_3", value: data.file_3 },
    { key: "file_4", value: data.file_4 },
    { key: "file_5", value: data.file_5 }
  ].filter(el => !!el.value);

  return {
    documents,
    handleImageUpload,
    fileKey,
    t,
  };
};
