"use client";

import { useEffect, useState } from "react";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import remoteConfig from "@/utils/fribaseAuth";
import { useTranslation } from "@/app/i18n/client";

export const useChangelogProps = (locale) => {
  const { t } = useTranslation(locale, "translations");
  const [changelogData, setChangelogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const crumbs = [
    { label: t("Главная"), href: `/${locale}` },
    { label: t("Журнал изменений"), href: `/${locale}/changelog` },
  ];

  useEffect(() => {
    const fetchChangelogData = async () => {
      try {
        setLoading(true);
        await fetchAndActivate(remoteConfig);
        
        const data = JSON.parse(
          getValue(remoteConfig, "changelog_web").asString()
        );
        
        if (data?.changelog_web && Array.isArray(data.changelog_web)) {
          setChangelogData(data.changelog_web);
        } else {
          setChangelogData([]);
        }
      } catch (err) {
        console.error("Error fetching changelog data:", err);
        setError(err);
        setChangelogData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelogData();
  }, []);

  return {
    changelogData,
    loading,
    error,
    crumbs,
    t,
  };
};
