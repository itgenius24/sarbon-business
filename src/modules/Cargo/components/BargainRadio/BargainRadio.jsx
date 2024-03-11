import clsx from "clsx";
import cls from "./styles.module.scss";

export const BargainRadio = ({
  register = () => {},
  name = "bargain",
  disabled
}) => {

  return <div className={cls.bargainWrapper}>
    <label>
      <input disabled={disabled} className={clsx("visually-hidden", cls.radio)} value="1" type="radio" defaultChecked name={name} {...register(name)} />
      <span className={clsx(cls.radioLabel, cls.first)}>Возможен торг</span>
    </label>
    <label>
      <input disabled={disabled} className={clsx("visually-hidden", cls.radio)} value="2" type="radio" defaultChecked name={name} {...register(name)} />
      <span className={clsx(cls.radioLabel, cls.first)}>Без торга</span>
    </label>
    <label>
      <input disabled={disabled} className={clsx("visually-hidden", cls.radio)} value="3" type="radio" defaultChecked name={name} {...register(name)} />
      <span className={clsx(cls.radioLabel, cls.first)}>Запросить</span>
    </label>
  </div>;
};
