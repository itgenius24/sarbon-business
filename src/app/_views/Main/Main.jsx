import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import styles from "./styles.module.scss";

export function Main() {
  return (
    <article className={styles.main}>
      <h1>Main</h1>
      <TextFieldWithAddition additionalItemPlaceholder="km" placeholder="Введите сумму" />
    </article>
  );
}
