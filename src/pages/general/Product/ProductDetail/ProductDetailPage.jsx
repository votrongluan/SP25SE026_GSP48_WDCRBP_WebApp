import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spacer,
  Stack,
  Text,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  appColorTheme,
  servicePackNameConstants,
} from "../../../../config/appconfig.js";
import ReviewSection from "./ReviewSection.jsx";
import StarReview from "../../../../components/Utility/StarReview.jsx";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import ImageListSelector from "../../../../components/Utility/ImageListSelector.jsx";
import { formatPrice } from "../../../../utils/utils.js";
import useAuth from "../../../../hooks/useAuth.js";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../../services/productApi.js";
import { useGetAvailableServiceByWwIdQuery } from "../../../../services/availableServiceApi.js";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import ProductWoodworkerBox from "./ProductWoodworkerBox.jsx";
import useCart from "../../../../hooks/useCart.js";

export default function ProductDetailPage() {
  const { id: productId } = useParams();
  const { auth } = useAuth();
  const notify = useNotify();
  const { addProductToCart } = useCart();
  const navigate = useNavigate();

  // Fetch product data from API
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId);

  const product = response?.data;

  // Fetch woodworker service status
  const woodworkerId = product?.woodworkerId;
  const { data: serviceData, isLoading: isServiceLoading } =
    useGetAvailableServiceByWwIdQuery(woodworkerId, {
      skip: !woodworkerId,
    });

  // Check if sale service is operating
  const availableServices = serviceData?.data || [];

  const saleService = availableServices.find(
    (service) => service?.service?.serviceName === "Sale"
  );

  const isSaleAvailable = saleService?.operatingStatus !== false;

  // Check if service pack is valid (not expired, not BRONZE)
  const isServicePackValid =
    product?.servicePackEndDate &&
    Date.now() <= new Date(product.servicePackEndDate).getTime() &&
    product?.packType !== servicePackNameConstants.BRONZE;

  const isWoodworkerProfilePublic = product?.isWoodworkerProfilePublic == true;

  // Product is available if both service is operating and service pack is valid
  const isProductAvailable =
    isSaleAvailable && isServicePackValid && isWoodworkerProfilePublic;

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      mediaUrls: product.mediaUrls,
      woodworkerId: product.woodworkerId,
      woodworkerName: product.woodworkerName,
      quantity: 1,
      woodType: product.woodType,
      color: product.color,
      length: product.length,
      width: product.width,
      height: product.height,
      address: product.address,
    };

    addProductToCart(cartItem);
    notify("Thành công", "Sản phẩm đã được thêm vào giỏ hàng", "success");
  };

  // Handle buy now (add to cart and navigate to checkout)
  const handleBuyNow = () => {
    if (!product) return;

    const cartItem = {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      mediaUrls: product.mediaUrls,
      woodworkerId: product.woodworkerId,
      woodworkerName: product.woodworkerName,
      quantity: 1,
      woodType: product.woodType,
      color: product.color,
      length: product.length,
      width: product.width,
      height: product.height,
      address: product.address,
    };

    addProductToCart(cartItem);

    // Navigate to cart page with selectedWoodworker parameter and tab parameter
    navigate(`/cart?selectedWoodworker=${product.woodworkerId}&tab=product`);
  };

  // Show loading state
  if (isLoading || (woodworkerId && isServiceLoading)) {
    return (
      <Center h="500px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box textAlign="center" p={10}>
        <Alert status="error">
          <AlertIcon />
          Có lỗi xảy ra khi tải thông tin sản phẩm. Vui lòng thử lại sau.
        </Alert>
      </Box>
    );
  }

  // Show not found state
  if (!product) {
    return (
      <Box textAlign="center" p={10}>
        <Alert status="warning">
          <AlertIcon />
          Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          as="h2"
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Chi tiết sản phẩm
        </Heading>
      </Box>

      <Box>
        <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={5}>
          <Box borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <ImageListSelector imgUrls={product.mediaUrls} />
          </Box>

          <Stack borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <Stack spacing={4}>
              <Flex justifyContent="space-between" alignContent="center">
                <Heading fontWeight="bold" fontSize="20px">
                  {product.productName}
                </Heading>
                <Flex alignContent="center" gap={2}>
                  <StarReview
                    totalStar={product.totalStar || 0}
                    totalReviews={product.totalReviews || 0}
                  />
                </Flex>
              </Flex>

              {!isProductAvailable && (
                <Alert borderRadius="md" status="info">
                  <AlertIcon />
                  Sản phẩm tạm ngừng kinh doanh
                </Alert>
              )}

              <Text>
                <strong>Số lượng trong kho:</strong> {product.stock}
              </Text>

              <Text>
                <strong>Tình trạng:</strong>{" "}
                {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
              </Text>

              <Text>
                <strong>Kích thước (D x R x C):</strong> {product.length} x{" "}
                {product.width} x {product.height} cm
              </Text>

              <Text>
                <strong>Trọng lượng:</strong> {product.weight} kg
              </Text>

              <Text>
                <strong>Loại gỗ:</strong> {product.woodType}
              </Text>

              <Text>
                <strong>Tính năng đặc biệt:</strong> {product.specialFeature}
              </Text>

              <Text>
                <strong>Kiểu dáng:</strong> {product.style}
              </Text>

              <Text>
                <strong>Chạm khắc:</strong> {product.sculpture}
              </Text>

              <Text>
                <strong>Hương thơm:</strong> {product.scent}
              </Text>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  Mô tả:
                </Text>
                <Text whiteSpace="pre-wrap">{product.description}</Text>
              </Box>
            </Stack>

            <Spacer />

            <Box>
              <Box my={4} p={5} bgColor={appColorTheme.grey_0}>
                <Text
                  fontSize="30px"
                  color={appColorTheme.brown_2}
                  fontWeight="bold"
                >
                  {formatPrice(product.price)}
                </Text>
              </Box>

              {auth?.role !== "Woodworker" && isProductAvailable && (
                <Flex gap={5} alignItems="center">
                  <Button
                    bg={appColorTheme.brown_2}
                    color="white"
                    borderRadius="30px"
                    px={8}
                    py={6}
                    leftIcon={<FiShoppingBag />}
                    _hover={{ bg: appColorTheme.brown_1 }}
                    onClick={handleBuyNow}
                  >
                    MUA NGAY
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
            </Box>
          </Stack>
        </Grid>

        <Box mt={6}>
          <ProductWoodworkerBox product={product} />
        </Box>

        <ReviewSection productId={productId} />
      </Box>
    </>
  );
}
