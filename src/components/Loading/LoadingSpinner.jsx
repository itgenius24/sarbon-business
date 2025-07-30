import { Spinner, Flex, Text, Box } from "@chakra-ui/react";
import React from "react";

/**
 * Reusable loading spinner component with customizable size and text
 * @param {Object} props - Component props
 * @param {string} props.size - Spinner size: "xs", "sm", "md", "lg", "xl"
 * @param {string} props.text - Loading text to display
 * @param {boolean} props.fullScreen - Whether to display as full screen overlay
 * @param {string} props.color - Spinner color
 * @param {boolean} props.overlay - Whether to show as overlay
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({
  size = "md",
  text = "Загрузка...",
  fullScreen = false,
  color = "blue.500",
  overlay = false,
}) => {
  const containerProps = fullScreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        bg: overlay ? "rgba(255, 255, 255, 0.8)" : "white",
      }
    : {};

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight={fullScreen ? "100vh" : "200px"}
      gap={3}
      {...containerProps}
    >
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color={color}
        size={size}
      />
      {text && (
        <Text fontSize="sm" color="gray.600" textAlign="center">
          {text}
        </Text>
      )}
    </Flex>
  );
};

export default LoadingSpinner;
