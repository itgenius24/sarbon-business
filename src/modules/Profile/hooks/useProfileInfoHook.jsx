import { useGetUserInfo } from "@/services/api";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";

export const useProfileInfoHook = () => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({});
  const { id } = useParams();

  const { data, isLoading } = useGetUserInfo(
    "39fdc90c-cb01-47e2-b1ac-bdd90cd01e41",
    {
      enabled: !!id,
      select: (res) => {
        if(!res.response) return undefined;
        const { balance, your_id, full_name, email } = res?.response || {};
        const { name, fName } = full_name?.split(" ") || [];
        // setValue("name", name);
        // setValue("fName", fName);
        // setValue("email", email);
        return { balance, your_id, full_name, email };
      },
    }
  );



  console.log("watch", watch());
  const getProfileFormProps = (otherProps) => {
    return {
      watch,
      errors,
      control,
      register,
      setValue,
      ...otherProps,
    };
  };
  return { getProfileFormProps };
};
