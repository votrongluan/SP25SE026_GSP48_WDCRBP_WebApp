import {
  Box,
  VStack,
  Text,
  HStack,
  Textarea,
  Button,
  Spinner,
  Center,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../config/appconfig";
import { FiEdit2, FiX, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import { useNotify } from "../../../components/Utility/Notify";
import {
  useGetAllConfigurationsQuery,
  useUpdateConfigurationMutation,
} from "../../../services/configurationApi";
import { formatDateTimeString } from "../../../utils/utils";

export default function ConfigurationManagementPage() {
  const notify = useNotify();
  const [showFullValue, setShowFullValue] = useState({});

  // Fetch configurations using the API
  const {
    data: configurationsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllConfigurationsQuery();

  const [updateConfiguration, { isLoading: isUpdating }] =
    useUpdateConfigurationMutation();

  const [editingConfiguration, setEditingConfiguration] = useState(null);
  const [editValue, setEditValue] = useState("");

  const toggleShowValue = (configId) => {
    setShowFullValue((prev) => ({
      ...prev,
      [configId]: !prev[configId],
    }));
  };

  const maskValue = (value, configId) => {
    if (!value) return "";
    if (showFullValue[configId]) return value;
    return value.substring(0, 3) + "*".repeat(Math.max(0, 10));
  };

  const handleEdit = (configItem) => {
    setEditingConfiguration(configItem.configurationId);
    setEditValue(configItem.value);
  };

  const handleCancel = () => {
    setEditingConfiguration(null);
    setEditValue("");
  };

  const handleUpdate = async (configId) => {
    try {
      await updateConfiguration({
        configurationId: configId,
        value: editValue,
      }).unwrap();

      refetch();
      setEditingConfiguration(null);
      notify("Cập nhật thành công", "", "success");
    } catch (error) {
      notify("Lỗi cập nhật", "Không thể cập nhật cấu hình", "error");
    }
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
      <Box textAlign="center" p={5}>
        <Text color="red.500" mb={4}>
          Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.
        </Text>
        <Button onClick={refetch} colorScheme="blue">
          Thử lại
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Text
          fontSize="2xl"
          color={appColorTheme.brown_2}
          fontFamily="Montserrat"
          fontWeight="bold"
          mb={6}
        >
          Quản lý Cấu hình Hệ thống
        </Text>

        <VStack spacing={6} align="stretch">
          {configurationsData?.data?.map((configItem) => (
            <Box
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              key={configItem.configurationId}
              p={5}
              transition="all 0.2s"
            >
              <HStack justify="space-between" mb={3}>
                <Text
                  color={appColorTheme.brown_2}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  {configItem.name}
                </Text>

                <Button
                  size="sm"
                  leftIcon={<FiEdit2 />}
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => handleEdit(configItem)}
                  isDisabled={isUpdating}
                >
                  Chỉnh sửa
                </Button>
              </HStack>

              {editingConfiguration === configItem.configurationId ? (
                <VStack spacing={3} align="stretch">
                  <FormControl>
                    <FormLabel>Giá trị</FormLabel>
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={3}
                      placeholder="Nhập giá trị cấu hình..."
                      isDisabled={isUpdating}
                    />
                  </FormControl>

                  <HStack justify="flex-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<FiX />}
                      onClick={handleCancel}
                      isDisabled={isUpdating}
                    >
                      Hủy
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      leftIcon={<FiCheck />}
                      onClick={() => handleUpdate(configItem.configurationId)}
                      isLoading={isUpdating}
                    >
                      Cập nhật
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Giá trị:</Text>
                    <HStack>
                      <Text>
                        {maskValue(
                          configItem.value,
                          configItem.configurationId
                        )}
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() =>
                          toggleShowValue(configItem.configurationId)
                        }
                      >
                        {showFullValue[configItem.configurationId] ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </Button>
                    </HStack>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Cập nhật lần cuối:</Text>
                    <Text>{formatDateTimeString(configItem.updatedAt)}</Text>
                  </HStack>
                </VStack>
              )}
            </Box>
          ))}
        </VStack>
      </Box>
    </>
  );
}
