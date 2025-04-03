import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Stack,
  Text,
  Spinner,
  Center,
  Code,
} from "@chakra-ui/react";
import { useGetServiceOrderByIdQuery } from "../../../../../services/serviceOrderApi";
import { appColorTheme } from "../../../../../config/appconfig";
import useAuth from "../../../../../hooks/useAuth";
import CustomizeServiceOrderDetailPage from "../CustomizeService/DetailPage/CustomizeServiceOrderDetailPage";

export default function WWServiceOrderDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetServiceOrderByIdQuery(id);
  const serviceOrder = data?.data;
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
    auth?.userId != serviceOrder?.user?.userId &&
    auth?.wwId != serviceOrder?.service?.wwDto?.woodworkerId
  ) {
    return (
      <Center h="200px">
        <Text>Không có quyền truy cập vào thông tin đơn dịch vụ này</Text>
      </Center>
    );
  }

  if (serviceOrder?.service?.service?.serviceName === "Customization") {
    return (
      <CustomizeServiceOrderDetailPage refetch={refetch} order={serviceOrder} />
    );
  }

  return (
    <Stack spacing={6}>
      <Heading
        color={appColorTheme.brown_2}
        fontSize="2xl"
        fontFamily="Montserrat"
      >
        Chi tiết đơn dịch vụ
      </Heading>

      {serviceOrder && (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stack spacing={4}>
            <Box overflowX="auto">
              <Code p={4} borderRadius="md" variant="subtle">
                <pre>{JSON.stringify(serviceOrder, null, 2)}</pre>
              </Code>
            </Box>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
