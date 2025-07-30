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
    // Only redirect if store is hydrated and user is authenticated
    if (isHydrated) {
      const isAuth = authStore?.token?.access_token;

      if (isAuth) {
        // Redirect authenticated users to cargos page
        router.replace(`/${locale}/cargos`);
        return;
      }
    }
  }, [isHydrated, locale, router]);

  // Show main page for non-authenticated users or while loading
  return <Main locale={locale} />;
}
