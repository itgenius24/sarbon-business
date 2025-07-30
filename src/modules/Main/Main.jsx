import clsx from "clsx";
import { MobileApp } from "./components/MobileApp";
import { News } from "./components/News";
import styles from "./styles.module.scss";
import MainPage from "./components/MainPage/MainPage";


export async function Main({locale}) {

  const params = {
    data: JSON.stringify({
      status: ["banner"],
      with_relations: true,
    })
  };

  const searchParams = new URLSearchParams(params);

  const res = await fetch("https://api.admin.furgo.uz/v2/object-slim/get-list/partners_company?" + searchParams.toString(), {
    method: "GET",
    headers: {
      Authorization: "API-KEY",
      "X-API-KEY": "P-LVV522r72r72mHNTNZ1w0FimKLFSCOqT"
    }
  });

  const data = await res.json();

  const banner = data?.data?.data?.response?.[0];

  return (
    <article className={clsx(styles.main, "fade-in")}>
    {/* <MainPage locale={locale} /> */}
      {/* <MobileApp description={banner?.description} description1={banner?.description_1} photo={banner?.photo} data={data?.data?.data?.response?.[0]} /> */}
      <News />
    </article>
  );
}
