import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiShoppingCart,
  FiPenTool,
  FiPackage,
  FiTrello,
  FiMessageCircle,
  FiInfo,
  FiUsers,
  FiLogIn,
  FiList,
  FiTool,
  FiUser,
} from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import { appColorTheme } from "../../../config/appconfig";
import useAuth from "../../../hooks/useAuth";

const QuickActionCard = ({ icon, title, description, onClick, color }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={5}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      cursor="pointer"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
      transition="all 0.2s"
      onClick={onClick}
    >
      <VStack spacing={4} align="start">
        <Box
          p={3}
          bg={`${color}.50`}
          color={color}
          borderRadius="lg"
          fontSize="2xl"
        >
          <Icon as={icon} />
        </Box>
        <VStack align="start" spacing={1}>
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  if (auth?.role == "Staff") {
    return <Navigate to="/staff" />;
  }

  if (auth?.role == "Moderator") {
    return <Navigate to="/mod" />;
  }

  if (auth?.role == "Admin") {
    return <Navigate to="/ad" />;
  }

  const quickActions = [
    {
      icon: FiTool,
      title: "Xưởng mộc",
      description: "Khám phá các xưởng mộc chất lượng",
      color: "blue",
      onClick: () => navigate("/woodworker"),
    },
    {
      icon: FiPenTool,
      title: "Ý tưởng thiết kế",
      description: "Danh mục ý tưởng thiết kế đa dạng",
      color: "purple",
      onClick: () => navigate("/design"),
    },
    {
      icon: FiPackage,
      title: "Sản phẩm",
      description: "Danh mục các sản phẩm chất lượng",
      color: "green",
      onClick: () => navigate("product"),
    },
  ];

  return (
    <Box p={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        mb={6}
      >
        <VStack align="start" spacing={2}>
          <Heading size="lg">Xin chào, Quý Khách Hàng</Heading>
          <Text color="gray.500">
            Chào mừng bạn đến với nền tảng kết nối xưởng mộc hàng đầu
          </Text>
        </VStack>
        {auth?.userId ? (
          <Button
            bgColor={appColorTheme.brown_2}
            _hover={{
              bgColor: appColorTheme.brown_1,
              color: "white",
            }}
            leftIcon={<FiUser />}
            color="white"
            onClick={() =>
              navigate(`${auth?.role == "Woodworker" ? "ww" : "cus"}/profile`)
            }
          >
            Xem hồ sơ
          </Button>
        ) : (
          <Button
            bgColor={appColorTheme.brown_2}
            _hover={{
              bgColor: appColorTheme.brown_1,
              color: "white",
            }}
            leftIcon={<FiLogIn />}
            color="white"
            onClick={() => navigate("/auth")}
          >
            Đăng nhập
          </Button>
        )}
      </Flex>

      <Heading color={appColorTheme.brown_2} size="md" mb={6}>
        Khám phá ngay
      </Heading>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={5}
      >
        {quickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </Grid>
    </Box>
  );
}
