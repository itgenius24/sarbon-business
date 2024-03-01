import cls from "./styles.module.scss";
import { elements } from "./elements";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export const MainLayout = ({ children }) => {
  return <div className={cls.layout}>
    <Header elements={elements} />
    <article className={cls.main}>
      {children}
    </article>
    <Footer />
  </div>;
};
