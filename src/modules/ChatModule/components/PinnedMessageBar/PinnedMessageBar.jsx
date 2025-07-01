"use client";
import { useEffect, useState, useRef } from "react";
import cls from "./style.module.scss";
import { Box } from "@chakra-ui/react";

export const PinnedMessageBar = ({ messages }) => {
  const [show, setShow] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const messageListEl = document.querySelector(".str-chat__list");
    if (!messageListEl) return;

    const handleScroll = () => {
      const st = messageListEl.scrollTop;
      const diff = Math.abs(st - lastScrollTop.current);

      if (diff >= 50) {
        if (st < lastScrollTop.current) {
          // scroll up
          setShow(true);
        } else {
          // scroll down
          setShow(false);
        }
        lastScrollTop.current = st <= 0 ? 0 : st;
      }
    };

    messageListEl.addEventListener("scroll", handleScroll);
    return () => {
      messageListEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={cls.pinWrap}>
      <Box>
        <p className={cls.subTitle}>Общая сумма</p>
        <p className={cls.title}>54 000 000 UZS</p>
      </Box>
      <Box>
        <p className={cls.subTitle}>
          Тип оплаты: <span className={cls.title}>Наличные</span>
        </p>
        <p className={cls.subTitle}>
          Предоплата: <span className={cls.title}>$400</span>
        </p>
      </Box>
    </div>
  );
};
