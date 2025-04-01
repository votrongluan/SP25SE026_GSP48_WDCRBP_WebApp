import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  Spinner,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import ReviewSection from "./ReviewSection.jsx";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import ImageListSelector from "../../../../components/Utility/ImageListSelector.jsx";
import DesignVariantConfig from "./DesignVariantConfig.jsx";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import useAuth from "../../../../hooks/useAuth.js";
import { useParams } from "react-router-dom";
import {
  useGetDesignByIdQuery,
  useGetDesignIdeaVariantQuery,
} from "../../../../services/designIdeaApi.js";

export default function DesignDetailPage() {
  const { id: designId } = useParams();
  const { auth } = useAuth();

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

  if (isDesignLoading || isVariantLoading) {
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
              <Flex flexDirection="column" gap={10}>
                <Heading fontWeight="bold" fontSize="20px">
                  {designDetail?.name || "Tên sản phẩm"}
                </Heading>
                <Flex alignItems="center" gap={2}>
                  <StarRating rating={designDetail?.totalStar || 0} />
                  <Text>{designDetail?.totalReviews || 0} đánh giá</Text>
                </Flex>
              </Flex>

              <HStack>
                <Text fontWeight="bold">Loại sản phẩm:</Text>
                <Text>
                  {designDetail?.category?.categoryName || "Chưa cập nhật"}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Mô tả:</Text>
                <Text>{designDetail?.description || "Chưa cập nhật"}</Text>
              </HStack>
            </Stack>

            <Spacer />

            <Box>
              <Box>
                <DesignVariantConfig designVariants={designVariants} />
              </Box>
              {auth?.role !== "Woodworker" && (
                <Flex mt={4} gap={5} alignItems="center">
                  <Button
                    bg={appColorTheme.brown_2}
                    color="white"
                    borderRadius="30px"
                    px={8}
                    py={6}
                    leftIcon={<FiShoppingBag />}
                    _hover={{ bg: appColorTheme.brown_1 }}
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
                  >
                    Thêm vào giỏ
                  </Button>
                </Flex>
              )}
            </Box>
          </Stack>
        </Grid>

        <Box mt={6}>
          <PackageFrame
            packageType={
              designDetail?.woodworkerProfile?.servicePack?.name || "Silver"
            }
          >
            <Flex
              flexDirection={{
                base: "column",
                xl: "row",
              }}
              borderRadius="10px"
              p={5}
              bgColor="white"
              boxShadow="md"
              gap={5}
            >
              <Box>
                <Image
                  src={
                    designDetail?.woodworkerProfile?.imgUrl ||
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  }
                  width="150px"
                  height="150px"
                  objectFit="cover"
                  objectPosition="center"
                  borderRadius="50%"
                />
              </Box>

              <Stack flex={1}>
                <Stack spacing={4}>
                  <Flex justifyContent="space-between" alignContent="center">
                    <Heading fontWeight="bold" fontSize="20px">
                      {designDetail?.woodworkerProfile?.brandName ||
                        "Xưởng mộc"}
                    </Heading>
                    <Flex alignContent="center" gap={2}>
                      <StarRating
                        rating={designDetail?.woodworkerProfile?.totalStar || 0}
                      />
                      {designDetail?.woodworkerProfile?.totalReviews || 0} đánh
                      giá
                    </Flex>
                  </Flex>

                  <HStack>
                    <Text fontWeight="bold">Địa chỉ xưởng:</Text>
                    <Text>
                      {designDetail?.woodworkerProfile?.address ||
                        "Chưa cập nhật"}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="bold">Loại hình kinh doanh:</Text>
                    <Text>
                      {designDetail?.woodworkerProfile?.businessType ||
                        "Chưa cập nhật"}
                    </Text>
                  </HStack>

                  <HStack>
                    <Spacer />
                    <Text>
                      <ChakraLink
                        href={`/woodworker/${designDetail?.woodworkerProfile?.woodworkerId}`}
                        target="_blank"
                        textDecoration="underline"
                        color={appColorTheme.brown_2}
                      >
                        Xem xưởng
                      </ChakraLink>
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Flex>
          </PackageFrame>
        </Box>

        <ReviewSection designId={designId} />
      </Box>
    </>
  );
}
