import { MobileApp } from "./components/MobileApp";
import { News } from "./components/News";
import styles from "./styles.module.scss";

export function Main() {
  return (
    <article className={styles.main}>
      <MobileApp />;
      <News />
    </article>
  );
}
