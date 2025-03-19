import { BlueFuraIcon, BluePendingIcon, BluePhoneIcon, CencelMapIcon, CheckBlueIcon, GreenCarIcon, GreenFuraIcon, GreenPhoneIcon, LoadOulineIcon, QuestionBlueIcon, StoneIcon, TelegramIcon, WatsapIcon } from "@/assets/icons/icons";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { Box } from "@chakra-ui/react";

 export const BalloonContent = ({cls,carInfo,t}) => (
    <div id="balloon-content" className={cls.balloon_content_empty}>
      <div className={cls.wrap} style={{ height: "45px" }}>
        {carInfo?.user?.provisions?.[0] === "empty" ? (
          <>
            <GreenCarIcon />
            <span className={cls.balloonName}>Свободен</span>
          </>
        ) : carInfo?.user?.provisions?.[0] ===
          "waiting_for_driver" ? (
          <>
            <BluePendingIcon />
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Ожидание
            </span>
          </>
        ) : carInfo?.user?.provisions?.[0] === "our_cargo" ? (
          <>
            <CheckBlueIcon />
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Занят
            </span>
          </>
        ) : carInfo?.user?.provisions?.[0] === "someone_cargo" ? (
          <>
            <QuestionBlueIcon />
            <span
              style={{ color: "rgba(0, 122, 255, 1)" }}
              className={cls.balloonName}
            >
              Занят
            </span>
          </>
        ) : carInfo?.user?.provisions?.[0] === "broke_down" ? (
          <>
            <CencelMapIcon />
            <span
              style={{ color: "rgba(126, 123, 134, 1)" }}
              className={cls.balloonName}
            >
              {t(`Сломалась`)}
            </span>
          </>
        ) : (
          <>
            <GreenCarIcon />
            <span className={cls.balloonName}>Свободен</span>
          </>
        )}

        <div className={cls.loadIconWrap}>
          <Box className={cls.conWrap}>
            <StoneIcon />{" "}
            <span> {carInfo?.vehicles?.[0]?.capacity} т.</span>
          </Box>

          <Box
            className={cls.conWrap}
            gap={1}
            alignItems={"center"}
          >
            <LoadOulineIcon />
            <span>{carInfo?.vehicles?.[0]?.height} m3</span>
          </Box>
        </div>
      </div>
      <p className={cls.balloon_fulName}>
        {carInfo?.user?.full_name}
      </p>
      {carInfo?.user?.provisions?.[0] === "empty" ? (
        <>
          <div className={cls.flex}>
            <GreenPhoneIcon />
            <a
              target="_blank"
              href={`https://t.me/${carInfo?.user?.phone}`}
              id="click"
              className={cls.footerBoxLink}
            >
              {formatPhoneNumber(carInfo?.user?.phone)}
            </a>
            <div className={cls.flex}>
              <a
                target="_blank"
                href={`https://t.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <TelegramIcon />
              </a>
              <a
                target="_blank"
                href={`https://wa.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <WatsapIcon />
              </a>
            </div>
          </div>
          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              : t(`Пока нет машины`)}
          </p>
        </>
      ) : carInfo?.user?.provisions?.[0] ===
        "waiting_for_driver" ? (
        <>
          <div className={cls.flex}>
            <BluePhoneIcon />{" "}
            <a
              target="_blank"
              href={`https://t.me/${carInfo?.user?.phone}`}
              id="click"
              className={cls.footerBoxLink}
            >
              {formatPhoneNumber(carInfo?.user?.phone)}
            </a>
            <div className={cls.flex}>
              <a
                target="_blank"
                href={`https://t.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <TelegramIcon />
              </a>
              <a
                target="_blank"
                href={`https://wa.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <WatsapIcon />
              </a>
            </div>
          </div>

          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              : t(`Пока нет машины`)}
          </p>
        </>
      ) : carInfo?.user?.provisions?.[0] === "our_cargo" ? (
        <>
          <div className={cls.flex}>
            <BluePhoneIcon />
            <a
              target="_blank"
              href={`https://t.me/${carInfo?.user?.phone}`}
              id="click"
              className={cls.footerBoxLink}
            >
              {formatPhoneNumber(carInfo?.user?.phone)}
            </a>
            <div className={cls.flex}>
              <a
                target="_blank"
                href={`https://t.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <TelegramIcon />
              </a>
              <a
                target="_blank"
                href={`https://wa.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <WatsapIcon />
              </a>
            </div>
          </div>

          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              : t(`Пока нет машины`)}
          </p>
        </>
      ) : carInfo?.user?.provisions?.[0] === "someone_cargo" ? (
        <>
          <div className={cls.flex}>
            <BluePhoneIcon />
            <a
              target="_blank"
              href={`https://t.me/${carInfo?.user?.phone}`}
              id="click"
              className={cls.footerBoxLink}
            >
              {formatPhoneNumber(carInfo?.user?.phone)}
            </a>
            <div className={cls.flex}>
              <a
                target="_blank"
                href={`https://t.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <TelegramIcon />
              </a>
              <a
                target="_blank"
                href={`https://wa.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <WatsapIcon />
              </a>
            </div>
          </div>

          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              : t(`Пока нет машины`)}
          </p>
        </>
      ) : carInfo?.user?.provisions?.[0] === "broke_down" ? (
        <>
          <div className={cls.flex}>
            <BluePhoneIcon />{" "}
            <a
              target="_blank"
              href={`https://t.me/${carInfo?.user?.phone}`}
              id="click"
              className={cls.footerBoxLink}
            >
              {formatPhoneNumber(carInfo?.user?.phone)}
            </a>
            <div className={cls.flex}>
              <a
                target="_blank"
                href={`https://t.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <TelegramIcon />
              </a>
              <a
                target="_blank"
                href={`https://wa.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <WatsapIcon />
              </a>
            </div>
          </div>
          <p className={cls.footerBox}>
            <BlueFuraIcon />
            {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              : t(`Пока нет машины`)}
          </p>
        </>
      ) : (
        <>
          <div className={cls.flex}>
            <GreenPhoneIcon />
            <a
              target="_blank"
              href={`https://t.me/${carInfo?.user?.phone}`}
              id="click"
              className={cls.footerBoxLink}
            >
              {formatPhoneNumber(carInfo?.user?.phone)}
            </a>
            <div className={cls.flex}>
              <a
                target="_blank"
                href={`https://t.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <TelegramIcon />
              </a>
              <a
                target="_blank"
                href={`https://wa.me/${carInfo?.user?.phone}`}
                id="click"
                // className={cls.footerBoxLink}
              >
                <WatsapIcon />
              </a>
            </div>
          </div>

          <p className={cls.footerBox}>
            <GreenFuraIcon />
            {carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              ? carInfo?.vehicles?.[0]?.trailer_type_id_data?.name
              : t(`Пока нет машины`)}
          </p>
        </>
      )}
    </div>
  );