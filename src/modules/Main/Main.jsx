import clsx from "clsx";
import { MobileApp } from "./components/MobileApp";
import { News } from "./components/News";
import styles from "./styles.module.scss";
import { useMainProps } from "./useMainProps";

export function Main({ t }) {

  const { banner } = useMainProps();

  return (
    <article className={clsx(styles.main, "fade-in")}>
      <MobileApp description={banner?.description} description1={banner?.description_1} photo={banner?.photo} />
      <News t={t} />
    </article>
  );
}
