"use client";

import React from "react";
import cls from "./styles.module.scss";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { HelpCircleIcon, LocationMarkIcon, PlusIcon } from "@/assets/icons/icons";
import { Button } from "@chakra-ui/react";
import { Checkbox } from "@/components/Checkbox";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import { DeleteButton } from "@/components/DeleteButton";
import clsx from "clsx";
import { useReceiptPlaceProps } from "./useReceiptPlaceProps";

export const ReceiptPlace = () => {

  const {
    register,
    errors,
    canEdit,
  } = useReceiptPlaceProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <div className={cls.formGroup}>
    <div className={cls.formContent}>
      <div className={cls.fields}>

        <div className={cls.fieldsWrapper}>
          <div className={cls.fieldsWrapperActions}>

            <h2 className={cls.heading}>{t("Место получения груза")}</h2>

          </div>
          <div className={cls.field}>
            <div className={cls.addressLinkWrapper}>
              <a className={clsx(cls.addressLink, { [cls.disabledLink]: !canEdit })} href={`/${locale || "ru"}/map/receipts/0`} />
              <TextFieldWithAddition
                placeholder={t("Адрес")}
                additionalItemTheme="white"
                register={register}
                name={`receipts[${0}].address`}
                error={errors["receipts"]?.address}
                onlyFieldDisabled={true}
                disabled={!canEdit}
                additionalItemPlaceholder={
                  <span className={cls.additionalIcons}>
                    <LocationMarkIcon />
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>;
};
