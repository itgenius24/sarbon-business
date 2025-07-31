import {
  NoteIconProfile,
  RejectIcon,
  SuccessIconProfile,
} from "@/assets/icons/icons";
import { Box, Flex } from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import React, { useMemo } from "react";
import cls from "./style.module.scss";

// Move status configuration outside component to prevent recreation
const STATUS_CONFIG = {
  great: {
    text: "Отлично",
    icon: <SuccessIconProfile />,
    color: "rgba(38, 189, 73, 1)"
  },
  bad: {
    text: "Плохо",
    icon: <RejectIcon />,
    color: "rgba(236, 26, 26, 1)"
  },
  note: {
    text: "Заметка",
    icon: <NoteIconProfile />,
    color: "rgba(26, 135, 236, 1)"
  },
};

/**
 * StatusComponent displays a status indicator with icon, text, and optional date
 * @param {Object} props - Component props
 * @param {string} props.status - Status type: "great", "bad", or "note" (default: "bad")
 * @param {Date|string} props.date - Optional date to display below status text
 * @returns {JSX.Element} Status component with icon, text, and date
 * @example
 * <StatusComponent status="great" date={new Date()} />
 * <StatusComponent status="bad" />
 * <StatusComponent status="note" date="2023-12-25" />
 */
const StatusComponent = React.memo(({ status = "bad", date }) => {
  const currentStatus = STATUS_CONFIG[status];

  // Memoize formatted date to prevent unnecessary recalculations
  const formattedDate = useMemo(() => {
    if (!date) return null;
    try {
      return format(new Date(date), "dd MMMM yyyy", { locale: ru });
    } catch (error) {
      console.warn("Invalid date provided to StatusComponent:", date);
      return null;
    }
  }, [date]);

  if (!currentStatus) {
    console.warn(`Unknown status provided to StatusComponent: ${status}`);
    return null;
  }

  return (
    <Flex
      gap="14px"
      alignItems="center"
      role="status"
      aria-label={`Статус: ${currentStatus.text}${formattedDate ? `, дата: ${formattedDate}` : ''}`}
    >
      <Box
        aria-label={`Иконка статуса: ${currentStatus.text}`}
        role="img"
      >
        {currentStatus.icon}
      </Box>
      <Box>
        <p
          className={cls.text}
          style={{ color: currentStatus.color }}
          aria-label={`Статус: ${currentStatus.text}`}
        >
          {currentStatus.text}
        </p>
        {formattedDate && (
          <p
            className={cls.data}
            aria-label={`Дата: ${formattedDate}`}
          >
            {formattedDate}
          </p>
        )}
      </Box>
    </Flex>
  );
});

StatusComponent.displayName = "StatusComponent";

export default StatusComponent;
