import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  useLogistikaGpsTrackingFilterDriver,
  useGetCargoPost,
  useOfferFromCustomerMutation,
  useLogistikaGpsTrackingFilterDriverPred,
} from "@/services/api";
import { useToast } from "@chakra-ui/react";
import authStore from "@/store/auth.store";

export const useCargoVehicleAnalysisProps = () => {
  const { t } = useTranslation();
  const toast = useToast();
  
  const [distance, setDistance] = useState(500);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCargo, setSelectedCargo] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [cargoData, setCargoData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);

  const { mutate: getCargoData, isLoading: cargoLoading } = useGetCargoPost({
    onSuccess: (res) => {
      setCargoData(res?.response || []);
    },
    onError: (error) => {
      toast({
        title: t("Ошибка"),
        description: t("Не удалось загрузить данные грузов"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const { mutate: getVehicleData, isLoading: vehicleLoading } = 
    useLogistikaGpsTrackingFilterDriver({
      onSuccess: (res) => {
        setVehicleData(res?.response || []);
      },
      onError: (error) => {
        toast({
          title: t("Ошибка"),
          description: t("Не удалось загрузить данные транспорта"),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  const { mutate: sendBulkProposal, isLoading: proposalLoading } = 
    useOfferFromCustomerMutation({
      onSuccess: () => {
        toast({
          title: t("Успешно"),
          description: t("Предложения отправлены"),
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setSelectedCargo([]);
        setSelectedVehicles([]);
      },
      onError: (error) => {
        toast({
          title: t("Ошибка"),
          description: t("Не удалось отправить предложения"),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  useEffect(() => {
    loadCargoData();
    loadVehicleData();
  }, [distance]);

  const loadCargoData = () => {
    getCargoData({
      data: {
        object_data: {
          distance: distance * 1000,
          limit: 100,
          page: 1,
          user_id: authStore.userData?.guid,
        },
      },
    });
  };

  const loadVehicleData = () => {
    getVehicleData({
      data: {
        object_data: {
          distance: distance * 1000,
          limit: 100,
          page: 1,
          dispatcher_id: authStore.userData?.guid,
        },
      },
    });
  };

  const cargoToVehicleData = useMemo(() => {
    return cargoData.map((cargo) => ({
      ...cargo,
      nearbyVehicles: vehicleData.filter((vehicle) => {
        const cargoLat = parseFloat(cargo.lat);
        const cargoLng = parseFloat(cargo.long);
        const vehicleLat = parseFloat(vehicle.lat);
        const vehicleLng = parseFloat(vehicle.long);
        
        if (!cargoLat || !cargoLng || !vehicleLat || !vehicleLng) return false;
        
        const distance = calculateDistance(cargoLat, cargoLng, vehicleLat, vehicleLng);
        return distance <= distance;
      }).sort((a, b) => {
        const aResponded = a.provisions?.includes('approve_from_driver') || 
                          a.provisions?.includes('new_proposal_from_director');
        const bResponded = b.provisions?.includes('approve_from_driver') || 
                          b.provisions?.includes('new_proposal_from_director');
        
        if (aResponded && !bResponded) return -1;
        if (!aResponded && bResponded) return 1;
        return 0;
      }),
    }));
  }, [cargoData, vehicleData, distance]);

  const vehicleToCargoData = useMemo(() => {
    return vehicleData.map((vehicle) => ({
      ...vehicle,
      nearbyCargo: cargoData.filter((cargo) => {
        const cargoLat = parseFloat(cargo.lat);
        const cargoLng = parseFloat(cargo.long);
        const vehicleLat = parseFloat(vehicle.lat);
        const vehicleLng = parseFloat(vehicle.long);
        
        if (!cargoLat || !cargoLng || !vehicleLat || !vehicleLng) return false;
        
        const distance = calculateDistance(cargoLat, cargoLng, vehicleLat, vehicleLng);
        return distance <= distance;
      }).sort((a, b) => {
        const aResponded = a.provisions?.includes('approve_by_customer') || 
                          a.provisions?.includes('performed');
        const bResponded = b.provisions?.includes('approve_by_customer') || 
                          b.provisions?.includes('performed');
        
        if (aResponded && !bResponded) return -1;
        if (!aResponded && bResponded) return 1;
        return 0;
      }),
    }));
  }, [cargoData, vehicleData, distance]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleBulkProposal = (cargoIds, vehicleIds) => {
    sendBulkProposal({
      data: {
        object_data: {
          cargo_ids: cargoIds,
          vehicle_ids: vehicleIds,
          dispatcher_id: authStore.userData?.guid,
        },
      },
    });
  };

  const openChat = (target) => {
    setChatTarget(target);
    setChatModalOpen(true);
  };

  const closeChat = () => {
    setChatModalOpen(false);
    setChatTarget(null);
  };

  return {
    t,
    distance,
    setDistance,
    activeTab,
    setActiveTab,
    selectedCargo,
    setSelectedCargo,
    selectedVehicles,
    setSelectedVehicles,
    cargoToVehicleData,
    vehicleToCargoData,
    isLoading: cargoLoading || vehicleLoading,
    proposalLoading,
    handleBulkProposal,
    chatModalOpen,
    chatTarget,
    openChat,
    closeChat,
    loadCargoData,
    loadVehicleData,
  };
};
