import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

export const Gallery = ({ data, isLargerThan845 }) => {
  const [activeId, setActiveId] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const imageClicked = (id) => {
    setActiveId(id);
    setIsActive((prev) => !prev);
  };

  const imageList = [{ url: data?.photo, id: 0 }];

  const resultImgs = imageList.filter((img) => img.id === activeId);

  return (
    <Box>
      {/* main container */}
      <Box width={isLargerThan845 ? "287px" : "100%"} rounded="8px" overflow="hidden">
        {/* sub container */}
        {resultImgs.map((item) => (
          <Image
            src={item.url}
            width={287}
            height={203}
            style={{
              aspectRatio: "287 / 203",
              objectFit: "cover",
              width: isLargerThan845 ? "inherit" : "100%",
            }}
            key={item}
            alt="image"
          />
        ))}
      </Box>
      <UnorderedList
        ml="0"
        mt="10px"
        maxW="287px"
        overflow="scroll"
        listStyleType="none"
        display="flex"
        flexWrap="wrap"
        gap="7px"
      >
        {imageList.map((item) => {
          return (
            <ThumbnailItem
              eachImage={item}
              key={item.id}
              onClicked={imageClicked}
              isActive={activeId === item.id}
            />
          );
        })}
      </UnorderedList>
    </Box>
  );
};


const ThumbnailItem = ({ eachImage, isActive, onClicked = () => {} }) => {
  const { id, url } = eachImage || {};
  const onImage = () => {
    onClicked(id);
  };
  return (
    <ListItem border="none" bg="none">
      <Button
        // color="transparent"
        rounded="10px"
        overflow="hidden"
        border="none"
        outline="none"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        p={0}
        width="66px"
        height="44px"
        onClick={onImage}
        // opacity={isActive ? "1" : "0.9"}
      >
        <Image
          width={66}
          height={44}
          style={{
            width: "100%",
            height: "100%",
            // opacity: isActive ? "1" : "0.5",
            aspectRatio: "137 / 87",
            objectFit: "cover",
          }}
          priority={false}
          alt={"car"}
          // src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`}
          src={url}
        />
      </Button>
    </ListItem>
  );
};
