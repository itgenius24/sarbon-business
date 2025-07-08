"use client";

import { useEffect, useState } from "react";
import authStore from "@/store/auth.store";

export const useStoreHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checkHydration = () => {
      const storedAuth = localStorage.getItem('authStore');
      
      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          if (parsedAuth.isAuth && !authStore.isAuth) {
            setTimeout(checkHydration, 100);
            return;
          }
        } catch (e) {
          console.error('Error parsing stored auth data:', e);
        }
      }
      
      setIsHydrated(true);
    };

    const timeoutId = setTimeout(checkHydration, 50);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return isHydrated;
};
