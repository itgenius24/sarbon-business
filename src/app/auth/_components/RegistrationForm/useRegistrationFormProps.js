import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useRegistrationFormProps = () => {
  const router = useRouter();

  const roleOptions = [
    {
      label: "Заказчик",
      value: "client",
    },
    {
      label: "Экспедитор",
      value: "expeditor",
    }
  ];

  const { control, register, handleSubmit } = useForm();

  function onSubmit (data) {
    console.log(data);
  }

  function handleBack(){
    router.push("/auth/registration");
  }

  return { roleOptions, control, register, handleSubmit, onSubmit, handleBack };
};
