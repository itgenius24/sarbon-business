import { Box, Flex, Button, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import StarRating from "@/modules/UserManagement/components/StarRating/StarRating";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmbeddedChatModule } from "./components/EmbeddedChatModule";
import cls from "./style.module.scss";

export const VehicleToCargoView = ({ data, isLoading, distance }) => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(data.map(item => item.user?.guid));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const openChat = (target) => {
    setChatTarget(target);
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
    setChatTarget(null);
  };

  const columns = [
    {
      title: (
        <Checkbox
          isChecked={selectedItems.length === data.length && data.length > 0}
          isIndeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      key: "select",
      width: 5,
      render: (item) => (
        <Checkbox
          isChecked={selectedItems.includes(item.user?.guid)}
          onChange={(e) => handleSelectItem(item.user?.guid, e.target.checked)}
        />
      ),
    },
    {
      title: t("Водитель/Транспорт"),
      key: "driver",
      width: 25,
      render: (item) => (
        <Box>
          <Box fontWeight="600" fontSize="14px" mb="4px">
            {item.user?.full_name}
          </Box>
          <Box fontSize="12px" color="gray.600" mb="2px">
            {item.user?.phone}
          </Box>
          <Box fontSize="12px" color="gray.600">
            {item.vehicles?.[0]?.car_number} | {item.vehicles?.[0]?.trailer_type_id_data?.name}
          </Box>
          <StarRating 
            rating={item.user?.rating || 0} 
            comment={item.user?.reviews_count || 0}
          />
        </Box>
      ),
    },
    {
      title: t("Доступные грузы"),
      key: "cargo",
      width: 30,
      render: (item) => (
        <Box>
          {item.nearbyCargo?.length > 0 ? (
            <Box>
              <Box fontSize="12px" color="blue.600" mb="8px">
                {item.nearbyCargo.length} {t("груз(ов) в радиусе")} {distance}км
              </Box>
              {item.nearbyCargo.slice(0, 3).map((cargo, idx) => (
                <Box key={idx} mb="4px">
                  <Box fontSize="12px" fontWeight="500">
                    {cargo.from_name} → {cargo.to_name}
                  </Box>
                  <Box fontSize="11px" color="gray.600">
                    {cargo.weight}т | {cargo.volume}м³ | №{cargo.number_of_order}
                  </Box>
                </Box>
              ))}
              {item.nearbyCargo.length > 3 && (
                <Box fontSize="11px" color="gray.500">
                  +{item.nearbyCargo.length - 3} {t("еще")}
                </Box>
              )}
            </Box>
          ) : (
            <Box fontSize="12px" color="gray.500">
              {t("Нет доступных грузов")}
            </Box>
          )}
        </Box>
      ),
    },
    {
      title: t("Статус водителя"),
      key: "status",
      width: 15,
      render: (item) => {
        const status = item.user?.provisions?.[0];
        const statusMap = {
          empty: { text: t("Свободен"), color: "green" },
          our_cargo: { text: t("Наш груз"), color: "blue" },
          someone_cargo: { text: t("Чужой груз"), color: "orange" },
          broke_down: { text: t("Поломка"), color: "red" },
          waiting_for_driver: { text: t("Ожидание"), color: "yellow" },
        };
        
        const statusInfo = statusMap[status] || { text: t("Неизвестно"), color: "gray" };
        
        return (
          <Box
            px="8px"
            py="4px"
            borderRadius="4px"
            fontSize="12px"
            fontWeight="500"
            bg={`${statusInfo.color}.100`}
            color={`${statusInfo.color}.800`}
          >
            {statusInfo.text}
          </Box>
        );
      },
    },
    {
      title: t("Чат"),
      key: "chat",
      width: 10,
      render: (item) => (
        <Button
          size="sm"
          variant="outline"
          colorScheme="blue"
          onClick={() => openChat(item)}
        >
          {t("Чат")}
        </Button>
      ),
    },
    {
      title: t("Действия"),
      key: "actions",
      width: 15,
      render: (item) => (
        <Flex gap="8px">
          <Button
            size="sm"
            colorScheme="blue"
            isDisabled={!item.nearbyCargo?.length}
          >
            {t("Назначить груз")}
          </Button>
        </Flex>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      {selectedItems.length > 0 && (
        <Flex mb="16px" gap="12px" alignItems="center">
          <Box fontSize="14px" color="gray.600">
            {t("Выбрано")}: {selectedItems.length}
          </Box>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => {
              console.log("Bulk assignment for:", selectedItems);
            }}
          >
            {t("Массовое назначение")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedItems([])}
          >
            {t("Очистить")}
          </Button>
        </Flex>
      )}

      <SarbonTable
        variant="table"
        columns={columns}
        data={data || []}
        isSticky={true}
      />

      {chatOpen && (
        <EmbeddedChatModule
          isOpen={chatOpen}
          onClose={closeChat}
          target={chatTarget}
        />
      )}
    </Box>
  );
};
