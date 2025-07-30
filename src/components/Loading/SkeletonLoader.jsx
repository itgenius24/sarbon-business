import { Skeleton, SkeletonText, Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";

/**
 * Skeleton loading components for different content types
 */

/**
 * Card skeleton loader
 * @param {Object} props - Component props
 * @param {number} props.count - Number of skeleton cards to show
 * @param {string} props.height - Height of each card
 * @returns {JSX.Element} Card skeleton loader
 */
export const CardSkeleton = ({ count = 3, height = "200px" }) => {
  return (
    <Stack spacing={4}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} padding="6" boxShadow="lg" bg="white" borderRadius="md">
          <Skeleton height="20px" mb={4} />
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
          <Skeleton height={height} mt={4} />
        </Box>
      ))}
    </Stack>
  );
};

/**
 * Table skeleton loader
 * @param {Object} props - Component props
 * @param {number} props.rows - Number of table rows
 * @param {number} props.columns - Number of table columns
 * @returns {JSX.Element} Table skeleton loader
 */
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <Stack spacing={3}>
      {/* Header */}
      <Flex gap={4}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} height="20px" flex={1} />
        ))}
      </Flex>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Flex key={`row-${rowIndex}`} gap={4}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} height="16px" flex={1} />
          ))}
        </Flex>
      ))}
    </Stack>
  );
};

/**
 * List skeleton loader
 * @param {Object} props - Component props
 * @param {number} props.items - Number of list items
 * @returns {JSX.Element} List skeleton loader
 */
export const ListSkeleton = ({ items = 5 }) => {
  return (
    <Stack spacing={3}>
      {Array.from({ length: items }).map((_, index) => (
        <Flex key={index} align="center" gap={3}>
          <Skeleton height="40px" width="40px" borderRadius="full" />
          <Box flex={1}>
            <Skeleton height="16px" mb={2} />
            <Skeleton height="12px" width="60%" />
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};

/**
 * Profile skeleton loader
 * @returns {JSX.Element} Profile skeleton loader
 */
export const ProfileSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" borderRadius="md">
      <Flex align="center" gap={4} mb={6}>
        <Skeleton height="80px" width="80px" borderRadius="full" />
        <Box flex={1}>
          <Skeleton height="20px" mb={2} />
          <Skeleton height="16px" width="60%" />
        </Box>
      </Flex>
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

/**
 * Form skeleton loader
 * @param {Object} props - Component props
 * @param {number} props.fields - Number of form fields
 * @returns {JSX.Element} Form skeleton loader
 */
export const FormSkeleton = ({ fields = 4 }) => {
  return (
    <Stack spacing={4}>
      {Array.from({ length: fields }).map((_, index) => (
        <Box key={index}>
          <Skeleton height="16px" width="30%" mb={2} />
          <Skeleton height="40px" />
        </Box>
      ))}
      <Skeleton height="40px" width="120px" mt={6} />
    </Stack>
  );
};

/**
 * Generic skeleton loader with customizable layout
 * @param {Object} props - Component props
 * @param {string} props.variant - Skeleton variant: "card", "table", "list", "profile", "form"
 * @param {Object} props.options - Variant-specific options
 * @returns {JSX.Element} Skeleton loader component
 */
const SkeletonLoader = ({ variant = "card", options = {} }) => {
  switch (variant) {
    case "table":
      return <TableSkeleton {...options} />;
    case "list":
      return <ListSkeleton {...options} />;
    case "profile":
      return <ProfileSkeleton {...options} />;
    case "form":
      return <FormSkeleton {...options} />;
    case "card":
    default:
      return <CardSkeleton {...options} />;
  }
};

export default SkeletonLoader;
