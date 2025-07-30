"use client";

import { useStoreHydration } from "@/hooks/useStoreHydration";
import { Main } from "@/modules/Main";
import authStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({ params }) {
  const { locale } = params;
  const router = useRouter();
  const isHydrated = useStoreHydration();

  useEffect(() => {
    // Check authentication status
    const checkAuthAndRedirect = () => {
      const isAuth = authStore?.token?.access_token;

      // For PWA scenarios, also check localStorage directly if store isn't hydrated yet
      let fallbackAuth = false;
      const isPWA = typeof window !== "undefined" && window.navigator?.standalone;

      if (!isHydrated && isPWA) {
        try {
          const storedAuth = localStorage.getItem('authStore');
          if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            fallbackAuth = parsedAuth.isAuth && parsedAuth.token?.access_token;
          }
        } catch (e) {
          console.error('Error checking fallback auth:', e);
        }
      }

      const userIsAuthenticated = isAuth || fallbackAuth;

      if (userIsAuthenticated) {
        // Redirect authenticated users to cargos page
        router.replace(`/${locale}/cargos`);
        return;
      }
    };

    // Only redirect if store is hydrated OR if we're in PWA mode
    if (isHydrated || (typeof window !== "undefined" && window.navigator?.standalone)) {
      checkAuthAndRedirect();
    }
  }, [isHydrated, locale, router]);

  // Show main page for non-authenticated users or while loading
  return <Main locale={locale} />;
}
