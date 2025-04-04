import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import PackageFrame from "../../../components/Utility/PackageFrame";
import StarReview from "../../../components/Utility/StarReview";
import { appColorTheme } from "../../../config/appconfig";

export default function WoodworkerBox({ woodworkerProfile }) {
  if (!woodworkerProfile) {
    return null;
  }

  return (
    <Box mt={6}>
      <PackageFrame packageType={woodworkerProfile?.servicePack?.name}>
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
                woodworkerProfile?.imgUrl ||
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
                  {woodworkerProfile?.brandName || "Xưởng mộc"}
                </Heading>

                <StarReview
                  totalReviews={woodworkerProfile?.totalReviews}
                  totalStar={woodworkerProfile?.totalStar}
                />
              </Flex>

              <Text>
                <b>Địa chỉ xưởng:</b>{" "}
                {woodworkerProfile?.address || "Chưa cập nhật"}
              </Text>

              <Text>
                <b>Loại hình kinh doanh:</b>{" "}
                {woodworkerProfile?.businessType || "Chưa cập nhật"}
              </Text>

              <HStack>
                <Spacer />
                <Text>
                  <ChakraLink
                    href={`/woodworker/${woodworkerProfile?.woodworkerId}`}
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
  );
}
