import clsx from "clsx";
import cls from "./styles.module.scss";
import { useTranslation } from "react-i18next";

export const BargainRadio = ({
  register = () => {},
  name = "bargain",
  watch = () => {},
  disabled
}) => {
 const {t} = useTranslation();
  return <div className={cls.bargainWrapper}>
    <label>
      <input disabled={disabled} className={clsx("visually-hidden", cls.radio)} value="negotiable" checked={watch(name) === "negotiable"} type="radio" {...register(name)} defaultChecked />
      <span className={clsx(cls.radioLabel, cls.first)}>{t(`Возможен торг`)}</span>
    </label>
    <label>
      <input disabled={disabled} className={clsx("visually-hidden", cls.radio)} value="no_haggling" checked={watch(name) === "no_haggling"} type="radio" {...register(name)} />
      <span className={clsx(cls.radioLabel, cls.first)}>{t(`Без торга`)}</span>
    </label>
    <label>
      <input disabled={disabled} className={clsx("visually-hidden", cls.radio)} value="request" checked={watch(name) === "request"} type="radio" {...register(name)} />
      <span className={clsx(cls.radioLabel, cls.first)}>{t(`Запросить`)}</span>
    </label>
  </div>;
};
