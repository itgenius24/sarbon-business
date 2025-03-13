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
        : <a target="_blank" href={`https://yandex.uz/maps/10335/tashkent/?ll=69.292768%2C41.340453&mode=whatshere&pt=69.291684%2C41.340317pm2rdm&whatshere%5Bpoint%5D=69.292878%2C41.340541&whatshere%5Bzoom%5D=17&z=20.52`} className={cls.link}>{content}</a>
    }
  </div>;
};

