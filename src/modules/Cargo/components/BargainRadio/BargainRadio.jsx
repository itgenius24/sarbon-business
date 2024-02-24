import clsx from "clsx";
import cls from "./styles.module.scss";

export const BargainRadio = ({
  register = () => {},
  name = "bargain"
}) => {

  return <label className={cls.bargainWrapper}>
    <input className={clsx("visually-hidden", cls.radio)} type="checkbox" defaultChecked name={name} {...register(name)} />
    <span className={clsx(cls.radioLabel, cls.first)}>Возможен торг</span>
    <span className={clsx(cls.radioLabel, cls.second)}>Без торга</span>
  </label>;
};
