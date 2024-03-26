import { MobileApp } from "./components/MobileApp";
import { News } from "./components/News";
import styles from "./styles.module.scss";
import { useMainProps } from "./useMainProps";

export function Main() {

  const { banner } = useMainProps();

  return (
    <article className={styles.main}>
      <MobileApp description={banner?.description} description1={banner?.description_1} photo={banner?.photo} />
      <News />
    </article>
  );
}
