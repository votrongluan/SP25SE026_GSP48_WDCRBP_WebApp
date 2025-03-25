import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../config/appconfig";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gói Đồng",
    prices: {
      monthly: "200.000",
      quarterly: "540.000", // Giảm 10%
      annually: "2.160.000", // Giảm 10%
    },
    features: [
      "Quản lý dịch vụ cung cấp (Tùy chỉnh, sửa chữa)",
      "Quản lý tương thiết kế",
      "Quản lý đơn hàng dịch vụ",
      "Trang cá nhân (Profile) (Giới thiệu, thông tin, hình ảnh)",
      "5 bài đăng trên trang cá nhân/tháng",
      "Quản lý sản phẩm & bán sản phẩm có sẵn",
      "Ưu tiên hiển thị trong kết quả tìm kiếm",
      "Chức năng cung cấp dịch vụ cá nhân hóa",
    ],
    unavailableFeatures: [5, 6, 7],
  },
  {
    name: "Gói Bạc",
    prices: {
      monthly: "350.000",
      quarterly: "945.000", // Giảm 10%
      annually: "3.780.000", // Giảm 10%
    },
    features: [
      "Quản lý dịch vụ cung cấp (Tùy chỉnh, sửa chữa)",
      "Quản lý tương thiết kế",
      "Quản lý đơn hàng dịch vụ",
      "Trang cá nhân (Profile) (Giới thiệu, thông tin, hình ảnh)",
      "10 bài đăng trên trang cá nhân/tháng",
      "Quản lý sản phẩm & bán sản phẩm có sẵn",
      "Ưu tiên hiển thị trong kết quả tìm kiếm",
      "Chức năng cung cấp dịch vụ cá nhân hóa",
    ],
    unavailableFeatures: [7],
  },
  {
    name: "Gói Vàng",
    prices: {
      monthly: "500.000",
      quarterly: "1.350.000", // Giảm 10%
      annually: "5.400.000", // Giảm 10%
    },
    features: [
      "Quản lý dịch vụ cung cấp (Tùy chỉnh, sửa chữa)",
      "Quản lý tương thiết kế",
      "Quản lý đơn hàng dịch vụ",
      "Trang cá nhân (Profile) (Giới thiệu, thông tin, hình ảnh)",
      "20 bài đăng trên trang cá nhân/tháng",
      "Quản lý sản phẩm & bán sản phẩm có sẵn",
      "Ưu tiên cao nhất trong kết quả tìm kiếm",
      "Có chức năng cung cấp dịch vụ cá nhân hóa",
    ],
  },
];

const periodLabels = {
  monthly: "Hàng tháng",
  quarterly: "Hàng quý",
  annually: "Hàng năm",
};

export default function Pricing() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const getPriceDisplay = (prices, period) => {
    return `${prices[period]} đồng/${
      period === "annually" ? "năm" : period === "quarterly" ? "quý" : "tháng"
    }`;
  };

  return (
    <Box>
      {/* Title Section */}
      <Stack spacing={4} align="center" mb={5}>
        <Heading
          fontFamily="Montserrat"
          fontWeight="normal"
          as="h3"
          fontSize="22px"
        >
          Các gói dịch vụ dành cho xưởng mộc
        </Heading>
        <Text fontSize="lg" color={appColorTheme.brown_1} textAlign="center">
          Tham gia cùng hàng nghìn nhà cung cấp dịch vụ khác
        </Text>
      </Stack>

      {/* Period Selection */}
      <Flex
        justify="center"
        bg={appColorTheme.grey_1}
        p={2}
        borderRadius="full"
        maxW="md"
        mx="auto"
        mb={5}
      >
        {Object.entries(periodLabels).map(([period, label]) => (
          <Button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            variant={selectedPeriod === period ? "solid" : "ghost"}
            bg={selectedPeriod === period ? "white" : "transparent"}
            color={
              selectedPeriod === period
                ? appColorTheme.black_0
                : appColorTheme.brown_1
            }
            flex={1}
            borderRadius="full"
          >
            {label}
          </Button>
        ))}
      </Flex>

      {/* Plans */}
      <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={8}>
        {plans.map((plan, index) => (
          <Box
            key={index}
            bg="white"
            p={5}
            borderRadius="xl"
            boxShadow="md"
            position="relative"
          >
            <Stack spacing={5}>
              <Heading as="h3" fontSize="2xl">
                {plan.name}
              </Heading>
              <Flex align="baseline">
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  color={appColorTheme.brown_2}
                >
                  {plan.prices[selectedPeriod]}
                </Text>
                <Text fontSize="xl" color={appColorTheme.brown_1} ml={2}>
                  đồng/
                  {selectedPeriod === "annually"
                    ? "năm"
                    : selectedPeriod === "quarterly"
                    ? "quý"
                    : "tháng"}
                </Text>
              </Flex>
              <Link to="/ww-register">
                <Button
                  bg={appColorTheme.brown_0}
                  color="black"
                  size="lg"
                  w="full"
                  _hover={{ bg: appColorTheme.brown_1, color: "white" }}
                >
                  Đăng ký trở thành thợ mộc
                </Button>
              </Link>
              <Stack spacing={3}>
                {plan.features.map((feature, featureIndex) => (
                  <Flex key={featureIndex} align="center">
                    <Icon
                      as={
                        plan.unavailableFeatures?.includes(featureIndex)
                          ? CloseIcon
                          : CheckIcon
                      }
                      color={
                        plan.unavailableFeatures?.includes(featureIndex)
                          ? "red.500"
                          : appColorTheme.brown_1
                      }
                      w={5}
                      h={5}
                      mr={2}
                    />
                    <Text
                      color={
                        plan.unavailableFeatures?.includes(featureIndex)
                          ? "red.500"
                          : appColorTheme.black_0
                      }
                    >
                      {feature}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
