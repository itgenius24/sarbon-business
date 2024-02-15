import cls from "./styles.module.scss";
import { Header } from "@/components/Header";
import { elements } from "./elements";
import { Footer } from "@/components/Footer";

export const MainLayout = ({ children }) => {
  return <div className={cls.layout}>
    <Header elements={elements} />
    <article className={cls.main}>
      {children}
    </article>
    <Footer />
  </div>;
};
