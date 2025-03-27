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
} from "@chakra-ui/react";
import ReviewSection from "./Tab/ReviewTab/ReviewSection.jsx";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import { FiBox, FiPenTool, FiStar, FiTool, FiUserCheck } from "react-icons/fi";
import WoodworkerProductTab from "./Tab/ProductTab/WoodworkerProductTab.jsx";
import WoodworkerDesignsTab from "./Tab/DesignTab/WoodworkerDesignsTab.jsx";
import AvailableService from "./Tab/ServiceTab/AvailableService.jsx";
import PostTab from "./Tab/PostTab/PostTab.jsx";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";

export default function WoodworkerDetailPage() {
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

      <PackageFrame packageType="Bronze">
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
                src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                width="100%"
              />
            </Box>

            <Stack flex={1}>
              <Stack spacing={4}>
                <Flex justifyContent="space-between" alignContent="center">
                  <Heading fontWeight="bold" fontSize="20px">
                    Xưởng mộc Hòa Bình Quận 5
                  </Heading>
                  <Flex alignContent="center" gap={2}>
                    {" "}
                    <StarRating rating={3.5} />
                    13 đánh giá
                  </Flex>
                </Flex>

                <HStack>
                  <Text fontWeight="bold">Địa chỉ xưởng:</Text>
                  <Text>Chưa cập nhật</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Loại hình kinh doanh:</Text>
                  <Text>Chưa cập nhật</Text>
                </HStack>

                <Box>
                  <Text fontWeight="bold">Giới thiệu:</Text>
                  <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Reiciendis harum, voluptates quas, laudantium inventore
                    debitis aspernatur aperiam voluptate distinctio perspiciatis
                    doloremque cupiditate cum facere iste reprehenderit totam
                    tempora impedit non.
                  </Text>
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
              <PostTab />
            </TabPanel>
            <TabPanel p={0}>
              <AvailableService />
            </TabPanel>
            <TabPanel p={0}>
              <WoodworkerDesignsTab />
            </TabPanel>
            <TabPanel p={0}>
              <WoodworkerProductTab />
            </TabPanel>
            <TabPanel p={0}>
              <ReviewSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
