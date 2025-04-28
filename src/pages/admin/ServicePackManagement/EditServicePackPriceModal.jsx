import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Text,
  Badge,
  useToast,
  FormHelperText,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatPrice } from "../../../utils/utils";
import { getPackTypeLabel } from "../../../config/appconfig";
import { useUpdateServicePackMutation } from "../../../services/servicePackApi";

export default function EditServicePackPriceModal({
  isOpen,
  onClose,
  servicePack,
  refetch,
}) {
  const [price, setPrice] = useState(servicePack?.price || 0);
  const [priceError, setPriceError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const [updateServicePack] = useUpdateServicePackMutation();

  // Reset form when modal opens with a new service pack
  useEffect(() => {
    if (servicePack) {
      setPrice(servicePack.price);
      setPriceError("");
    }
  }, [servicePack]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setPrice(value);
      setPriceError("");
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Price validation
    if (!price || price <= 0) {
      setPriceError("Giá phải lớn hơn 0");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Convert price to number
      const priceValue = parseInt(price);

      const result = await updateServicePack({
        servicePackId: servicePack.servicePackId,
        price: priceValue,
      }).unwrap();

      toast({
        title: "Thành công",
        description: "Cập nhật giá gói dịch vụ thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Refresh data
      refetch();
      onClose();
    } catch (error) {
      toast({
        title: "Lỗi",
        description:
          error.data?.message || "Đã xảy ra lỗi khi cập nhật giá gói dịch vụ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cập nhật giá gói dịch vụ</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="start">
            <Text
              fontSize="lg"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Badge
                colorScheme={getPackColorScheme(servicePack?.name)}
                fontSize="md"
                px={2}
                borderRadius="md"
              >
                {getPackTypeLabel(servicePack?.name)}
              </Badge>
              {servicePack?.duration} tháng
            </Text>

            <Divider />

            <FormControl isInvalid={!!priceError}>
              <FormLabel>Giá gói</FormLabel>
              <Input
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="Nhập giá gói"
              />
              {!priceError && (
                <FormHelperText>
                  {price > 0 && `Giá hiển thị: ${formatPrice(price)}`}
                </FormHelperText>
              )}
              <FormErrorMessage>{priceError}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            isDisabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Cập nhật
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
