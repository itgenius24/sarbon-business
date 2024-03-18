import cls from "./styles.module.scss";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast
} from "@chakra-ui/react";
import { DataList } from "@/components/DataList";
import { DriverReviewStar } from "@/assets/icons/icons";
import authStore from "@/store/auth.store";
import { useGetUserCargo, useOfferFromCustomerMutation } from "@/services/api";
import { useState } from "react";

export const SingleCar = ({ carInfo }) => {

  const userId = authStore.userData.id;

  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const newList = [
    {
      title: "Транспорт",
      value: "",
    },
    {
      title: "Разрешение:",
      value: address[carInfo?.users_id_data?.adr],
    },
    {
      title: "Детали:",
      value: `${carInfo?.capacity}т, ${carInfo?.volume} м3`,
    },
    {
      title: "Рейтинг водителя:",
      value: carInfo?.users_id_data?.rating,
    },
  ];

  const getAllUserCargoParams = {
    data: JSON.stringify({
      users_id: userId,
      with_relations: true,
      order_status: "active"
    })
  };

  const getAllUserCargo = useGetUserCargo(
    getAllUserCargoParams,
    { enabled: !!userId && isOpen }
  );

  const offerFromCustomer = useOfferFromCustomerMutation({
    onSuccess() {
      toast({
        title: "Ваше предложение отправлено",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      setIsOpen(false);
    }
  });

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleOffer(id) {
    offerFromCustomer.mutate({
      // ...body,
      data: {
        object_data: {
          user_id: authStore.userData.id,
          guid: id
        }
      }
    });
  }

  console.log(getAllUserCargo.data?.response);

  return (
    <div className={cls.loadsCard}>
      <div className={cls.cardTop}>
        <div className={cls.cardTopContent}>
          <h2 className={cls.address}>
            <span className={cls.addressText}>
              {carInfo?.address_id_data?.name} {carInfo?.address_id_2_data?.name}
            </span>
          </h2>
          {/* <span className={cls.distance}>724 км</span> */}
        </div>
      </div>
      <Box borderBottom="1px solid" borderColor="brand.200">
        <DataList list={newList} />
      </Box>
      <div className={cls.cardBottom}>
        <Button onClick={handleOpenModal} bgColor="#E0F2FE" width="278px" color="primary">Предложить груз</Button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="sm">Выберите груз</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p="20px">
            {
              getAllUserCargo.data?.response?.map((item) => {
                return <Card
                  onClick={() => handleOffer(item.guid)}
                  key={item.guid}
                  mb="20px"
                  borderRadius="20px"
                  boxShadow="none"
                  border="1px solid #EAECF0"
                  cursor="pointer"
                >
                  <CardBody p="20px">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        {item?.address_id_data?.name}
                        {"->"}
                        {item?.address_id_2_data?.name}
                      </Box>
                      <Box as="span" fontSize="14px" color="brand.400">{item?.number_of_order}</Box>
                    </Box>
                  </CardBody>
                </Card>;
              })
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

const address = {
  adr_1: "adr-1",
  adr_2: "adr-2",
  adr_3: "adr-3",
  adr_4: "adr-4",
  adr_5: "adr-5",
  adr_6: "adr-6",
};

