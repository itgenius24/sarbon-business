import { Box, Flex, Button, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import StarRating from "@/modules/UserManagement/components/StarRating/StarRating";
import { LoadingSpinner } from "@/components/LoadingSpinner";
// import { EmbeddedChatModule } from "./components/EmbeddedChatModule";
import cls from "./style.module.scss";

export const CargoToVehicleView = ({ data, isLoading, distance }) => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(data.map(item => item.guid));
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
          isChecked={selectedItems.includes(item.guid)}
          onChange={(e) => handleSelectItem(item.guid, e.target.checked)}
        />
      ),
    },
    {
      title: t("Груз"),
      key: "cargo",
      width: 25,
      render: (item) => (
        <Box>
          <Box fontWeight="600" fontSize="14px" mb="4px">
            {item.from_name} → {item.to_name}
          </Box>
          <Box fontSize="12px" color="gray.600">
            {item.weight}т | {item.volume}м³
          </Box>
          <Box fontSize="12px" color="gray.600">
            №{item.number_of_order}
          </Box>
        </Box>
      ),
    },
    {
      title: t("Доступные транспорты"),
      key: "vehicles",
      width: 30,
      render: (item) => (
        <Box>
          {item.nearbyVehicles?.length > 0 ? (
            <Box>
              <Box fontSize="12px" color="blue.600" mb="8px">
                {item.nearbyVehicles.length} {t("транспорт(ов) в радиусе")} {distance}км
              </Box>
              {item.nearbyVehicles.slice(0, 3).map((vehicle, idx) => (
                <Flex key={idx} alignItems="center" mb="4px" gap="8px">
                  <Box fontSize="12px" fontWeight="500">
                    {vehicle.user?.full_name}
                  </Box>
                  <Box fontSize="11px" color="gray.600">
                    {vehicle.vehicles?.[0]?.car_number}
                  </Box>
                  <StarRating 
                    rating={vehicle.user?.rating || 0} 
                    comment={vehicle.user?.reviews_count || 0}
                  />
                </Flex>
              ))}
              {item.nearbyVehicles.length > 3 && (
                <Box fontSize="11px" color="gray.500">
                  +{item.nearbyVehicles.length - 3} {t("еще")}
                </Box>
              )}
            </Box>
          ) : (
            <Box fontSize="12px" color="gray.500">
              {t("Нет доступных транспортов")}
            </Box>
          )}
        </Box>
      ),
    },
    {
      title: t("Статус"),
      key: "status",
      width: 15,
      render: (item) => {
        const hasResponded = item.nearbyVehicles?.some(v => 
          v.provisions?.includes('approve_from_driver') || 
          v.provisions?.includes('new_proposal_from_director')
        );
        
        return (
          <Box
            px="8px"
            py="4px"
            borderRadius="4px"
            fontSize="12px"
            fontWeight="500"
            bg={hasResponded ? "green.100" : "gray.100"}
            color={hasResponded ? "green.800" : "gray.600"}
          >
            {hasResponded ? t("Есть отклики") : t("Ожидание")}
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
            isDisabled={!item.nearbyVehicles?.length}
          >
            {t("Отправить предложение")}
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
              console.log("Bulk proposal for:", selectedItems);
            }}
          >
            {t("Отправить предложения")}
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

      {/* {chatOpen && (
        <EmbeddedChatModule
          isOpen={chatOpen}
          onClose={closeChat}
          target={chatTarget}
        />
      )} */}
    </Box>
  );
};
