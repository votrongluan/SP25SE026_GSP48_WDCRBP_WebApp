import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Spacer,
  Link,
} from "@chakra-ui/react";
import {
  appColorTheme,
  getServiceTypeLabel,
} from "../../../../../config/appconfig.js";
import {
  formatDateTimeString,
  formatDateTimeToVietnamese,
} from "../../../../../utils/utils.js";
import StarRating from "../../../../../components/Utility/StarRating.jsx";
import PersonalizationProduct from "./PersonalizationProduct.jsx";
import CustomizationProduct from "./CustomizationProduct.jsx";
import SaleProduct from "./SaleProduct.jsx";

export default function GeneralInformationTab({ order }) {
  const serviceName = order?.serviceOrderDetail?.service?.service?.serviceName;
  const serviceOrder = order?.serviceOrderDetail;

  return (
    <Box>
      {serviceName == "Personalization" && (
        <PersonalizationProduct
          orderId={serviceOrder?.orderId}
          completionDate={serviceOrder?.updatedAt}
          currentProductImgUrls={order?.currentProductImgUrls}
          productCurrentStatus={order?.productCurrentStatus}
          warrantyDuration={order?.requestedProduct?.warrantyDuration}
          product={order?.serviceOrderDetail?.requestedProduct.find(
            (item) =>
              item.requestedProductId ==
              order?.requestedProduct?.requestedProductId
          )}
          isGuarantee={order?.isGuarantee}
          guaranteeError={order?.guaranteeError}
        />
      )}
      {serviceName == "Customization" && (
        <CustomizationProduct
          completionDate={serviceOrder?.updatedAt}
          currentProductImgUrls={order?.currentProductImgUrls}
          productCurrentStatus={order?.productCurrentStatus}
          warrantyDuration={order?.requestedProduct?.warrantyDuration}
          product={order?.serviceOrderDetail?.requestedProduct.find(
            (item) =>
              item.requestedProductId ==
              order?.requestedProduct?.requestedProductId
          )}
          isGuarantee={order?.isGuarantee}
          guaranteeError={order?.guaranteeError}
        />
      )}
      {serviceName == "Sale" && (
        <SaleProduct
          completionDate={serviceOrder?.updatedAt}
          currentProductImgUrls={order?.currentProductImgUrls}
          productCurrentStatus={order?.productCurrentStatus}
          warrantyDuration={order?.requestedProduct?.warrantyDuration}
          product={order?.serviceOrderDetail?.requestedProduct.find(
            (item) =>
              item.requestedProductId ==
              order?.requestedProduct?.requestedProductId
          )}
          isGuarantee={order?.isGuarantee}
          guaranteeError={order?.guaranteeError}
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
                <Text fontWeight="bold">Mã yêu cầu:</Text>
                <Text>{order?.guaranteeOrderId || "Chưa cập nhật"}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Mã đơn hàng đã đặt:</Text>
                <Text>
                  {getServiceTypeLabel(order?.serviceOrderDetail?.orderId)}
                </Text>
                <Link
                  target="_blank"
                  color={appColorTheme.brown_2}
                  href={`/cus/service-order/${order?.serviceOrderDetail?.orderId}`}
                >
                  Xem chi tiết
                </Link>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày đặt:</Text>
                <Text>
                  {order?.createdAt
                    ? formatDateTimeString(order?.createdAt)
                    : "Chưa cập nhật"}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Yêu cầu lắp đặt bởi xưởng:</Text>
                <Text>
                  {order?.install ? "Có lắp đặt" : "Không cần lắp đặt"}
                </Text>
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
              <Text color="gray.500">Không có lịch hẹn tư vấn</Text>
            )}
          </Stack>
        </Box>
      </SimpleGrid>

      <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px" mt={6}>
        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={20}>
          <Box>
            <Stack spacing={3}>
              <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
                Thông tin xưởng mộc
              </Heading>

              <Text>
                <b>Tên xưởng mộc:</b>{" "}
                {order?.woodworker?.brandName || "Chưa cập nhật"}
              </Text>

              <Text>
                <b>Địa chỉ:</b> {order?.woodworker?.address || "Chưa cập nhật"}
              </Text>

              <HStack>
                <Spacer />
                <Link
                  target="_blank"
                  href={`/woodworker/${order?.woodworker?.woodworkerId}`}
                >
                  <Text
                    color={appColorTheme.brown_2}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Xem xưởng
                  </Text>
                </Link>
              </HStack>
            </Stack>
          </Box>

          <Box>
            {order?.review ? (
              <>
                {order?.review?.status ? (
                  <>
                    <Stack spacing={3}>
                      <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
                        Đánh giá
                      </Heading>

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
                          {formatDateTimeString(
                            new Date(order.review.createdAt)
                          )}
                        </Text>
                      </HStack>
                    </Stack>
                  </>
                ) : (
                  <Text color="gray.500">(Đánh giá chưa được duyệt)</Text>
                )}
              </>
            ) : (
              <Text color="gray.500">(Chưa có đánh giá)</Text>
            )}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
