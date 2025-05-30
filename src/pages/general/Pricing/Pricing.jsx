import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { appColorTheme } from "../../../config/appconfig";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useGetAllServicePacksQuery } from "../../../services/servicePackApi";

const baseFeatures = [
  "Quản lý dịch vụ cung cấp (Tùy chỉnh, sửa chữa)",
  "Quản lý tương thiết kế",
  "Quản lý đơn hàng dịch vụ",
  "Trang cá nhân (Profile) (Giới thiệu, thông tin, hình ảnh)",
];

const periodLabels = {
  1: "Hàng tháng",
  3: "Hàng quý",
  12: "Hàng năm",
};

export default function Pricing({
  handleButtonClick,
  label = "Đăng ký trở thành xưởng mộc",
  servicePackId,
  packName,
}) {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const { data: servicePacksResponse, isLoading } =
    useGetAllServicePacksQuery();

  const plans = useMemo(() => {
    if (!servicePacksResponse?.data) return [];

    const packsByName = {
      Bronze: { name: "Gói Đồng" },
      Silver: { name: "Gói Bạc" },
      Gold: { name: "Gói Vàng" },
    };

    // Nhóm các gói theo tên
    const groupedPacks = servicePacksResponse.data.reduce((acc, pack) => {
      if (!acc[pack.name]) {
        acc[pack.name] = {
          ...packsByName[pack.name],
          prices: {},
          features: [
            ...baseFeatures,
            `${pack.postLimitPerMonth} bài đăng trên trang cá nhân/tháng`,
            pack.productManagement
              ? "Quản lý sản phẩm & bán sản phẩm có sẵn"
              : "Quản lý sản phẩm & bán sản phẩm có sẵn",
            pack.personalization
              ? "Chức năng cung cấp dịch vụ cá nhân hóa"
              : "Chức năng cung cấp dịch vụ cá nhân hóa",
          ].filter(Boolean),
          unavailableFeatures: [
            !pack.productManagement && 5,
            !pack.personalization && 6,
          ].filter(Boolean),
        };
      }
      acc[pack.name].prices[pack.duration] = {
        price: pack.price,
        servicePackId: pack.servicePackId,
        name: pack.name,
      };
      return acc;
    }, {});

    // Chuyển đổi object thành array và sắp xếp theo thứ tự Bronze, Silver, Gold
    return ["Bronze", "Silver", "Gold"].map((name) => groupedPacks[name]);
  }, [servicePacksResponse]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Flex>
    );
  }

  return (
    <Box>
      {/* Title Section */}
      <Stack spacing={4} align="center" mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontFamily="Montserrat"
          as="h3"
          fontSize="2xl"
        >
          Các gói dịch vụ dành cho xưởng mộc
        </Heading>
        <Text fontSize="lg" color={appColorTheme.brown_1} textAlign="center">
          Tham gia cùng hàng nghìn Xưởng mộc dịch vụ khác
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
        mb={6}
      >
        {Object.entries(periodLabels).map(([duration, label]) => (
          <Button
            key={duration}
            onClick={() => setSelectedPeriod(Number(duration))}
            variant={selectedPeriod === Number(duration) ? "solid" : "ghost"}
            bg={selectedPeriod === Number(duration) ? "white" : "transparent"}
            color={
              selectedPeriod === Number(duration)
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
      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={8}>
        {plans.map(
          (plan, index) =>
            plan?.prices[selectedPeriod] && (
              <Box
                key={index}
                bg="white"
                p={5}
                borderRadius="xl"
                boxShadow="md"
                position="relative"
              >
                <Stack spacing={6}>
                  <HStack>
                    <Heading as="h3" fontSize="2xl">
                      {plan.name}{" "}
                    </Heading>
                    <Text fontSize="md" color="gray.500">
                      {servicePackId ==
                      plan?.prices[selectedPeriod]?.servicePackId
                        ? "(Đã mua trước đó)"
                        : ""}
                    </Text>
                  </HStack>
                  <Flex align="baseline">
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      color={appColorTheme.brown_2}
                    >
                      {plan?.prices[selectedPeriod]?.price?.toLocaleString()}
                    </Text>
                    <Text fontSize="xl" color={appColorTheme.brown_1} ml={2}>
                      đồng/
                      {selectedPeriod === 12
                        ? "năm"
                        : selectedPeriod === 3
                        ? "quý"
                        : "tháng"}
                    </Text>
                  </Flex>

                  <Button
                    bg={appColorTheme.brown_0}
                    color="black"
                    size="lg"
                    isDisabled={(() => {
                      // Logic to determine if button should be disabled
                      if (!packName) return false; // No current package, enable all buttons

                      const currentPackRank = {
                        Bronze: 1,
                        Silver: 2,
                        Gold: 3,
                      };

                      const currentRank = currentPackRank[packName] || 0;
                      const optionRank =
                        currentPackRank[plan?.prices[selectedPeriod]?.name] ||
                        0;

                      // Disable if this would be a downgrade
                      return optionRank < currentRank;
                    })()}
                    onClick={(e) => {
                      e.preventDefault();

                      handleButtonClick
                        ? handleButtonClick(plan?.prices[selectedPeriod])
                        : navigate("/ww-register");
                    }}
                    w="full"
                    _hover={{ bg: appColorTheme.brown_1, color: "white" }}
                  >
                    {packName == plan?.prices[selectedPeriod]?.name
                      ? "Gia hạn thêm"
                      : label}
                  </Button>

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
            )
        )}
      </SimpleGrid>
    </Box>
  );
}
