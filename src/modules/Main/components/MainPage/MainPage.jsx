"use client";
import React, { useRef, useState } from "react";
import cls from "./style.module.scss";
import { Box, Button, Flex } from "@chakra-ui/react";
import Slider from "react-slick";
import { Container } from "@/components/Container";
import slider11 from "../../../../assets/images/slider1.1.png";
import slider12 from "../../../../assets/images/slider1.2.png";
import slider21 from "../../../../assets/images/slider2.1.png";
import slider31 from "../../../../assets/images/slider3.1.png";
import slider32 from "../../../../assets/images/slider3.2.png";
import Image from "next/image";
import AppStore from "@/assets/images/app-store.svg";
import GooglePlay from "@/assets/images/google-play.svg";
import card1Img from "@/assets/images/card1.jpg";
import card2Img from "@/assets/images/card2.jpg";
import card3Img from "@/assets/images/card3.jpg";
import card4Img from "@/assets/images/card4.jpg";
import card5Img from "@/assets/images/card5.jpg";
import card6Img from "@/assets/images/card6.jpg";
import trashImg from "@/assets/images/bgTrash.png";
import {
  CashIcon,
  LikeIconY,
  MapIconE,
  NextIconMain,
  OperatorIocn,
  PrevIconMain,
  SecureIcon,
  TruckIconBlue,
} from "@/assets/icons/icons";
import { Animation, MotionSection } from "@/utils/animation";
import { fadeinLeft } from "@/utils/animationSetting";

const MainPage = () => {
  let sliderRef = useRef(null);
  var settings = {
    dots: true,
    // infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cards = [
    {
      id: 1,
      img: card1Img,
      title: `Больше заказов — Выше доход`,
      deck: `Находите и выбирайте рейсы, которые выгодны именно вам.`,
    },
    {
      id: 2,
      img: card2Img,
      title: `Удобный поиск и фильтры`,
      deck: `Фильтруйте грузы по маршруту, весу, стоимости и условиям.`,
    },
    {
      id: 3,
      img: card3Img,
      title: `Прямые сделки без посредников`,
      deck: `Работайте напрямую с грузовладельцами, без лишних комиссий и задержек.`,
    },
    {
      id: 4,
      img: card4Img,
      title: `Надежность и безопасность`,
      deck: `Проверенные заказчики, отзывы, рейтинги и защита от недобросовестных клиентов.`,
    },
    {
      id: 5,
      img: card5Img,
      title: `Всё под контролем в приложении`,
      deck: `Следите за заказами, общайтесь с клиентами и управляйте перевозками онлайн.`,
    },
    {
      id: 6,
      img: card6Img,
      title: `Оповещения о новых грузах`,
      deck: `Не тратьте время на поиск — подходящие заказы сами вас найдут.`,
    },
  ];

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 }); // Joyiga qaytish
  };

  const calculateOffset = (speed) => ({
    transform: isHovered
      ? `translate(${(mousePosition.x - window.innerWidth / 2) * speed}px, 
                        ${
                          (mousePosition.y - window.innerHeight / 2) * speed
                        }px)`
      : `translate(0, 0)`, // Asl joyiga qaytadi
    transition: "transform 0.3s ease-out",
  });

  return (
    <>
      <article>
        <Box className={cls.sliderWrap}>
          <Box onClick={() => previous() } className={cls.prev}>
            <PrevIconMain />
          </Box>
          <Box onClick={() => next() } className={cls.next}>
            <NextIconMain />
          </Box>
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            <Box key={`1`} className={cls.sliderCardWrap}>
              <Container>
                <Flex className={cls.cardWrap}>
                  <Box className={cls.cardLeft}>
                    <h1 className={cls.cardTitle}>
                      Заказ найдется <br /> всегда
                    </h1>
                    <p className={cls.cardDeck}>
                      Sarbon — это удобное приложение сервис для водителей, где
                      можно быстро находить заказы, получать с удобными
                      способами оплаты. Скачайте прямо сейчас
                    </p>
                    <Flex mt={`45px`} gap={`16px`} alignItems={`center`}>
                      <a
                        className={cls.mobileAppLink}
                        href={
                          "https://apps.apple.com/uz/app/furgo/id6475668788"
                        }
                        target="_blank"
                      >
                        <Image
                          src={AppStore}
                          alt="App store"
                          width={135}
                          height={40}
                        />
                      </a>

                      <a
                        style={{ cursor: `pointer` }}
                        className={cls.mobileAppLink}
                        href="https://play.google.com/store/apps/details?id=uz.sarbon.mobile&pcampaignid=web_share"
                        target="_blank"
                      >
                        <Image
                          src={GooglePlay}
                          alt="Google play"
                          width={135}
                          height={40}
                        />
                      </a>
                    </Flex>
                  </Box>
                  <Box   onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} position={`relative`} className={cls.cardRight}>
                    <Box style={calculateOffset(0.009)} position={`relative`} top={`-30px`} zIndex={1}>
                      <Image
                        width={450}
                        height={450}
                        src={slider11}
                        alt="sliderImg"
                      />
                    </Box>
                    <Box style={calculateOffset(-0.009)} bottom={`50px`} left={`130px`} position={`absolute`}>
                      <Image
                        width={450}
                        height={450}
                        src={slider12}
                        alt="sliderImg"
                      />
                    </Box>
                  </Box>
                </Flex>
              </Container>
            </Box>
            <Box
              key={`2`}
              className={`${cls.sliderCardWrap} ${cls.sliderCardWrap2}`}
            >
              <Container>
                <Flex className={cls.cardWrap}>
                  <Box className={cls.cardLeft}>
                    <h1 className={cls.cardTitle}>
                      Sarbon — биржа грузоперевозок и экосистема логистических
                      сервисов в Евразии
                    </h1>
                    <Flex mt={`45px`} gap={`16px`} alignItems={`center`}>
                      <Button width={`fit-content`}>Узнать больше</Button>
                    </Flex>
                  </Box>
                  <Box
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    position={`relative`}
                    className={cls.cardRight}
                  >
                    <Box
                      style={calculateOffset(0.009)}
                      bottom={0}
                      position={`absolute`}
                      zIndex={1}
                    >
                      <Image
                        width={500}
                        height={500}
                        src={slider32}
                        alt="sliderImg"
                      />
                    </Box>
                    <Box
                      style={calculateOffset(-0.009)}
                      top={`50px`}
                      left={`80px`}
                      position={`absolute`}
                    >
                      <Image
                        width={500}
                        height={500}
                        src={slider31}
                        alt="sliderImg"
                      />
                    </Box>
                    <Flex
                      gap={`11px`}
                      alignItems={`center`}
                      className={cls.statist1}
                      style={calculateOffset(0.015)}
                    >
                      <TruckIconBlue />
                      <div>
                        <p className={cls.title}>700+</p>
                        <p className={cls.subTitle}>активных водителей</p>
                      </div>
                    </Flex>

                    <Flex
                      gap={`11px`}
                      className={cls.statist2}
                      style={calculateOffset(0.018)}
                    >
                      <MapIconE />
                      <div>
                        <p className={cls.title}>GPS -Треккинг</p>
                        <p className={cls.subTitle}>
                          мониторинг груза на карте
                        </p>
                      </div>
                    </Flex>

                    <Flex
                      gap={`11px`}
                      className={cls.statist3}
                      style={calculateOffset(0.024)}
                    >
                      <LikeIconY />
                      <div>
                        <p className={cls.title}>99.9%</p>
                        <p className={cls.subTitle}>успешных грузоперевозок</p>
                      </div>
                    </Flex>
                  </Box>
                </Flex>
              </Container>
            </Box>
            <Box key={`3`} className={cls.sliderCardWrap}>
              <Container>
                <Flex className={cls.cardWrap}>
                  <Box className={cls.cardLeft}>
                    <h1 className={cls.cardTitle}>
                      Загрузите автопарк <br /> выгодными рейсами!
                    </h1>
                    <p className={cls.cardDeck}>
                      Добавляйте свои машины и водителей, выбирайте грузы
                      которые выгодны вам, контролируйте выполнение заказов и
                      отслеживайте их через GPS-трекинг.
                    </p>
                    <Flex mt={`45px`} gap={`16px`} alignItems={`center`}>
                      <Button width={`fit-content`}>Добавить автопарк</Button>
                    </Flex>
                  </Box>
                  <Box onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} position={`relative`} className={cls.cardRight}>
                    <Box style={calculateOffset(0.009)} position={`relative`} top={`-25px`} zIndex={1}>
                      <Image
                        width={450}
                        height={450}
                        src={slider21}
                        alt="sliderImg"
                      />
                    </Box>
                    <Box style={calculateOffset(-0.009)} bottom={`45px`} left={`130px`} position={`absolute`}>
                      <Image
                        width={450}
                        height={450}
                        src={slider12}
                        alt="sliderImg"
                      />
                    </Box>
                  </Box>
                </Flex>
              </Container>
            </Box>
          </Slider>
        </Box>
      </article>
      <article>
        <MotionSection>
          <Animation variants={fadeinLeft}>
            <Box className={cls.questionPage}>
              <h1 className={cls.questionTitle}>
                Почему выбирают <br /> Sarbon?
              </h1>

              <Container>
                <Box className={cls.cardWrapQuestion}>
                  {cards.map((item) => (
                    <Box key={item.id} className={cls.card}>
                      <Image src={item.img} alt={item.title} />
                      <h3 className={cls.cartTitle}>{item.title}</h3>
                      <p className={cls.cartDeck}>{item.deck}</p>
                    </Box>
                  ))}
                </Box>
              </Container>
            </Box>
          </Animation>
        </MotionSection>
      </article>
      <article>
        <Box className={cls.biznesPage}>
          <Box className={cls.bgPage}>
            <Box className={cls.contendTetx}>
              <h2>
                Связываем водителей и заказчиков для удобных и прозрачных
                перевозок.
              </h2>
            </Box>
          </Box>
          <Box className={cls.rightConten}>
            <h1 className={cls.rightContenTitle}>
              Оптимизируйте свой бизнес с Sarbon
            </h1>

            <Flex
              mt={`36px`}
              rowGap={`30px`}
              flexDirection={`column`}
              width={`100%`}
              position={`relative`}
            >
              <Box right={`-50px`} position={`absolute`} top={`-50px`}>
                <Image width={100} height={100} src={trashImg} alt="bgTrash" />
              </Box>
              <Flex position={`relative`} className={cls.rightContenCard}>
                <SecureIcon />
                <Box className={cls.textCard}>
                  <h5>Безопасность сделок </h5>
                  <p>
                    Система рейтингов, проверка документов и защита от
                    недобросовестных пользователей.
                  </p>
                </Box>
              </Flex>

              <Flex className={cls.rightContenCard}>
                <CashIcon />
                <Box className={cls.textCard}>
                  <h5>Максимальная выгода </h5>
                  <p>Выбирайте лучшие заказы и снижайте пустые пробеги.</p>
                </Box>
              </Flex>

              <Flex className={cls.rightContenCard}>
                <OperatorIocn />
                <Box className={cls.textCard}>
                  <h5>Поддержка 24/7 </h5>
                  <p>
                    Наш сервис всегда на связи, чтобы помочь в решении ваших
                    вопросов.
                  </p>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </article>

      <article className={cls.bottomPage}>
        <Container>
          <Flex justifyContent={`space-between`} width={`100%`}>
            <Box>
              <p className={cls.titleBottom}>
                Найдите груз для вашего транспорта
              </p>
              <p className={cls.deckBottom}>
                Регистрируйтесь и получите доступ к базе актуальных грузов с
                удобными фильтрами.
              </p>
            </Box>
            <Button className={cls.btnBottom}>Регистрация</Button>
          </Flex>
        </Container>
      </article>
    </>
  );
};

export default MainPage;
