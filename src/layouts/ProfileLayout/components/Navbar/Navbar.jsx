import { useGetLang } from "@/hooks/useGetLang";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { CustomLogOutButton } from "../CustomLogOutButton";
import cls from "./styles.module.scss";
import { getNavList } from "./elements";

const tabStyles = {
  alignItems: "center",
  p: "14px 16px",
  bg: "white",
  _hover: { bg: "brand.50" },
};

const CAccordion = ({ children = "", content = "", defaultIndex }) => {
  return (
    <Accordion allowToggle defaultIndex={defaultIndex}>
      <AccordionItem border="none" p="0">
        <AccordionButton _hover={{ bg: "none" }} p="0" fontSize="16px">
          <Box flex={1}>{children}</Box>
        </AccordionButton>
        <AccordionPanel p="0">{content}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const Navbar = () => {
  const pathname = usePathname();

  const path = pathname.split("/")[3];
  const { t } = useTranslation();
  const locale = useGetLang();

  // Determine if we're in the advanced profile variant
  const isAdvanced = pathname.includes('/profile-new');
  const navList = getNavList(isAdvanced);

  return (
    <Box py="8px" bgColor="baseWhite" borderRadius="12px" width="316px">
      {navList.map((nav, i) => {
        if (nav.children) {
          const index = nav.children.findIndex((child) =>
            pathname.includes(child.path)
          );

          return (
            <CAccordion
              key={i}
              defaultIndex={index === -1 ? 1 : 0}
              content={
                <Flex direction="column">
                  {nav.children.map((child, i) => {
                    return (
                      <Link
                        className={clsx(cls.link, { [cls.active]: pathname.includes(child.path), })}
                        href={`/${locale}` + child.path}
                        key={i}
                      >
                        {child.icon}
                        <span>{t(`${child.title}`)}</span>
                      </Link>
                    );
                  })}
                </Flex>
              }
            >
              <Flex {...tabStyles}>
                {nav?.icon}{" "}
                <Text
                  lineHeight="20px"
                  fontWeight={500}
                  ml="10px"
                  color="icon.base"
                >
                  {t(`${nav?.title}`)}
                </Text>{" "}
                <AccordionIcon ml="auto" color={"icon.base"} />
              </Flex>
            </CAccordion>
          );
        }

        return (
          <Link
            className={clsx(cls.link, { [cls.active]: (!path && i === 0) || nav.path.includes(path), })}
            href={`/${locale}` + nav.path}
            key={i}
          >
            {nav.icon}
            <span>{t(`${nav.title}`)}</span>
          </Link>
        );
      })}
      <CustomLogOutButton />
    </Box>
  );
};
