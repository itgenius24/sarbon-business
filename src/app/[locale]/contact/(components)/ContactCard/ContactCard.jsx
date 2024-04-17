import clsx from "clsx";
import cls from "./styles.module.scss";

export const ContactCard = ({
  content,
  type="email",
  title="Почта",
  desc="Мы вам поможем",
  addressLink,
}) => {

  return <div className={cls.contactCard}>
    <span className={clsx(cls.icon, cls[type])}></span>
    <h4 className={cls.title}>{title}</h4>
    <p className={cls.text}>{desc}</p>
    {
      type !== "location"
        ? <a className={cls.link} target="_blank" href={addressLink ? addressLink : type === "email" ? `mailto:${content}` : type === "phone" ? `tel:${content}` : content}>{content}</a>
        : <span className={cls.link}>{content}</span>
    }
  </div>;
};
