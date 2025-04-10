import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import ReviewSection from "./ReviewSection.jsx";
import { FiShoppingBag, FiShoppingCart, FiTruck } from "react-icons/fi";
import ImageListSelector from "../../../../components/Utility/ImageListSelector.jsx";
import DesignVariantConfig from "./DesignVariantConfig.jsx";
import useAuth from "../../../../hooks/useAuth.js";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetDesignByIdQuery,
  useGetDesignIdeaVariantQuery,
} from "../../../../services/designIdeaApi.js";
import { useGetAvailableServiceByWwIdQuery } from "../../../../services/availableServiceApi.js";
import StarReview from "../../../../components/Utility/StarReview.jsx";
import WoodworkerBox from "./WoodworkerBox.jsx";
import useCart from "../../../../hooks/useCart.js";
import { useState } from "react";
import { useNotify } from "../../../../components/Utility/Notify.jsx";

export default function DesignDetailPage() {
  const { id: designId } = useParams();
  const { auth } = useAuth();
  const { addDesignToCart } = useCart();
  const notify = useNotify();
  const navigate = useNavigate();

  // State to track selected variant
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Fetch design details and variants
  const {
    data: designData,
    isLoading: isDesignLoading,
    error: designError,
  } = useGetDesignByIdQuery(designId);

  const {
    data: variantData,
    isLoading: isVariantLoading,
    error: variantError,
  } = useGetDesignIdeaVariantQuery(designId);

  // Extract design details from API response
  const designDetail = designData?.data;
  const designVariants = variantData?.data;

  // Fetch woodworker service status
  const woodworkerId = designDetail?.woodworkerProfile?.woodworkerId;
  const { data: serviceData, isLoading: isServiceLoading } =
    useGetAvailableServiceByWwIdQuery(woodworkerId, {
      skip: !woodworkerId,
    });

  // Check if customization service is operating
  const availableServices = serviceData?.data || [];

  const customizationService = availableServices.find(
    (service) => service?.service?.serviceName === "Customization"
  );

  const isCustomizationAvailable =
    customizationService?.operatingStatus !== false;

  // Check if service pack is valid (not expired)
  const isServicePackValid =
    designDetail?.woodworkerProfile?.servicePackEndDate &&
    Date.now() <=
      new Date(designDetail.woodworkerProfile.servicePackEndDate).getTime();

  const isWoodworkerProfilePublic =
    designDetail?.woodworkerProfile?.publicStatus == true;

  // Design is available if both service is operating and service pack is valid
  const isDesignAvailable =
    isCustomizationAvailable && isServicePackValid && isWoodworkerProfilePublic;

  if (
    isDesignLoading ||
    isVariantLoading ||
    (woodworkerId && isServiceLoading)
  ) {
    return (
      <Flex justify="center" align="center" h="400px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Flex>
    );
  }

  if (designError || variantError) {
    return (
      <Box textAlign="center" p={10}>
        <Text fontSize="xl" color="red.500">
          Có lỗi xảy ra khi tải thông tin thiết kế. Vui lòng thử lại sau.
        </Text>
      </Box>
    );
  }

  // Handler for adding item to cart
  const handleAddToCart = () => {
    if (!selectedVariant) {
      return;
    }

    const cartItem = {
      ...selectedVariant,
      designId,
      name: designDetail?.name,
      img_urls: designDetail?.img_urls?.split(";")[0],
      woodworkerId: designDetail?.woodworkerProfile?.woodworkerId,
      woodworkerName: designDetail?.woodworkerProfile?.brandName,
      quantity: 1,
      address: designDetail?.woodworkerProfile?.address,
      availableServiceId: customizationService?.availableServiceId,
    };

    addDesignToCart(cartItem);

    notify("Thành công", "Sản phẩm đã được thêm vào giỏ hàng", "success");
  };

  // Handler for ordering now (add to cart and navigate to checkout)
  const handleOrderNow = () => {
    if (!selectedVariant) {
      notify("Lỗi", "Vui lòng chọn biến thể sản phẩm", "error");
      return;
    }

    const cartItem = {
      ...selectedVariant,
      name: designDetail?.name,
      img_urls: designDetail?.img_urls?.split(";")[0],
      woodworkerId: designDetail?.woodworkerProfile?.woodworkerId,
      woodworkerName: designDetail?.woodworkerProfile?.brandName,
      address: designDetail?.woodworkerProfile?.address,
      quantity: 1,
      availableServiceId: customizationService?.availableServiceId,
    };

    addDesignToCart(cartItem);

    // Navigate to cart page with selectedWoodworker parameter and tab parameter
    navigate(
      `/cart?selectedWoodworker=${designDetail?.woodworkerProfile?.woodworkerId}&tab=design`
    );
  };

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          as="h2"
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Chi tiết thiết kế
        </Heading>
      </Box>

      <Box>
        <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={5}>
          <Box borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <ImageListSelector imgUrls={designDetail?.img_urls || ""} />
          </Box>

          <Stack borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <Stack spacing={4}>
              <Flex flexDirection="column" gap={2}>
                <Heading fontWeight="bold" fontSize="20px">
                  {designDetail?.name || "Tên sản phẩm"}
                </Heading>
                {!isDesignAvailable && (
                  <Alert borderRadius="md" status="info">
                    <AlertIcon />
                    Tạm ngừng kinh doanh
                  </Alert>
                )}
                <StarReview
                  totalReviews={designDetail?.totalReviews}
                  totalStar={designDetail?.totalStar}
                />
              </Flex>

              <HStack>
                <Text fontWeight="bold">Loại sản phẩm:</Text>
                <Text>
                  {designDetail?.category?.categoryName || "Chưa cập nhật"}
                </Text>
              </HStack>

              <HStack>
                <Box
                  as={FiTruck}
                  color={designDetail?.isInstall ? "green.500" : "gray.400"}
                />
                <Text>
                  {designDetail?.isInstall
                    ? "Cần giao hàng và lắp đặt bởi xưởng"
                    : "Không yêu cầu giao hàng & lắp đặt bởi xưởng"}
                </Text>
              </HStack>

              <Box>
                <Text fontWeight="bold">Mô tả:</Text>
                <Text whiteSpace="pre-wrap">
                  {designDetail?.description || "Chưa cập nhật"}
                </Text>
              </Box>
            </Stack>

            <Spacer />

            <Box>
              <Box>
                <DesignVariantConfig
                  design={designDetail}
                  designVariants={designVariants}
                  onVariantSelect={setSelectedVariant}
                />
              </Box>
              {auth?.role !== "Woodworker" && (
                <Flex mt={4} gap={5} flexDirection="column">
                  {isDesignAvailable && (
                    <Flex gap={5} alignItems="center">
                      <Button
                        bg={appColorTheme.brown_2}
                        color="white"
                        borderRadius="30px"
                        px={8}
                        py={6}
                        leftIcon={<FiShoppingBag />}
                        _hover={{ bg: appColorTheme.brown_1 }}
                        onClick={handleOrderNow}
                      >
                        ĐẶT NGAY
                      </Button>

                      <Button
                        variant="outline"
                        borderColor={appColorTheme.brown_2}
                        color={appColorTheme.brown_2}
                        borderRadius="30px"
                        px={4}
                        py={6}
                        leftIcon={<FiShoppingCart />}
                        _hover={{ opacity: ".9" }}
                        onClick={handleAddToCart}
                      >
                        Thêm vào giỏ
                      </Button>
                    </Flex>
                  )}
                </Flex>
              )}
            </Box>
          </Stack>
        </Grid>

        <WoodworkerBox designDetail={designDetail} />
        <ReviewSection designId={designId} />
      </Box>
    </>
  );
}
