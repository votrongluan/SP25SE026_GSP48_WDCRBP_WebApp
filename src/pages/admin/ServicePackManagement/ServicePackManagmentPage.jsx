import {
  Box,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  IconButton,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { appColorTheme, getPackTypeLabel } from "../../../config/appconfig";
import { useGetAllServicePacksQuery } from "../../../services/servicePackApi";
import { formatPrice } from "../../../utils/utils";
import { FiEdit2 } from "react-icons/fi";
import EditServicePackPriceModal from "./EditServicePackPriceModal";

export default function ServicePackManagementPage() {
  const {
    data: servicePacksResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAllServicePacksQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedServicePack, setSelectedServicePack] = useState(null);

  // Group service packs by name for better display
  const [groupedServicePacks, setGroupedServicePacks] = useState({});

  useEffect(() => {
    if (servicePacksResponse?.data) {
      // Group by name (Gold, Silver, Bronze)
      const grouped = servicePacksResponse.data.reduce((acc, pack) => {
        if (!acc[pack.name]) {
          acc[pack.name] = [];
        }
        acc[pack.name].push(pack);
        return acc;
      }, {});

      // Sort each group by duration
      Object.keys(grouped).forEach((key) => {
        grouped[key].sort((a, b) => a.duration - b.duration);
      });

      setGroupedServicePacks(grouped);
    }
  }, [servicePacksResponse]);

  const handleEditClick = (servicePack) => {
    setSelectedServicePack(servicePack);
    onOpen();
  };

  if (isLoading) {
    return (
      <Center h="300px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="300px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu gói dịch vụ</Text>
      </Center>
    );
  }

  const getPackColorScheme = (packName) => {
    switch (packName) {
      case "Gold":
        return "yellow";
      case "Silver":
        return "gray";
      case "Bronze":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Text
        fontSize="2xl"
        color={appColorTheme.brown_2}
        fontFamily="Montserrat"
        fontWeight="bold"
      >
        Quản lý gói dịch vụ
      </Text>

      <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        {Object.keys(groupedServicePacks).map((packName) => (
          <Box key={packName} mb={6}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb={3}
              display="flex"
              alignItems="center"
            >
              <Badge
                colorScheme={getPackColorScheme(packName)}
                fontSize="md"
                px={2}
                py={1}
                borderRadius="md"
                mr={2}
              >
                {getPackTypeLabel(packName)}
              </Badge>
              Gói dịch vụ
            </Text>

            <Table variant="simple" size="md" mb={4}>
              <Thead bg="gray.50">
                <Tr>
                  <Th>Thời hạn</Th>
                  <Th>Giá</Th>
                  <Th>Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {groupedServicePacks[packName].map((pack) => (
                  <Tr key={pack.servicePackId}>
                    <Td fontWeight="medium">{pack.duration} tháng</Td>
                    <Td fontWeight="bold" color="red.500">
                      {formatPrice(pack.price)}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Edit service pack price"
                        icon={<FiEdit2 />}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleEditClick(pack)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ))}
      </Box>

      {selectedServicePack && (
        <EditServicePackPriceModal
          isOpen={isOpen}
          onClose={onClose}
          servicePack={selectedServicePack}
          refetch={refetch}
        />
      )}
    </VStack>
  );
}
