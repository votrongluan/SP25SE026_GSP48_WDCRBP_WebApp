import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
  Spinner,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../config/appconfig";
import { FiEdit2, FiSave } from "react-icons/fi";
import { useNotify } from "../../../components/Utility/Notify";
import {
  useGetAllServiceDepositsQuery,
  useUpdateServiceDepositMutation,
} from "../../../services/serviceDepositApi";

const getServiceTypeLabel = function (type) {
  const map = {
    Customization: "Tùy chỉnh",
    Personalization: "Cá nhân hóa",
    Guarantee: "Sửa chữa",
  };
  return map[type] || type;
};

export default function ServiceDepositManagement() {
  const notify = useNotify();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch service deposits using the API
  const {
    data: serviceDepositsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllServiceDepositsQuery();

  const [updateServiceDeposit, { isLoading: isUpdating }] =
    useUpdateServiceDepositMutation();

  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editedDeposits, setEditedDeposits] = useState([]);
  const [totalPercent, setTotalPercent] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  // Filter services with more than one deposit item
  const filteredServices =
    serviceDepositsData?.data?.filter(
      (serviceItem) => serviceItem.serviceDeposits.length > 1
    ) || [];

  const handleEdit = (serviceItem) => {
    setEditingServiceId(serviceItem.service.serviceId);
    setEditedDeposits(
      serviceItem.serviceDeposits.map((deposit) => ({
        ...deposit,
        newPercent: deposit.percent,
      }))
    );
    calculateTotal(serviceItem.serviceDeposits.map((d) => d.percent));
    setSelectedService(serviceItem);
    onOpen();
  };

  const calculateTotal = (percentValues) => {
    const sum = percentValues.reduce((acc, val) => acc + (Number(val) || 0), 0);
    setTotalPercent(sum);
    return sum;
  };

  const handlePercentChange = (index, value) => {
    const newValue = value === "" ? "" : Number(value);
    const updatedDeposits = [...editedDeposits];
    updatedDeposits[index] = {
      ...updatedDeposits[index],
      newPercent: newValue,
    };

    setEditedDeposits(updatedDeposits);

    const newPercentValues = updatedDeposits.map((d) => d.newPercent || 0);
    calculateTotal(newPercentValues);
  };

  const handleCancel = () => {
    setEditingServiceId(null);
    setEditedDeposits([]);
    setErrorMessage("");
    onClose();
  };

  const validateBeforeSubmit = () => {
    // Check for empty or invalid values
    const hasInvalidValues = editedDeposits.some(
      (deposit) => deposit.newPercent === "" || deposit.newPercent < 0
    );

    if (hasInvalidValues) {
      setErrorMessage("Tất cả các giá trị phần trăm phải lớn hơn hoặc bằng 0");
      return false;
    }

    // Check if total is 100%
    if (totalPercent !== 100) {
      setErrorMessage("Tổng phần trăm phải bằng 100%");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleUpdate = async () => {
    if (!validateBeforeSubmit()) {
      return;
    }

    try {
      const requestBody = {
        serviceId: editingServiceId,
        deposits: editedDeposits.map((deposit) => ({
          serviceDepositId: deposit.serviceDepositId,
          newPercent: deposit.newPercent,
        })),
      };

      await updateServiceDeposit(requestBody).unwrap();

      refetch();
      setEditingServiceId(null);
      setEditedDeposits([]);
      notify("Cập nhật thành công", "", "success");
      onClose();
    } catch (error) {
      notify(
        "Lỗi cập nhật",
        "Không thể cập nhật cấu hình tỉ lệ đặt cọc",
        "error"
      );
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
    <Box>
      <Text
        fontSize="2xl"
        color={appColorTheme.brown_2}
        fontFamily="Montserrat"
        fontWeight="bold"
        mb={6}
      >
        Quản lý Tỉ lệ Đặt cọc
      </Text>

      {filteredServices.length === 0 ? (
        <Text>Không có dịch vụ nào có nhiều hơn một lần đặt cọc.</Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {filteredServices.map((serviceItem) => (
            <Box
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              key={serviceItem.service.serviceId}
              p={5}
              transition="all 0.2s"
            >
              <HStack justify="space-between" mb={3}>
                <Text
                  color={appColorTheme.brown_2}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  {getServiceTypeLabel(serviceItem.service.serviceName)}
                </Text>

                <Button
                  size="sm"
                  leftIcon={<FiEdit2 />}
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => handleEdit(serviceItem)}
                  isDisabled={isUpdating}
                >
                  Chỉnh sửa
                </Button>
              </HStack>

              <Table variant="simple" size="lg">
                <Thead>
                  <Tr>
                    <Th>Lần đặt cọc</Th>
                    <Th>Mô tả</Th>
                    <Th isNumeric>Phần trăm (%)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[...serviceItem.serviceDeposits]
                    .sort((a, b) => a.depositNumber - b.depositNumber)
                    .map((deposit) => (
                      <Tr key={deposit.serviceDepositId}>
                        <Td>{deposit.depositNumber}</Td>
                        <Td>{deposit.description}</Td>
                        <Td isNumeric>{deposit.percent}%</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          ))}
        </VStack>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Chỉnh sửa tỉ lệ đặt cọc -{" "}
            {selectedService &&
              getServiceTypeLabel(selectedService.service.serviceName)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>
                Điều chỉnh phần trăm cho từng lần đặt cọc. Tổng phần trăm phải
                bằng 100%.
              </Text>
              {errorMessage && (
                <Text color="red.500" fontSize="sm">
                  {errorMessage}
                </Text>
              )}
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Lần</Th>
                    <Th>Mô tả</Th>
                    <Th isNumeric>Phần trăm (%)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[...editedDeposits]
                    .sort((a, b) => a.depositNumber - b.depositNumber)
                    .map((deposit, index) => (
                      <Tr key={deposit.serviceDepositId}>
                        <Td>{deposit.depositNumber}</Td>
                        <Td>{deposit.description}</Td>
                        <Td isNumeric>
                          <Input
                            value={deposit.newPercent}
                            onChange={(e) =>
                              handlePercentChange(index, e.target.value)
                            }
                            type="number"
                            size="sm"
                            width="80px"
                            min="0"
                            max="100"
                          />
                        </Td>
                      </Tr>
                    ))}
                  <Tr>
                    <Td colSpan={2} fontWeight="bold" textAlign="right">
                      Tổng:
                    </Td>
                    <Td
                      isNumeric
                      fontWeight="bold"
                      color={totalPercent === 100 ? "green.500" : "red.500"}
                    >
                      {totalPercent}%
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<FiSave />}
              onClick={handleUpdate}
              isLoading={isUpdating}
              isDisabled={totalPercent !== 100}
            >
              Lưu thay đổi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
