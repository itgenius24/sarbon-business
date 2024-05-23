
import { useTranslation } from "@/app/i18n/client";
import { fileUpload } from '@/services/fileUpload';

export const useDocuments = ({ getEmptyFileName=()=>{}, useGetLang=()=>{},handleUploadDocument=()=>{},getValues=()=>{} }) => {
  const canEdit = getEmptyFileName();

  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");

  const handleImageUpload = async (e) => {
    const result = await fileUpload(e);
    const link = process.env.NEXT_PUBLIC_MEDIA_URL + result?.link;
    handleUploadDocument(link, canEdit);
  };

  const data = getValues() || {};
  const documents = [data.file_1, data.file_2, data.file_3, data.file_4, data.file_5].filter(el => !!el);

  return {
    documents,
    handleImageUpload,
    canEdit,
    t,
  };
};
