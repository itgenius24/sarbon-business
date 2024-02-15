import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@/utils/yupResolver";

export const useRegistrationProps = () => {

  const router = useRouter();

  const schema = yup
    .object({ phone: yup.string().required(), })
    .required();

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  function navigateLogin () {
    router.push("/auth/login");
  }

  function onSubmit (data) {
    console.log(data);
    router.push("/auth/otp");
  }

  return {
    handleSubmit,
    register,
    errors,
    navigateLogin,
    onSubmit,
  };
};
