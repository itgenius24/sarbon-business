"use client";

import authStore from "@/store/auth.store";
import { useEffect, useState } from "react";

export const useStoreHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let retryCount = 0;
    const maxRetries = 20; // Increase max retries for PWA scenarios

    const checkHydration = () => {
      const storedAuth = localStorage.getItem('authStore');

      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          // Check if stored auth indicates user should be authenticated but store isn't hydrated yet
          if (parsedAuth.isAuth && !authStore.isAuth && retryCount < maxRetries) {
            retryCount++;
            setTimeout(checkHydration, 100);
            return;
          }
        } catch (e) {
          console.error('Error parsing stored auth data:', e);
        }
      }

      // For PWA scenarios, ensure we wait a bit longer for store to hydrate
      if (retryCount === 0 && window.navigator?.standalone) {
        retryCount++;
        setTimeout(checkHydration, 200);
        return;
      }

      setIsHydrated(true);
    };

    // Start checking immediately for PWA, with a small delay for regular web
    const initialDelay = window.navigator?.standalone ? 0 : 50;
    const timeoutId = setTimeout(checkHydration, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  return isHydrated;
};
