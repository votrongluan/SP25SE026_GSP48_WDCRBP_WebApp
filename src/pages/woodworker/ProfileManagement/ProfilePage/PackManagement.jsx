import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import BuyPackModal from "../ActionModal/BuyPackModal.jsx";
import { formatDateTimeString } from "../../../../utils/utils.js";

export default function PackManagement({ woodworker }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPackColor = (type) => {
    switch (type?.toLowerCase()) {
      case "gold":
        return "yellow.500";
      case "silver":
        return "gray.400";
      case "bronze":
        return "orange.500";
      default:
        return "gray.500";
    }
  };

  return (
    <>
      <Heading
        color={appColorTheme.brown_2}
        fontSize="2xl"
        fontFamily="Montserrat"
      >
        Quản lý Gói dịch vụ
      </Heading>

      <PackageFrame packageType={woodworker.servicePack?.name || "none"}>
        <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>
            Thông tin gói dịch vụ
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box>
              <Text fontWeight="bold">Loại gói:</Text>
              <Text
                color={getPackColor(woodworker.servicePack?.name)}
                fontSize="xl"
              >
                {woodworker.servicePack?.name?.toUpperCase() || "Chưa đăng ký"}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Ngày bắt đầu:</Text>
              <Text fontSize="xl">
                {formatDateTimeString(woodworker.servicePackStartDate)}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Ngày kết thúc:</Text>
              <Text fontSize="xl">
                {formatDateTimeString(woodworker.servicePackEndDate)}
              </Text>
            </Box>
          </SimpleGrid>
          <Button
            colorScheme="green"
            mt={4}
            onClick={onOpen}
            leftIcon={<Text>+</Text>}
          >
            Mua gói mới
          </Button>
        </Box>
      </PackageFrame>

      <BuyPackModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
