"use client";

import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
    List,
    ListItem,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OfflineFallback = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("brand.200", "gray.600");

  useEffect(() => {
    setIsClient(true);

    const updateOnlineStatus = () => {
      if (typeof window !== 'undefined') {
        setIsOnline(navigator.onLine);
      }
    };

    // Set initial status
    updateOnlineStatus();

    // Listen for connection changes
    if (typeof window !== 'undefined') {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      // Auto-redirect when back online
      const handleOnline = () => {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      };

      window.addEventListener("online", handleOnline);

      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
        window.removeEventListener("online", handleOnline);
      };
    }
  }, [router]);

  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      if (navigator.onLine) {
        router.push("/");
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <Box
      minH="100vh"
      bg="body-color"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={5}
    >
      <Box
        maxW="400px"
        w="full"
        bg={bgColor}
        p={8}
        borderRadius="16px"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        border="1px solid"
        borderColor={borderColor}
        textAlign="center"
      >
        <VStack spacing={6}>
          {/* Offline Icon */}
          <Box
            w="80px"
            h="80px"
            bg="primary"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="32px">📶</Text>
          </Box>

          {/* Title and Description */}
          <VStack spacing={3}>
            <Text fontSize="24px" fontWeight="600" color="brand.900">
              You're Offline
            </Text>
            <Text fontSize="16px" color="brand.600" lineHeight="1.5">
              It looks like you're not connected to the internet. Some features may not be available right now.
            </Text>
          </VStack>

          {/* Retry Button */}
          <Button
            leftIcon={<RepeatIcon />}
            onClick={handleRetry}
            size="md"
            w="full"
          >
            Try Again
          </Button>

          {/* Available Features */}
          <Box w="full" textAlign="left">
            <Text fontSize="18px" fontWeight="600" mb={4} color="brand.900">
              Available Offline:
            </Text>
            <List spacing={2}>
              <ListItem display="flex" alignItems="center">
                <CheckIcon color="primary" mr={3} />
                <Text fontSize="14px" color="brand.700">
                  View previously loaded cargo listings
                </Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <CheckIcon color="primary" mr={3} />
                <Text fontSize="14px" color="brand.700">
                  Access cached vehicle information
                </Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <CheckIcon color="primary" mr={3} />
                <Text fontSize="14px" color="brand.700">
                  Browse your saved routes
                </Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <CheckIcon color="primary" mr={3} />
                <Text fontSize="14px" color="brand.700">
                  View contact information
                </Text>
              </ListItem>
            </List>
          </Box>

          {/* Connection Status */}
          <Alert
            status={isOnline ? "success" : "error"}
            borderRadius="8px"
            w="full"
          >
            <AlertIcon />
            <AlertDescription fontSize="14px">
              <strong>Connection Status:</strong>{" "}
              {isOnline ? (
                <>
                  Online -{" "}
                  <Text as="span" color="primary" cursor="pointer" onClick={() => router.push("/")}>
                    Return to App
                  </Text>
                </>
              ) : (
                "Offline"
              )}
            </AlertDescription>
          </Alert>
        </VStack>
      </Box>
    </Box>
  );
};
