import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import ReviewSection from "./Tab/ReviewTab/ReviewSection.jsx";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import { FiBox, FiPenTool, FiStar, FiTool, FiUserCheck } from "react-icons/fi";
import WoodworkerProductTab from "./Tab/ProductTab/WoodworkerProductTab.jsx";
import WoodworkerDesignsTab from "./Tab/DesignTab/WoodworkerDesignsTab.jsx";
import AvailableService from "./Tab/ServiceTab/AvailableService.jsx";
import PostTab from "./Tab/PostTab/PostTab.jsx";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import { useParams } from "react-router-dom";
import { useGetWoodworkerByIdQuery } from "../../../../services/woodworkerApi";

export default function WoodworkerDetailPage() {
  const { id } = useParams();
  const { data: response, isLoading, error } = useGetWoodworkerByIdQuery(id);

  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={10}>
        <Text>Đã có lỗi xảy ra khi tải dữ liệu</Text>
      </Center>
    );
  }

  const woodworker = response?.data;

  if (!woodworker) {
    return (
      <Center py={10}>
        <Text>Không tìm thấy thông tin xưởng mộc</Text>
      </Center>
    );
  }

  return (
    <>
      <Box mb={6}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Chi tiết xưởng mộc
        </Heading>
      </Box>

      <PackageFrame packageType={woodworker.servicePack?.name || "Bronze"}>
        <Box>
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
            <Box flex={1}>
              <Image
                src={woodworker.imgUrl}
                width="100%"
                height="500px"
                objectFit="cover"
                objectPosition="center"
                alt={woodworker.brandName}
              />
            </Box>

            <Stack flex={1}>
              <Stack spacing={4}>
                <Flex justifyContent="space-between" alignContent="center">
                  <Heading fontWeight="bold" fontSize="20px">
                    {woodworker.brandName}
                  </Heading>
                  <Flex alignContent="center" gap={2}>
                    <StarRating
                      rating={
                        woodworker.totalReviews
                          ? woodworker.totalStar / woodworker.totalReviews
                          : 0
                      }
                    />
                    {woodworker.totalReviews
                      ? `${woodworker.totalReviews} đánh giá`
                      : "Chưa có đánh giá"}
                  </Flex>
                </Flex>

                <HStack>
                  <Text color="gray.500">
                    {woodworker.address || "Chưa cập nhật"}
                  </Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Loại hình kinh doanh:</Text>
                  <Text>{woodworker.businessType || "Chưa cập nhật"}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Liên hệ:</Text>
                  <Text>{woodworker.user?.phone || "Chưa cập nhật"}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Email:</Text>
                  <Text>{woodworker.user?.email || "Chưa cập nhật"}</Text>
                </HStack>

                <Box>
                  <Text fontWeight="bold">Giới thiệu:</Text>
                  <Text>{woodworker.bio || "Chưa cập nhật"}</Text>
                </Box>
              </Stack>
            </Stack>
          </Flex>
        </Box>
      </PackageFrame>

      <Box mt={6} color="black">
        <Tabs variant="unstyled">
          <TabList
            overflowX="auto"
            display="flex"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            whiteSpace="nowrap"
          >
            {[
              { label: "Trang cá nhân", icon: FiUserCheck },
              { label: "Dịch vụ", icon: FiTool },
              { label: "Thiết kế", icon: FiPenTool },
              { label: "Sản phẩm", icon: FiBox },
              { label: "Đánh giá", icon: FiStar },
            ].map((tab, index) => (
              <Tab
                key={index}
                _selected={{
                  bgColor: "app_brown.0",
                }}
                borderBottom="2px solid"
                borderBottomColor="app_brown.1"
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
                mr={1}
              >
                <Flex align="center" gap={1}>
                  <Icon as={tab.icon} />
                  <Text>{tab.label}</Text>
                </Flex>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <PostTab woodworkerId={woodworker.woodworkerId} />
            </TabPanel>
            <TabPanel p={0}>
              <AvailableService woodworkerId={woodworker.woodworkerId} />
            </TabPanel>
            <TabPanel p={0}>
              <WoodworkerDesignsTab woodworkerId={woodworker.woodworkerId} />
            </TabPanel>
            <TabPanel p={0}>
              <WoodworkerProductTab woodworkerId={woodworker.woodworkerId} />
            </TabPanel>
            <TabPanel p={0}>
              <ReviewSection woodworkerId={woodworker.woodworkerId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
