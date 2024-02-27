import { MobileApp } from "./components/MobileApp";
import styles from "./styles.module.scss";

export function Main() {
  return (
    <article className={styles.main}>
      <MobileApp />;
    </article>
  );
}
