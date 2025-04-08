import { useEffect } from "react";
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import {
  formatDateTimeString,
  formatDateTimeToVietnamese,
} from "../../../../../utils/utils.js";
import CustomizationProductList from "./CustomizationProductList.jsx";
import StarRating from "../../../../../components/Utility/StarRating.jsx";
import { useGetShipmentsByServiceOrderIdQuery } from "../../../../../services/shipmentApi.js";
import { getServiceTypeLabel } from "../../../../../config/appconfig.js";
import PersonalizationProductList from "./PersonalizationProductList.jsx";

export default function GeneralInformationTab({
  order,
  activeTabIndex,
  isActive,
}) {
  const { data: shipmentData, refetch: refetchShipment } =
    useGetShipmentsByServiceOrderIdQuery(order?.orderId, {
      skip: !order?.orderId,
    });

  // Refetch data when tab becomes active
  useEffect(() => {
    if (isActive && order?.orderId) {
      refetchShipment();
    }
  }, [isActive, order?.orderId, refetchShipment]);

  const serviceName = order?.service?.service?.serviceName;

  return (
    <Box>
      {serviceName == "Personalization" && (
        <PersonalizationProductList
          products={order?.requestedProduct}
          totalAmount={order?.totalAmount}
        />
      )}
      {serviceName == "Customization" && (
        <CustomizationProductList
          products={order?.requestedProduct}
          totalAmount={order?.totalAmount}
        />
      )}

      <SimpleGrid
        mt={6}
        columns={{
          base: 1,
          xl: 2,
        }}
        spacing={6}
      >
        <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
          <Box>
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={6}>
              Thông tin đơn hàng
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Mã đơn hàng:</Text>
                <Text>{order?.orderId || "Chưa cập nhật"}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Loại dịch vụ:</Text>
                <Text>
                  {getServiceTypeLabel(order?.service?.service?.serviceName)}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày đặt:</Text>
                <Text>
                  {order?.requestedProduct?.[0]?.createdAt
                    ? formatDateTimeString(
                        new Date(order.requestedProduct[0].createdAt)
                      )
                    : "Chưa cập nhật"}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số lượng sản phẩm:</Text>
                <Text>{order?.quantity || "Chưa cập nhật"}</Text>
              </HStack>

              <Box>
                <Text fontWeight="bold">Ghi chú:</Text>
                <Text>{order?.description || "Không có ghi chú"}</Text>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
          <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
            Thông tin lịch hẹn tư vấn
          </Heading>

          <Stack spacing={4}>
            {order?.consultantAppointment ? (
              <>
                <HStack>
                  <Text fontWeight="bold">Hình thức:</Text>
                  <Text>{order.consultantAppointment.form}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Địa điểm:</Text>
                  <Text>{order.consultantAppointment.meetAddress}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Ngày giờ hẹn:</Text>
                  <Text>
                    {formatDateTimeToVietnamese(
                      new Date(order.consultantAppointment.dateTime)
                    )}
                  </Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Mô tả:</Text>
                  <Text>
                    {order.consultantAppointment.content || "Không có mô tả"}
                  </Text>
                </HStack>
              </>
            ) : (
              <Text color="gray.500">Chưa có lịch hẹn tư vấn</Text>
            )}
          </Stack>
        </Box>
      </SimpleGrid>

      <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px" mt={6}>
        <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
          Thông tin khách hàng & Đánh giá
        </Heading>

        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={10}>
          {/* Thông tin xưởng mộc */}
          <Box>
            <Stack spacing={3}>
              <Text>
                <b>Tên khách hàng:</b>{" "}
                {order?.user?.username || "Chưa cập nhật"}
              </Text>

              <Text>
                <b>Địa chỉ giao hàng:</b>{" "}
                {shipmentData?.data[0]?.toAddress || "Chưa cập nhật"}
              </Text>
            </Stack>
          </Box>

          <Box>
            {order?.review ? (
              <Stack spacing={3}>
                <HStack>
                  <Text fontWeight="bold">Số sao:</Text>
                  <StarRating rating={order.review.rating} />
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Bình luận:</Text>
                  <Text>{order.review.comment}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Ngày đăng:</Text>
                  <Text>
                    {formatDateTimeString(new Date(order.review.createdAt))}
                  </Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Trạng thái:</Text>
                  <Badge colorScheme={order.review.status ? "green" : "red"}>
                    {order.review.status ? "Đã phê duyệt" : "Chưa phê duyệt"}
                  </Badge>
                </HStack>
              </Stack>
            ) : (
              <Text color="gray.500">(Chưa có đánh giá)</Text>
            )}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
