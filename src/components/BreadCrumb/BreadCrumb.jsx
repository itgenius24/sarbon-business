import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";

export const BreadCrumb = ({ crumbs = [] }) => {

  return <ChakraBreadcrumb
    mb="24px"
    separator={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="4"
        viewBox="0 0 4 4"
        fill="none"
      >
        <circle cx="2" cy="2" r="2" fill="#98A2B3" />
      </svg>
    }
  >
    {
      crumbs.map((item, index) => (
        <BreadcrumbItem color={index === 0 ? "#98A2B3" : "#344054"} key={index}>
          <BreadcrumbLink as={item.href ? Link : "div"} href={item.href || ""}>
            {item.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))
    }
  </ChakraBreadcrumb>;
};
