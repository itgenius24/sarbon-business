import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useLoginProps = () => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function navigateRegistration () {
    router.push("/auth/registration");
  }

  function onSubmit (data) {
    console.log(data);
  }

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    navigateRegistration,
  };

};
