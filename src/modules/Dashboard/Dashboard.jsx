import { Container } from "@/components/Container";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { useDashboard } from "./useDashboard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import CTable from "@/components/CTable";
import SlotCounter from "react-slot-counter";
import { DatePicker } from "@/components/DatePicker";
import cls from "./style.module.scss";
import { EditIconTable, ExelIcon } from "@/assets/icons/icons";
import { stringsToarray } from "@/utils/stringsToarray";
import SimpleLoader from "@/components/Loaders/SimpleLoader";
import { formatNumber } from "@/utils/formatNumber";
import { ContainerAnalitik } from "@/components/ContainerAnalitik/Container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ locale }) => {
  const {
    topStatis,
    topStatis2,
    chartData,
    options,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    columns1,
    columns2,
    columns3,
    columns4,
    columns5,
    data,
    isLoading,
    setStatus,
    filterDataLoadin,
    date,
    setDate,
    setDate2,
    setCurrentPage,
    currentPage,
    getExcelFileFn,
    isLoadingExe,
    firmData,
    isOpen,
    onClose,
    firmId,
    editFn,
  } = useDashboard(locale);

  return (
    <>
      <ContainerAnalitik my={`40px`}>
        <Flex flexDirection={`column`} rowGap={`30px`}>
          <Flex gap={`20px`}>
            <Flex
              flexWrap={`wrap`}
              width={`35%`}
              gap={`20px`}
              justifyContent={`space-between`}
            >
              {topStatis2.map((item) => (
                <Box
                  width={`100%`}
                  borderRadius={`12px`}
                  backgroundColor={item.color}
                  key={item.id}
                  border={`1px solid ${item.bg}`}
                  p={`20px 16px`}
                  className={cls.card}
                >
                  {isLoading ? (
                    <Spinner color="brand.500" size="md" />
                  ) : (
                    <Heading
                      color={`black`}
                      fontSize={`30px`}
                      lineHeight={`30px`}
                      fontWeight={`600`}
                    >
                      <SlotCounter value={item.total} />
                    </Heading>
                  )}

                  <Heading
                    mt={`12px`}
                    color={`black`}
                    fontSize={`18px`}
                    lineHeight={`30px`}
                    fontWeight={`400`}
                  >
                    {item.deck}
                  </Heading>
                </Box>
              ))}
            </Flex>
            <Flex
              borderRadius={`12px`}
              justifyContent={`center`}
              width={`100%`}
              background={`white`}
              padding={`16px 20px`}
            >
              <Box width={`100%`}>
                <Flex
                  gap={`20px`}
                  alignItems={`center`}
                  mb={`24px`}
                  width={`100%`}
                >
                  <Box width={`30%`}>
                    <DatePicker
                      onChange={() => {
                        setDate(``), setDate2([]);
                      }}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      range
                      startDate={startDate}
                      setStartDate={setStartDate}
                    />
                  </Box>
                  <Flex
                    gap={`16px`}
                    alignItems={`center]`}
                    justifyContent={`flex-end`}
                  >
                    <p
                      className={
                        date === `weekly` ? cls.activeMonth : cls.month
                      }
                      onClick={() => setDate(`weekly`)}
                    >
                      Неделя
                    </p>
                    <p
                      className={
                        date === `monthly` ? cls.activeMonth : cls.month
                      }
                      onClick={() => setDate(`monthly`)}
                    >
                      Месяц
                    </p>
                    <p className={cls.clear} onClick={() => setDate(`clear`)}>
                      Очистить фильтр
                    </p>
                  </Flex>
                </Flex>
                <Flex justifyContent={`center`}>
                  <Box width={`100%`} h={`100%`}>
                    <Bar
                      minBarLength={`4000px`}
                      options={options}
                      data={chartData}
                      style={{
                        background: "white",
                        width: `100%`,
                        height: `500px`,
                      }}
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex
              flexWrap={`wrap`}
              width={`35%`}
              gap={`20px`}
              justifyContent={`space-between`}
            >
              {topStatis.map((item) => (
                <Box
                  width={`100%`}
                  borderRadius={`12px`}
                  backgroundColor={item.color}
                  key={item.id}
                  border={`1px solid ${item.bg}`}
                  p={`20px 16px`}
                  className={cls.card}
                >
                  {isLoading ? (
                    <Spinner color="brand.500" size="md" />
                  ) : (
                    <Heading
                      color={`black`}
                      fontSize={`30px`}
                      lineHeight={`30px`}
                      fontWeight={`600`}
                    >
                      <SlotCounter value={item.total} />
                    </Heading>
                  )}

                  <Heading
                    mt={`12px`}
                    color={`black`}
                    fontSize={`18px`}
                    lineHeight={`30px`}
                    fontWeight={`400`}
                  >
                    {item.deck}
                  </Heading>
                </Box>
              ))}
            </Flex>
          </Flex>

          <Box
            padding={`16px`}
            position={`relative`}
            borderRadius={`12px`}
            backgroundColor={`white`}
          >
            {filterDataLoadin && <SimpleLoader />}
            <Tabs
              onChange={(el) => {
                setStatus(el), setCurrentPage(1);
              }}
              variant="unstyled"
            >
              <Flex width={`100%`} justifyContent={`space-between`}>
                <TabList>
                  <Tab> Диспетчеры</Tab>
                  <Tab> Водитель</Tab>
                  <Tab> Перевозчик</Tab>
                  <Tab> Транспорт</Tab>
                  <Tab> Груз</Tab>
                </TabList>
                <Button
                  width={`fit-content`}
                  isLoading={isLoadingExe}
                  onClick={getExcelFileFn}
                  // isDisabled={true}
                  style={{
                    background: `rgba(255, 255, 255, 1)`,
                    color: `black`,
                    border: `1px solid rgba(0, 122, 255, 1)`,
                  }}
                  leftIcon={<ExelIcon />}
                >
                  Экспорт в Excel
                </Button>
              </Flex>
              <TabIndicator
                mt="-1.5px"
                height="3px"
                bg="rgba(0, 51, 153, 1)"
                borderRadius="1px"
              />

              <TabPanels>
                <TabPanel>
                  <CTable
                    isLoading={filterDataLoadin}
                    columns={columns5}
                    data={data.response}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </TabPanel>
                <TabPanel>
                  <CTable
                    isLoading={filterDataLoadin}
                    columns={columns2}
                    data={data.response}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </TabPanel>
                <TabPanel>
                  <CTable
                    isLoading={filterDataLoadin}
                    columns={columns1}
                    data={data.response}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </TabPanel>
                <TabPanel>
                  <CTable
                    isLoading={filterDataLoadin}
                    columns={columns3}
                    data={data.response}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </TabPanel>
                <TabPanel>
                  <CTable
                    isLoading={filterDataLoadin}
                    columns={columns4}
                    data={data.response}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
        <Modal
          size={`xl`}
          // isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          scrollBehavior={`inside`}
        >
          <ModalOverlay />
          <ModalContent padding={`5px`}>
            <ModalHeader
              borderBottomWidth="1px"
              borderColor={`rgba(219, 216, 227, 1)`}
              padding={`10px 26px`}
            >
              <Box>
                <p style={{ lineHeight: `32px` }}>Перевозчик</p>
                <Flex gap={`10px`} alignItems={`center`}>
                  <p className={cls.titleModal}>{firmId?.your_id}</p>
                  <Flex
                    onClick={() => editFn(firmId)}
                    cursor={`pointer`}
                    gap={`4px`}
                    alignItems={`center`}
                  >
                    <EditIconTable />
                    <span className={cls.linkModal}>Редактировать</span>
                  </Flex>
                </Flex>
              </Box>
            </ModalHeader>
            <ModalCloseButton top={`23px`} />

            <ModalBody>
              <Flex flexDirection={`column`} width={`100%`} rowGap={`24px`}>
                <Box width={`100%`}>
                  <p className={cls.cardTitle}>Информация о директоре</p>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>ФИО руководителя</p>
                    <p className={cls.boxDesc}>
                      {firmData?.information_of_director}
                    </p>
                  </Flex>
                </Box>
                <Box width={`100%`}>
                  <p className={cls.cardTitle}>Контактные данные</p>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Email</p>
                    <p className={cls.boxDesc}>{firmData?.email}</p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Номер телефона</p>
                    <p className={cls.boxDesc}>{firmData?.phone_number}</p>
                  </Flex>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Код СОАТО</p>
                    <p className={cls.boxDesc}>{firmData?.soato}</p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Адрес</p>
                    <p className={cls.boxDesc}>{firmData?.address}</p>
                  </Flex>
                </Box>
                <Box width={`100%`}>
                  <p className={cls.cardTitle}>Общие сведение</p>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>ИНН</p>
                    <p className={cls.boxDesc}>{firmData?.tin}</p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Регистрирующий орган</p>
                    <p className={cls.boxDesc}>
                      {firmData?.registration_authority}
                    </p>
                  </Flex>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>
                      Дата государственной регистрации
                    </p>
                    <p className={cls.boxDesc}>{firmData?.data_register}</p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Номер регистрации в реестре</p>
                    <p className={cls.boxDesc}>{firmData?.register_number}</p>
                  </Flex>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Полное наименование</p>
                    <p className={cls.boxDesc}>
                      {firmData?.company_name}
                      {/* {` ${firmData?.org_and_legal_form}`} */}
                    </p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Сокращенное наименование</p>
                    <p className={cls.boxDesc}>{firmData?.company_name}</p>
                  </Flex>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>
                      Организационно-правовая форма (ОПФ)
                    </p>
                    <p className={cls.boxDesc}>
                      {firmData?.org_and_legal_form}
                    </p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Форма собственности (ФС)</p>
                    <p className={cls.boxDesc}>{firmData?.form_of_ownership}</p>
                  </Flex>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>
                      Код ОКЭД (Вид(ы) осуществляемой деятельности)
                    </p>
                    <p className={cls.boxDesc}>{firmData?.oked}</p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Код СООГУ</p>
                    <p className={cls.boxDesc}>{firmData?.soogu}</p>
                  </Flex>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>
                      Принадлежность к субъектам малого
                    </p>
                    <p className={cls.boxDesc}>{firmData?.business_entity}</p>
                  </Flex>
                  <Flex
                    className={cls.outlineBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>
                      Состояние деятельности предприятия
                    </p>
                    <p className={cls.boxDesc}>
                      {firmData?.status_of_enterprise}
                    </p>
                  </Flex>
                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>Уставный фонд</p>
                    <p className={cls.boxDesc}>
                      {firmData?.capital && formatNumber(firmData?.capital)}{" "}
                      {` ${firmData?.currency || ``}`}
                    </p>
                  </Flex>
                </Box>
                <Box width={`100%`}>
                  <p className={cls.cardTitle}>
                    Информация об учредителях и их доле в уставном фонде
                  </p>

                  <Flex
                    className={cls.primaryBox}
                    justifyContent={`space-between`}
                  >
                    <p className={cls.boxTitle}>{firmData?.director_procent}</p>
                  </Flex>

                  {/* <Flex
                  className={cls.outlineBox}
                  justifyContent={`space-between`}
                >
                  <p className={cls.boxTitle}>Код СОАТО</p>
                  <p className={cls.boxDesc}>{firmData?.soato}</p>
                </Flex> */}
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* <Button width={`fit-content`} onClick={notificationFn}>
        Notification
      </Button> */}
      </ContainerAnalitik>
    </>
  );
};

export default Dashboard;
