import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import PackageFrame from "../../../../components/Utility/PackageFrame";
import StarReview from "../../../../components/Utility/StarReview";
import { appColorTheme } from "../../../../config/appconfig";

// Component to display woodworker information
export default function ProductWoodworkerBox({ product }) {
  if (!product?.woodworkerId) return null;

  return (
    <PackageFrame packageType={product?.packType}>
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
              product?.woodworkerImgUrl ||
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
                {product?.woodworkerName || "Xưởng mộc"}
              </Heading>
              <Flex alignContent="center" gap={2}>
                <StarReview
                  totalStar={product?.woodworkerTotalStar || 0}
                  totalReviews={product?.woodworkerTotalReviews || 0}
                />
              </Flex>
            </Flex>

            <HStack>
              <Text fontWeight="bold">Địa chỉ xưởng:</Text>
              <Text>{product?.address || "Chưa cập nhật"}</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Loại hình kinh doanh:</Text>
              <Text>{product?.businessType || "Chưa cập nhật"}</Text>
            </HStack>

            <HStack>
              <Spacer />
              <Text>
                <ChakraLink
                  href={`/woodworker/${product?.woodworkerId}`}
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
  );
}
