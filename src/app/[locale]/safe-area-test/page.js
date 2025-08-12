"use client";

import { Box, Text, VStack, HStack, Badge, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function SafeAreaTestPage() {
  const [safeAreaValues, setSafeAreaValues] = useState({
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  });
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // Get computed safe area values
    const computedStyle = getComputedStyle(document.documentElement);
    setSafeAreaValues({
      top: computedStyle.getPropertyValue('--safe-area-inset-top').trim(),
      right: computedStyle.getPropertyValue('--safe-area-inset-right').trim(),
      bottom: computedStyle.getPropertyValue('--safe-area-inset-bottom').trim(),
      left: computedStyle.getPropertyValue('--safe-area-inset-left').trim()
    });
  }, []);

  return (
    <Box 
      minHeight="100vh" 
      bg="gray.50" 
      p={4}
      className="safe-area-horizontal"
    >
      <VStack spacing={6} align="stretch">
        {/* Header Test Area */}
        <Box 
          bg="red.100" 
          p={4} 
          borderRadius="md"
          className="safe-area-top"
          border="2px solid red"
        >
          <Text fontWeight="bold" color="red.800">
            🔴 Header Safe Area Test
          </Text>
          <Text fontSize="sm" color="red.600">
            This red box should not go under the status bar or notch
          </Text>
        </Box>

        {/* Safe Area Values Display */}
        <Box bg="white" p={4} borderRadius="md" shadow="sm">
          <Text fontWeight="bold" mb={3}>Safe Area Values:</Text>
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text>Top:</Text>
              <Badge colorScheme={safeAreaValues.top !== '0px' ? 'green' : 'gray'}>
                {safeAreaValues.top}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text>Right:</Text>
              <Badge colorScheme={safeAreaValues.right !== '0px' ? 'green' : 'gray'}>
                {safeAreaValues.right}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text>Bottom:</Text>
              <Badge colorScheme={safeAreaValues.bottom !== '0px' ? 'green' : 'gray'}>
                {safeAreaValues.bottom}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text>Left:</Text>
              <Badge colorScheme={safeAreaValues.left !== '0px' ? 'green' : 'gray'}>
                {safeAreaValues.left}
              </Badge>
            </HStack>
          </VStack>
        </Box>

        {/* Content Area */}
        <Box bg="blue.100" p={4} borderRadius="md" minHeight="300px">
          <Text fontWeight="bold" color="blue.800" mb={2}>
            📱 Content Area
          </Text>
          <Text color="blue.600">
            This content should be properly spaced from screen edges and not overlap with system UI.
          </Text>
          <Text mt={2} fontSize="sm" color="blue.500">
            Screen size: {isLargerThan768 ? 'Desktop/Tablet' : 'Mobile'}
          </Text>
        </Box>

        {/* Side Safe Area Test */}
        <HStack spacing={4}>
          <Box 
            bg="orange.100" 
            p={4} 
            borderRadius="md" 
            flex={1}
            className="safe-area-left"
            border="2px solid orange"
          >
            <Text fontWeight="bold" color="orange.800">
              🟠 Left Safe Area
            </Text>
            <Text fontSize="sm" color="orange.600">
              Should not touch left edge
            </Text>
          </Box>
          <Box 
            bg="purple.100" 
            p={4} 
            borderRadius="md" 
            flex={1}
            className="safe-area-right"
            border="2px solid purple"
          >
            <Text fontWeight="bold" color="purple.800">
              🟣 Right Safe Area
            </Text>
            <Text fontSize="sm" color="purple.600">
              Should not touch right edge
            </Text>
          </Box>
        </HStack>

        {/* Instructions */}
        <Box bg="yellow.100" p={4} borderRadius="md">
          <Text fontWeight="bold" color="yellow.800" mb={2}>
            📋 Testing Instructions:
          </Text>
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" color="yellow.700">
              • Test on Android devices with different screen configurations
            </Text>
            <Text fontSize="sm" color="yellow.700">
              • Check that colored boxes don't overlap with system UI
            </Text>
            <Text fontSize="sm" color="yellow.700">
              • Verify safe area values show non-zero values on devices with notches/rounded corners
            </Text>
            <Text fontSize="sm" color="yellow.700">
              • Test in both portrait and landscape orientations
            </Text>
          </VStack>
        </Box>
      </VStack>

      {/* Bottom Test Area - Fixed Position */}
      {!isLargerThan768 && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg="green.100"
          p={4}
          className="safe-area-bottom safe-area-horizontal"
          border="2px solid green"
          borderBottom="none"
        >
          <Text fontWeight="bold" color="green.800" textAlign="center">
            🟢 Bottom Safe Area Test - Should not overlap with navigation
          </Text>
        </Box>
      )}
    </Box>
  );
}
