"use client";

import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Check if app is already installed
    const checkIfInstalled = () => {
      if (typeof window === 'undefined') return;

      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
        return;
      }

      if (window.navigator.standalone === true) {
        setIsInstalled(true);
        return;
      }
    };

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // Show banner after a delay if not dismissed
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const dismissed = localStorage.getItem("pwa-install-dismissed");
          if (!dismissed) {
            setShowBanner(true);
          }
        }
      }, 3000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowBanner(false);
      setDeferredPrompt(null);
      
      toast({
        title: "App Installed!",
        description: "Sarbon has been added to your home screen.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

    checkIfInstalled();

    if (!isInstalled && typeof window !== 'undefined') {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.addEventListener("appinstalled", handleAppInstalled);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.removeEventListener("appinstalled", handleAppInstalled);
      }
    };
  }, [isInstalled, toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      const result = await deferredPrompt.prompt();
      
      if (result.outcome === "accepted") {
        setIsInstalled(true);
        setIsInstallable(false);
        setShowBanner(false);
      }
      
      setDeferredPrompt(null);
      onClose();
    } catch (error) {
      console.error("Error installing PWA:", error);
      toast({
        title: "Installation Failed",
        description: "There was an error installing the app. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem("pwa-install-dismissed", "true");
    }
  };

  const handleShowModal = () => {
    setShowBanner(false);
    onOpen();
  };

  // Don't show anything if not client-side, app is already installed, or not installable
  if (!isClient || isInstalled || !isInstallable) {
    return null;
  }

  return (
    <>
      {/* Install Banner */}
      {showBanner && (
        <Box
          position="fixed"
          bottom="20px"
          left="20px"
          right="20px"
          bg="white"
          borderRadius="12px"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
          p={4}
          zIndex={1000}
          border="1px solid"
          borderColor="brand.200"
        >
          <HStack spacing={3} align="center">
            <Text fontSize="24px">📱</Text>
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize="sm" fontWeight="600" color="brand.900">
                Install Sarbon App
              </Text>
              <Text fontSize="xs" color="brand.600">
                Add to home screen for quick access
              </Text>
            </VStack>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" onClick={handleShowModal}>
                Install
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                p={1}
                minW="auto"
              >
                <CloseIcon />
              </Button>
            </HStack>
          </HStack>
        </Box>
      )}

      {/* Install Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <HStack spacing={3}>
              <DownloadIcon color="primary" boxSize={6} />
              <Text>Install Sarbon App</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <Text color="brand.600">
                Install Sarbon as an app on your device for:
              </Text>
              <VStack spacing={2} align="start" pl={4}>
                <Text fontSize="sm" color="brand.700">
                  • Quick access from your home screen
                </Text>
                <Text fontSize="sm" color="brand.700">
                  • Offline functionality
                </Text>
                <Text fontSize="sm" color="brand.700">
                  • Native app-like experience
                </Text>
                <Text fontSize="sm" color="brand.700">
                  • Push notifications (coming soon)
                </Text>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button variant="ghost" onClick={onClose}>
                Maybe Later
              </Button>
              <Button onClick={handleInstallClick} leftIcon={<DownloadIcon />}>
                Install App
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
