import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import cls from "./style.module.scss";
import { StartIconProfile } from "@/assets/icons/icons";

const StarRating = ({ rating }) => {
  return (
    <Box width={`100%`}>
      <Flex gap={`5px`} alignItems={`center`}>
        <Flex gap={`3px`} alignItems={`center`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Box
              key={star}
              className={rating >= star ? cls.activeStar : cls.star}
            >
              <StartIconProfile />
            </Box>
          ))}
        </Flex>
        <p className={cls.rating}>
          {rating}.{5 - rating}
        </p>
      </Flex>
      <p className={cls.text}>(16 отзывов)</p>
    </Box>
  );
};

export default StarRating;
