import {
  Box,
  VStack,
  Text,
  HStack,
  Textarea,
  Button,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../config/appconfig";
import { FiEdit2 } from "react-icons/fi";
import { useNotify } from "../../../components/Utility/Notify";

export default function ServiceConfiguration() {
  const { notify } = useNotify();
  const [services, setServices] = useState({
    customization: {
      enabled: false,
      description:
        "Dịch vụ thiết kế và sản xuất đồ gỗ theo yêu cầu riêng của khách hàng",
    },
    repair: {
      enabled: true,
      description: "Dịch vụ sửa chữa, bảo trì và phục hồi đồ gỗ",
    },
    purchase: {
      enabled: true,
      description: "Dịch vụ mua bán các sản phẩm đồ gỗ có sẵn",
    },
    personal: {
      enabled: true,
      description: "Dịch vụ tư vấn và thiết kế không gian sống với đồ gỗ",
    },
  });

  const [editingService, setEditingService] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  const handleToggle = (service) => {
    setServices((prev) => {
      const newState = {
        ...prev,
        [service]: {
          ...prev[service],
          enabled: !prev[service].enabled,
        },
      };

      return newState;
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setEditDescription(services[service].description);
  };

  const handleUpdate = (service) => {
    setServices((prev) => ({
      ...prev,
      [service]: {
        ...prev[service],
        description: editDescription,
      },
    }));
    setEditingService(null);
    notify({
      title: "Cập nhật mô tả thành công",
      type: "success",
    });
  };

  const getServiceName = (service) => {
    switch (service) {
      case "customization":
        return "Dịch vụ Tùy chỉnh";
      case "repair":
        return "Dịch vụ Sửa chữa";
      case "purchase":
        return "Dịch vụ Mua hàng";
      case "personal":
        return "Dịch vụ Cá nhân";
      default:
        return "";
    }
  };

  return (
    <Box>
      <Text
        fontSize="2xl"
        color={appColorTheme.brown_2}
        fontFamily="Montserrat"
        fontWeight="bold"
        mb={6}
      >
        Quản lý Dịch vụ
      </Text>

      <VStack spacing={6} align="stretch">
        {Object.entries(services).map(([service, { enabled, description }]) => (
          <Box
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            key={service}
            p={5}
            transition="all 0.2s"
          >
            <HStack justify="space-between" mb={3}>
              <Text
                color={enabled ? appColorTheme.brown_2 : "black"}
                fontWeight="bold"
                fontSize="lg"
              >
                {getServiceName(service)} {!enabled ? "(Tạm dừng)" : ""}
              </Text>

              <Button
                size="sm"
                leftIcon={<FiEdit2 />}
                variant="outline"
                colorScheme="blue"
                onClick={() => handleEdit(service)}
              >
                Chỉnh sửa
              </Button>
            </HStack>

            {editingService === service ? (
              <VStack spacing={3} align="stretch">
                <HStack spacing={4}>
                  <Text>Kích hoạt</Text>

                  <Switch
                    isDisabled={editingService != service}
                    size="sm"
                    colorScheme="yellow"
                    isChecked={enabled}
                    onChange={() => handleToggle(service)}
                  />
                </HStack>

                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  placeholder="Nhập mô tả dịch vụ..."
                />

                <HStack justify="flex-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingService(null)}
                  >
                    Hủy
                  </Button>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleUpdate(service)}
                  >
                    Cập nhật
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Text>{description}</Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
