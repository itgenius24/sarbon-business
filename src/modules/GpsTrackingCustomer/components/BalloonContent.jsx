import {
  BlueFuraIcon,
  BluePendingIcon,
  BluePhoneIcon,
  CencelMapIcon,
  CheckBlueIcon,
  GreenCarIcon,
  GreenFuraIcon,
  GreenPhoneIcon,
  LoadOulineIcon,
  PrimumIcon,
  QuestionBlueIcon,
  StoneIcon,
  TelegramIcon,
  WatsapIcon,
} from "@/assets/icons/icons";
import authStore from "@/store/auth.store";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { Box } from "@chakra-ui/react";

const statusConfig = {
  empty: { icon: <GreenCarIcon />, text: "Свободен", color: "inherit" },
  waiting_for_driver: {
    icon: <BluePendingIcon />,
    text: "Ожидание",
    color: "rgba(0, 122, 255, 1)",
  },
  our_cargo: {
    icon: <CheckBlueIcon />,
    text: "Занят",
    color: "rgba(0, 122, 255, 1)",
  },
  someone_cargo: {
    icon: <QuestionBlueIcon />,
    text: "Занят",
    color: "rgba(0, 122, 255, 1)",
  },
  broke_down: {
    icon: <CencelMapIcon />,
    text: "Сломалась",
    color: "rgba(126, 123, 134, 1)",
  },
};

const ContactLinks = ({ phone, cls }) => (
  <div className={cls.flex}>
    <a target="_blank" href={`https://t.me/${phone}`}>
      <TelegramIcon />
    </a>
    <a target="_blank" href={`https://wa.me/${phone}`}>
      <WatsapIcon />
    </a>
  </div>
);

const VehicleInfo = ({ trailerType, icon, cls }) => (
  <p className={cls.footerBox}>
    {icon} {trailerType ? trailerType : "Пока нет машины"}
  </p>
);

export const BalloonContent = ({ cls, carInfo, t }) => {
  const user_type = authStore?.userData?.user_status;
  const provision = carInfo?.order_data
    ? `our_cargo`
    : carInfo?.user?.provisions?.[0];
  const orderExists = Boolean(carInfo?.order_data);
  const status = statusConfig[provision] || statusConfig.empty;
  const phone = carInfo?.user?.phone;
  const trailerType = carInfo?.vehicles?.[0]?.trailer_type_id_data?.name;
  const VehicleIcon =
    provision === "empty" && !orderExists ? GreenFuraIcon : BlueFuraIcon;
  const PhoneIcon =
    provision === "empty" && !orderExists ? GreenPhoneIcon : BluePhoneIcon;

  return (
    <div id="balloon-content" className={cls.balloon_content_empty}>
      <div className={cls.wrap} style={{ height: "45px" }}>
        {status.icon}
        <span className={cls.balloonName} style={{ color: status.color }}>
          {t(status.text)}
        </span>
        <div className={cls.loadIconWrap}>
          <Box className={cls.conWrap}>
            <StoneIcon /> <span>{carInfo?.vehicles?.[0]?.capacity} т.</span>
          </Box>
          <Box className={cls.conWrap}>
            <LoadOulineIcon /> <span>{carInfo?.vehicles?.[0]?.height} м³</span>
          </Box>
        </div>
      </div>
      <p className={cls.balloon_fulName}>{carInfo?.user?.full_name}</p>
      <div className={cls.flex}>
        <PhoneIcon />
        {user_type?.[0] === `approved` ? (
          <>
            <a
              target="_blank"
              href={`https://t.me/${phone}`}
              className={cls.footerBoxLink}
            >
              {formatPhoneNumber(phone)}
            </a>
            <ContactLinks phone={phone} cls={cls} />
          </>
        ) : (
          <>
            <a
              target="_blank"
              // href={`https://t.me/${carInfo?.user?.phone}`}
              id="click"
              className={cls.footerBoxLinkPremium}
            >
              +998 XX XXX XX XX
            </a>
            <div className={cls.premium}>
              <PrimumIcon /> только Premium
            </div>
          </>
        )}
      </div>
      <VehicleInfo cls={cls} trailerType={trailerType} icon={<VehicleIcon />} />
    </div>
  );
};
