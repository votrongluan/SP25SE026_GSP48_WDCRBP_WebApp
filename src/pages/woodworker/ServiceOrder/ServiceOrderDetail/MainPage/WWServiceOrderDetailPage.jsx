import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  HStack,
  Spacer,
  Tabs,
  TabList,
  Tab,
  Flex,
  Icon,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useGetServiceOrderByIdQuery } from "../../../../../services/serviceOrderApi";
import { appColorTheme } from "../../../../../config/appconfig";
import useAuth from "../../../../../hooks/useAuth";
import ActionBar from "../ActionModal/ActionBar/ActionBar.jsx";
import { FiActivity, FiFile, FiFileText } from "react-icons/fi";
import GeneralInformationTab from "../Tab/GeneralInformationTab.jsx";
import ProcessTab from "../Tab/ProgressTab.jsx";
import ContractAndTransactionTab from "../Tab/ContractAndTransactionTab.jsx";

export default function WWServiceOrderDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetServiceOrderByIdQuery(id);
  const order = data?.data;
  const { auth } = useAuth();

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="200px">
        <Text>Đã có lỗi xảy ra khi tải thông tin đơn dịch vụ</Text>
      </Center>
    );
  }

  if (
    auth?.userId != order?.user?.userId &&
    auth?.wwId != order?.service?.wwDto?.woodworkerId
  ) {
    return (
      <Center h="200px">
        <Text>Không có quyền truy cập vào thông tin đơn dịch vụ này</Text>
      </Center>
    );
  }

  return (
    <Box>
      <HStack mb={6}>
        <Box>
          <Heading
            color={appColorTheme.brown_2}
            fontSize="2xl"
            fontFamily="Montserrat"
          >
            Chi tiết đơn #{order.orderId}
          </Heading>
          <HStack mt={1}>
            <Box
              top={5}
              right={5}
              bgColor={appColorTheme.brown_2}
              p={2}
              color="white"
              borderRadius="15px"
            >
              {order?.status || "Đang xử lý"}
            </Box>
            <Text fontSize="sm">Số lượng: {order.quantity} sản phẩm</Text>
          </HStack>
        </Box>

        <Spacer />

        <Box>
          {order?.role == "Woodworker" ? (
            <HStack spacing={4}>
              <ActionBar
                order={order}
                refetch={refetch}
                status={order?.status}
                feedback={order?.feedback}
              />
            </HStack>
          ) : (
            <>
              <Text>Chờ phản hồi từ khách hàng</Text>
            </>
          )}
        </Box>
      </HStack>

      <Box color="black">
        <Tabs variant="unstyled">
          <TabList
            overflowX="auto"
            display="flex"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            whiteSpace="nowrap"
          >
            {[
              { label: "Chung", icon: FiFileText },
              { label: "Tiến độ", icon: FiActivity },
              { label: "Hợp đồng & Giao dịch", icon: FiFile },
            ].map((tab, index) => (
              <Tab
                key={index}
                _selected={{
                  bgColor: "app_brown.0",
                }}
                borderBottom="2px solid"
                borderBottomColor="app_brown.1"
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
                mr={1}
              >
                <Flex align="center" gap={1}>
                  <Icon as={tab.icon} />
                  <Text>{tab.label}</Text>
                </Flex>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <GeneralInformationTab order={order} />
            </TabPanel>
            <TabPanel p={0}>
              <ProcessTab />
            </TabPanel>
            <TabPanel p={0}>
              <ContractAndTransactionTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
