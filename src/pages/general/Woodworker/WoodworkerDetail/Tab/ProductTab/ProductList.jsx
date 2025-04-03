import {
  Box,
  Grid,
  Image,
  Stack,
  Text,
  Center,
  Badge,
  Flex,
  Icon,
  HStack,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import Pagination from "../../../../../../components/Utility/Pagination.jsx";
import { Link } from "react-router-dom";
import PackageFrame from "../../../../../../components/Utility/PackageFrame.jsx";
import { MdCollections } from "react-icons/md";
import StarReview from "../../../../../../components/Utility/StarReview.jsx";
import { formatPrice } from "../../../../../../utils/utils.js";
import { appColorTheme } from "../../../../../../config/appconfig.js";

export default function ProductList({ products = [], isLoading, error }) {
  if (isLoading) {
    return (
      <Center h="500px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="500px">
        <Text>Đã xảy ra lỗi khi tải dữ liệu.</Text>
      </Center>
    );
  }

  if (!products.length) {
    return (
      <Center py={10}>
        <Text>Không tìm thấy sản phẩm nào</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Pagination
        itemsPerPage={16}
        dataList={products}
        DisplayComponent={({ data }) => (
          <Grid
            mt={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={5}
          >
            {data.map((product) => (
              <Link
                key={product.productId}
                to={`/product/${product.productId}`}
              >
                <PackageFrame packageType={product.packType}>
                  <Box overflow="hidden" bgColor="white" borderRadius="md">
                    <Box position="relative">
                      <Image
                        src={
                          product.mediaUrls
                            ? product.mediaUrls.split(";")[0]
                            : ""
                        }
                        alt={product.productName}
                        objectFit="cover"
                        objectPosition="center"
                        w="100%"
                        h="200px"
                      />
                      {/* Display number of images badge */}
                      {product.mediaUrls && product.mediaUrls.includes(";") && (
                        <Badge
                          position="absolute"
                          top="8px"
                          right="8px"
                          colorScheme="teal"
                          display="flex"
                          alignItems="center"
                          px={2}
                          py={1}
                        >
                          <Icon as={MdCollections} mr={1} />
                          {product.mediaUrls.split(";").length}
                        </Badge>
                      )}
                      {product.categoryName && (
                        <Badge
                          position="absolute"
                          bottom="0"
                          right="0"
                          colorScheme="purple"
                        >
                          {product.categoryName}
                        </Badge>
                      )}
                    </Box>

                    <Stack height="100px" gap={1} p={1}>
                      <Box>
                        <Text noOfLines={2} fontWeight="bold">
                          {product.productName}
                        </Text>

                        <Text
                          mt={1}
                          fontSize="xl"
                          fontWeight="bold"
                          color={appColorTheme.brown_2}
                        >
                          {formatPrice(product.price)}
                        </Text>
                      </Box>

                      <Spacer />

                      <Flex alignItems="center" mt={1}>
                        <HStack ml="auto" fontSize="sm">
                          <StarReview
                            totalStar={product.totalStar || 0}
                            totalReviews={product.totalReviews || 0}
                          />
                        </HStack>
                      </Flex>
                    </Stack>
                  </Box>
                </PackageFrame>
              </Link>
            ))}
          </Grid>
        )}
      />
    </Box>
  );
}
