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
  QuestionBlueIcon,
  StoneIcon,
  TelegramIcon,
  WatsapIcon,
} from "@/assets/icons/icons";
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

const ContactLinks = ({ phone,cls }) => (
  <div className={cls.flex}>
    <a target="_blank" href={`https://t.me/${phone}`}>
      <TelegramIcon />
    </a>
    <a target="_blank" href={`https://wa.me/${phone}`}>
      <WatsapIcon />
    </a>
  </div>
);

const VehicleInfo = ({ trailerType, icon,cls }) => (
  <p className={cls.footerBox}>
    {icon} {trailerType ? trailerType : "Пока нет машины"}
  </p>
);

export const BalloonContent = ({ cls, carInfo, t }) => {
  const provision =  carInfo?.user?.provisions?.[0] || "empty";
  const orderExists = Boolean(carInfo?.user?.provisions?.[0] === `our_cargo`);
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
        <a
          target="_blank"
          href={`https://t.me/${phone}`}
          className={cls.footerBoxLink}
        >
          {formatPhoneNumber(phone)}
        </a>
        <ContactLinks phone={phone} cls={cls} />
      </div>
      <VehicleInfo cls={cls} trailerType={trailerType} icon={<VehicleIcon />} />
    </div>
  );
};
