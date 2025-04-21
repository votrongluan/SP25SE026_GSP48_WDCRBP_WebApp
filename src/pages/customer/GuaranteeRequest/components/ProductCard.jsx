import {
  Box,
  Heading,
  Button,
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import { formatDateString } from "../../../../utils/utils.js";

export default function ProductCard({
  selectedProduct,
  orderDetail,
  getWarrantyEndDate,
  formatDate,
  onOpen,
}) {
  return (
    <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
      <Heading size="md" mb={4}>
        Sản phẩm cần sửa chữa / bảo hành
      </Heading>

      {selectedProduct ? (
        <Card variant="outline">
          <CardBody>
            <Flex direction="column">
              <Flex mb={4}>
                {(selectedProduct.designIdeaVariantDetail?.img_urls ||
                  selectedProduct.finishImgUrls) && (
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={
                      (
                        selectedProduct.designIdeaVariantDetail?.img_urls ||
                        selectedProduct.finishImgUrls
                      )?.split(",")[0]
                    }
                    alt={selectedProduct.category?.categoryName}
                    borderRadius="md"
                    mr={4}
                  />
                )}
                <Stack>
                  <Text fontWeight="bold">
                    {selectedProduct.designIdeaVariantDetail?.name ||
                      selectedProduct.category?.categoryName ||
                      "Sản phẩm"}
                  </Text>
                  <Text fontSize="sm">
                    Danh mục: {selectedProduct.category?.categoryName}
                  </Text>
                  <Text fontSize="sm">
                    Số lượng: {selectedProduct.quantity}
                  </Text>
                </Stack>
              </Flex>

              <Divider my={2} />

              <Flex justifyContent="space-between" mt={2}>
                <Text fontSize="sm">Ngày nhận sản phẩm:</Text>
                <Text fontSize="sm" fontWeight="medium">
                  {formatDateString(orderDetail.updatedAt)}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" mt={1}>
                <Text fontSize="sm">Thời hạn bảo hành:</Text>
                <Text fontSize="sm" fontWeight="medium">
                  {selectedProduct.warrantyDuration || 0} tháng
                </Text>
              </Flex>

              <Flex justifyContent="space-between" mt={1}>
                <Text fontSize="sm">Hết hạn bảo hành:</Text>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={
                    getWarrantyEndDate(selectedProduct) &&
                    new Date() > getWarrantyEndDate(selectedProduct)
                      ? "red.500"
                      : "green.500"
                  }
                >
                  {formatDate(getWarrantyEndDate(selectedProduct))}
                  {getWarrantyEndDate(selectedProduct) &&
                    new Date() > getWarrantyEndDate(selectedProduct) &&
                    " (Đã hết hạn)"}
                </Text>
              </Flex>

              <Button
                size="sm"
                mt={4}
                colorScheme="blue"
                variant="outline"
                onClick={onOpen}
              >
                Đổi sản phẩm
              </Button>
            </Flex>
          </CardBody>
        </Card>
      ) : (
        <Button onClick={onOpen} colorScheme="blue" isFullWidth>
          Chọn sản phẩm cần sửa chữa / bảo hành
        </Button>
      )}
    </Box>
  );
}
