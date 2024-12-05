"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "../Container";
import cls from "./styles.module.scss";
import GooglePlay from "@/assets/images/google-play.svg";
import AndroidPlay from "@/assets/images/android_apk.svg";
import AppStore from "@/assets/images/app-store.svg";
import GalaxyStore from "@/assets/images/galaxy-store.svg";
import { Logo } from "../Logo";
import { Box, Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const Footer = () => {

  const locale = useGetLang();

  const pathname = usePathname();

  const { t } = useTranslation(locale, "translations");

  const data = {
    left: [
      {
        title: t("Расчет расстояний"),
        link: `/${locale}/distance-calculation`,
      },
    ],
    center: [
      {
        title: t("О системе Furgo"),
        link: `/${locale}/about-us`,
      },
      {
        title: t("Контактная информация"),
        link: `/${locale}/contact`,
      },
    ],
    right: [
      // {
      //   title: "Блог",
      //   link: "/",
      // },
      {
        title: t("Политика конфиденциальности"),
        link: `/${locale}/privacy-policy`,
      },
      {
        title: t("Карта сайта"),
        link: `/${locale}/site-map`,
      },
    ],
  };

  return (
    <Box
      as="footer"
      bgColor={pathname.includes("/auth") ? "gray" : "baseWhite"}
      id="footer"
      className={cls.footer}
    >
      <Container className={cls.footerContainer}>
        <div className={cls.footerContent}>
          <div className={cls.infoListWrapper}>
            <p className={cls.infoListTitle}>{t("Полезное")}</p>
            <ul className={cls.infoList}>
              {data.left.map((item) => {
                return (
                  <li className={cls.infoItem} key={item.title}>
                    <Link className={cls.infoLink} href={item.link}>
                      {item.title}
                    </Link>
                    {/* {
                      item?.link?.includes("distance-calculation") ? (
                        <a className={cls.infoLink} href={item.link}>{item.title}</a>
                      ) : <Link className={cls.infoLink} href={item.link}>
                        {item.title}
                      </Link>
                    } */}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={cls.infoListWrapper}>
            <p className={cls.infoListTitle}>{t("Контакты и тарифы")}</p>
            <ul className={cls.infoList}>
              {data.center.map((item) => {
                return (
                  <li className={cls.infoItem} key={item.title}>
                    <Link className={cls.infoLink} href={item.link}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={cls.infoListWrapper}>
            <p className={cls.infoListTitle}>{t("Информация")}</p>
            <ul className={cls.infoList}>
              {data.right.map((item) => {
                return (
                  <li className={cls.infoItem} key={item.title}>
                    <Link className={cls.infoLink} href={item.link}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={cls.footerSocials}>
          <div className={cls.mobileApps}>
            <p className={cls.mobileAppsHeading}>
              {t("Мобильные приложения Furgo")}
            </p>
            <ul className={cls.mobileAppList}>
              <li className={cls.mobileAppItem}>
                <a className={cls.mobileAppLink} href={"https://apps.apple.com/uz/app/furgo/id6475668788"} target="_blank">
                  <Image
                    src={AppStore}
                    alt="App store"
                    width={135}
                    height={40}
                  />
                </a>
              </li>
              <li className={cls.mobileAppItem}>
                <a className={cls.mobileAppLink} download href={`../../assets/app/Furgo.apk`} target="_blank">
                  <Image
                    src={AndroidPlay}
                    alt="Google play"
                    width={135}
                    height={40}
                  />
                </a>
              </li>
              {/* <li className={cls.mobileAppItem}>
                <a className={cls.mobileAppLink} href={"/"} target="_blank">
                  <Image
                    src={GalaxyStore}
                    alt="Galaxy store"
                    width={147}
                    height={40}
                  />
                </a>
              </li> */}
            </ul>
          </div>
          <ul className={cls.socialList}>
            <li className={cls.socialItem}>
              <a className={cls.socialLink} href={"/"} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.55016 21.75C16.6045 21.75 21.5583 14.2467 21.5583 7.74186C21.5583 7.53092 21.5536 7.3153 21.5442 7.10436C22.5079 6.40746 23.3395 5.54425 24 4.5553C23.1025 4.9546 22.1496 5.21538 21.1739 5.32874C22.2013 4.71291 22.9705 3.74547 23.3391 2.60577C22.3726 3.17856 21.3156 3.58261 20.2134 3.80061C19.4708 3.01156 18.489 2.48912 17.4197 2.31405C16.3504 2.13899 15.2532 2.32105 14.2977 2.8321C13.3423 3.34314 12.5818 4.15471 12.1338 5.14131C11.6859 6.12792 11.5754 7.23462 11.8195 8.2903C9.86249 8.19209 7.94794 7.6837 6.19998 6.7981C4.45203 5.91249 2.90969 4.66944 1.67297 3.14952C1.0444 4.23324 0.852057 5.51565 1.13503 6.73609C1.418 7.95654 2.15506 9.02345 3.19641 9.71999C2.41463 9.69517 1.64998 9.48468 0.965625 9.10592V9.16686C0.964925 10.3041 1.3581 11.4066 2.07831 12.2868C2.79852 13.167 3.80132 13.7706 4.91625 13.995C4.19206 14.1931 3.43198 14.222 2.69484 14.0794C3.00945 15.0574 3.62157 15.9129 4.44577 16.5263C5.26997 17.1398 6.26512 17.4806 7.29234 17.5012C5.54842 18.8711 3.39417 19.6141 1.17656 19.6106C0.783287 19.61 0.390399 19.5859 0 19.5384C2.25286 20.9837 4.87353 21.7514 7.55016 21.75Z"
                    fill="#98A2B3"
                  />
                </svg>
              </a>
            </li>
            {/* <li className={cls.socialItem}>
              <a className={cls.socialLink} href={"/"} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                    fill="#98A2B3"
                  />
                </svg>
              </a>
            </li> */}
            <li className={cls.socialItem}>
              <a className={cls.socialLink} href={"/"} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_174_21793)">
                    <path
                      d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                      fill="#98A2B3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_174_21793">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            {/* <li className={cls.socialItem}>
              <a className={cls.socialLink} href={"/"} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_174_21794)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z"
                      fill="#98A2B3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_174_21794">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li className={cls.socialItem}>
              <a className={cls.socialLink} href={"/"} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.7705 10.0969C18.319 8.56875 19.8986 4.14844 19.8986 2.73281C19.8986 1.48594 19.1627 0.440625 17.8502 0.440625C15.7596 0.440625 13.8846 6.61406 13.2986 8.08594C12.844 6.75 10.7158 0 8.84083 0C7.38301 0 6.69864 1.07344 6.69864 2.42344C6.69864 4.07812 8.30176 8.36719 8.88301 10.0172C8.5877 9.90938 8.26895 9.81562 7.94551 9.81562C6.84864 9.81562 5.68145 11.1797 5.68145 12.2812C5.68145 12.6984 5.91114 13.2844 6.05645 13.6734C4.32676 14.1422 3.66114 15.2953 3.66114 17.0344C3.65645 20.4187 6.8627 24 11.3721 24C16.9033 24 20.344 19.8469 20.344 14.4891C20.344 12.4688 20.0205 10.6453 17.7705 10.0969ZM16.1111 5.0625C16.2986 4.48594 17.1002 2.04844 17.8502 2.04844C18.2533 2.04844 18.3611 2.46563 18.3611 2.79844C18.3611 3.69375 16.5518 8.63906 16.1533 9.73594L14.5596 9.45469L16.1111 5.0625ZM8.17051 2.26406C8.17051 1.70625 8.8502 0.121875 10.3408 4.47188L11.9627 9.17344C11.2315 9.1125 10.6643 9.03281 10.3033 9.23906C9.79239 7.88906 8.17051 3.62812 8.17051 2.26406ZM8.0627 11.4375C9.43614 11.4375 11.208 15.8719 11.208 16.4719C11.208 16.7109 10.9783 17.0062 10.7111 17.0062C9.73145 17.0062 7.10645 13.4016 7.10645 12.4266C7.11114 12.0656 7.70176 11.4375 8.0627 11.4375ZM16.7018 20.1703C15.3377 21.6703 13.594 22.4484 11.5596 22.4484C8.7752 22.4484 6.57676 20.9203 5.51739 18.3094C4.71583 16.275 5.69551 15.1078 6.48301 15.1078C7.01739 15.1078 9.02833 17.9344 9.02833 18.5344C9.02833 18.7641 8.66739 18.9234 8.47989 18.9234C7.7252 18.9234 7.42989 18.1969 6.08458 16.5141C4.69239 17.9062 7.04551 20.5875 8.81739 20.5875C10.0408 20.5875 10.8377 19.4531 10.5986 18.6188C10.7721 18.6188 10.9877 18.6328 11.1471 18.5906C11.1986 19.8609 11.5736 21.375 13.1018 21.4828C13.1018 21.4406 13.1955 21.15 13.1955 21.1359C13.1955 20.3203 12.6986 19.6078 12.6986 18.7781C12.6986 17.4516 13.7158 16.1672 14.7471 15.4172C15.1221 15.1359 15.5768 14.9625 16.0174 14.8031C16.4721 14.6297 16.9549 14.4281 17.3018 14.0812C17.2502 13.5562 17.0346 13.0922 16.5096 13.0922C15.2111 13.0922 10.8565 13.2797 10.8565 11.2313C10.8565 10.9172 10.8611 10.6172 11.6721 10.6172C13.1861 10.6172 17.0299 10.9922 18.1549 11.9813C19.0033 12.7359 19.294 17.2875 16.7018 20.1703ZM12.0799 14.2641C12.5346 14.4094 13.0033 14.4516 13.4721 14.5453C13.1252 14.7984 12.8158 15.1078 12.5205 15.4406C12.3893 15.0422 12.2299 14.6531 12.0799 14.2641Z"
                    fill="#98A2B3"
                  />
                </svg>
              </a>
            </li>
            <li className={cls.socialItem}>
              <a className={cls.socialLink} href={"/"} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.37527 0 0 5.37527 0 12C0 18.6248 5.37527 24 12 24C18.6117 24 24 18.6248 24 12C24 5.37527 18.6117 0 12 0ZM19.9262 5.53145C21.3579 7.27549 22.217 9.50107 22.243 11.9089C21.9046 11.8439 18.5206 11.154 15.1106 11.5835C15.0325 11.4143 14.9675 11.2321 14.8894 11.0499C14.6811 10.5554 14.4469 10.0477 14.2126 9.56618C17.9869 8.0304 19.705 5.81779 19.9262 5.53145ZM12 1.77007C14.603 1.77007 16.9848 2.74621 18.7939 4.34707C18.6117 4.60738 17.0629 6.67679 13.4186 8.04338C11.7397 4.95878 9.87855 2.43384 9.5922 2.04338C10.3601 1.86117 11.1671 1.77007 12 1.77007ZM7.63995 2.73319C7.91325 3.09761 9.73538 5.63558 11.4404 8.65508C6.65076 9.9306 2.42083 9.90458 1.96529 9.90458C2.62907 6.72885 4.77657 4.08676 7.63995 2.73319ZM1.74404 12.0131C1.74404 11.9089 1.74404 11.8048 1.74404 11.7007C2.18655 11.7136 7.15835 11.7787 12.2733 10.243C12.5727 10.8156 12.846 11.4013 13.1063 11.9869C12.9761 12.026 12.8329 12.0651 12.7028 12.1041C7.41865 13.8091 4.60738 18.4685 4.3731 18.859C2.7462 17.0499 1.74404 14.6421 1.74404 12.0131ZM12 22.256C9.6312 22.256 7.44469 21.449 5.71367 20.0954C5.89588 19.718 7.97827 15.7094 13.757 13.692C13.783 13.679 13.7961 13.679 13.8221 13.666C15.2668 17.4013 15.8525 20.5379 16.0087 21.436C14.7722 21.9696 13.4186 22.256 12 22.256ZM17.7136 20.4989C17.6096 19.8742 17.0629 16.8807 15.7223 13.1974C18.9371 12.6898 21.7484 13.5228 22.0998 13.6399C21.6573 16.4902 20.0173 18.9501 17.7136 20.4989Z"
                    fill="#98A2B3"
                  />
                </svg>
              </a>
            </li> */}
          </ul>
        </div>
        <div className={cls.footerBottom}>
         <Flex alignItems={`center`} gap={2}>
             <Logo width={32} height={32} />
                <Link
                    className={cls.link}
                    title={t("Зарегистрироваться")}
                    href={`/${locale}/auth/registration`}

                  >
                    {t("Зарегистрироваться")}
                  </Link>
         </Flex>
          <p className={cls.copyright}>{t("copyright")}</p>
        </div>
      </Container>
    </Box>
  );
};
