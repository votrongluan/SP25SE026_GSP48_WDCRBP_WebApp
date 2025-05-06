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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  FormHelperText,
  Divider,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatPrice } from "../../../utils/utils";
import { getPackTypeLabel } from "../../../config/appconfig";
import { useUpdateServicePackMutation } from "../../../services/servicePackApi";

export default function EditServicePackPriceModal({
  isOpen,
  onClose,
  servicePackGroup,
  refetch,
}) {
  const [postLimitPerMonth, setPostLimitPerMonth] = useState(0);
  const [productManagement, setProductManagement] = useState(false);
  const [personalization, setPersonalization] = useState(false);
  const [status, setStatus] = useState(false);

  // Track prices for each duration separately
  const [prices, setPrices] = useState({});
  const [priceErrors, setPriceErrors] = useState({});

  const [postLimitError, setPostLimitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const [updateServicePack] = useUpdateServicePackMutation();

  // Reset form when modal opens with a new service pack group
  useEffect(() => {
    if (servicePackGroup) {
      // Get common settings from first pack (they should all be the same)
      const firstPack = servicePackGroup.packs[0];
      setPostLimitPerMonth(firstPack.postLimitPerMonth);
      setProductManagement(firstPack.productManagement);
      setPersonalization(firstPack.personalization);
      setStatus(firstPack.status);

      // Initialize prices for each pack
      const newPrices = {};
      const newPriceErrors = {};

      servicePackGroup.packs.forEach((pack) => {
        newPrices[pack.servicePackId] = pack.price;
        newPriceErrors[pack.servicePackId] = "";
      });

      setPrices(newPrices);
      setPriceErrors(newPriceErrors);
      setPostLimitError("");
    }
  }, [servicePackGroup]);

  const handlePriceChange = (servicePackId, e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setPrices((prevPrices) => ({
        ...prevPrices,
        [servicePackId]: value,
      }));

      setPriceErrors((prevErrors) => ({
        ...prevErrors,
        [servicePackId]: "",
      }));
    }
  };

  const handlePostLimitChange = (valueAsString, valueAsNumber) => {
    setPostLimitPerMonth(valueAsNumber);
    setPostLimitError("");
  };

  const validateForm = () => {
    let isValid = true;
    const newPriceErrors = {};

    // Price validation for each pack
    Object.keys(prices).forEach((servicePackId) => {
      const price = prices[servicePackId];
      if (!price || price <= 0) {
        newPriceErrors[servicePackId] = "Giá phải lớn hơn 0";
        isValid = false;
      }
    });

    setPriceErrors(newPriceErrors);

    // Post limit validation
    if (postLimitPerMonth <= 0) {
      setPostLimitError("Số bài đăng phải lớn hơn 0");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Create promises for all service packs
      const updatePromises = servicePackGroup.packs.map((pack) => {
        return updateServicePack({
          servicePackId: pack.servicePackId,
          price: parseInt(prices[pack.servicePackId]),
          postLimitPerMonth: postLimitPerMonth,
          productManagement: productManagement,
          personalization: personalization,
          status: status,
        }).unwrap();
      });

      // Execute all updates
      await Promise.all(updatePromises);

      toast({
        title: "Thành công",
        description: "Cập nhật gói dịch vụ thành công",
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
          error.data?.message || "Đã xảy ra lỗi khi cập nhật gói dịch vụ",
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

  if (!servicePackGroup) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cập nhật gói dịch vụ</ModalHeader>
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
                colorScheme={getPackColorScheme(servicePackGroup.name)}
                fontSize="md"
                px={2}
                borderRadius="md"
              >
                {getPackTypeLabel(servicePackGroup.name)}
              </Badge>
              Gói dịch vụ
            </Text>

            <Divider />

            <Text fontWeight="bold">Cài đặt giá cho từng gói</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
              {servicePackGroup.packs.map((pack) => (
                <GridItem key={pack.servicePackId}>
                  <FormControl isInvalid={!!priceErrors[pack.servicePackId]}>
                    <FormLabel>Giá gói {pack.duration} tháng</FormLabel>
                    <Input
                      type="text"
                      value={prices[pack.servicePackId]}
                      onChange={(e) => handlePriceChange(pack.servicePackId, e)}
                      placeholder="Nhập giá gói"
                    />
                    {!priceErrors[pack.servicePackId] &&
                      prices[pack.servicePackId] > 0 && (
                        <FormHelperText>
                          {formatPrice(prices[pack.servicePackId])}
                        </FormHelperText>
                      )}
                    <FormErrorMessage>
                      {priceErrors[pack.servicePackId]}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              ))}
            </Grid>

            <Divider />

            <Box w="100%">
              <Text fontWeight="bold" mb={2}>
                Cài đặt chung cho gói dịch vụ
              </Text>
              <FormControl isInvalid={!!postLimitError} mb={3}>
                <FormLabel>Số bài đăng mỗi tháng</FormLabel>
                <NumberInput
                  value={postLimitPerMonth}
                  onChange={handlePostLimitChange}
                  min={1}
                  max={100}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{postLimitError}</FormErrorMessage>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Quản lý sản phẩm</FormLabel>
                <Switch
                  isChecked={productManagement}
                  onChange={(e) => setProductManagement(e.target.checked)}
                  colorScheme="green"
                  size="lg"
                />
                <FormHelperText>
                  Cho phép xưởng mộc quản lý danh sách sản phẩm và cung cấp dịch
                  vụ bán hàng tồn kho
                </FormHelperText>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Cá nhân hóa</FormLabel>
                <Switch
                  isChecked={personalization}
                  onChange={(e) => setPersonalization(e.target.checked)}
                  colorScheme="green"
                  size="lg"
                />
                <FormHelperText>
                  Cho phép xưởng mộc nhận các đơn hàng cá nhân hóa theo yêu cầu
                  của khách hàng
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Công khai gói dịch vụ</FormLabel>
                <Switch
                  isChecked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  colorScheme="green"
                  size="lg"
                />
                <FormHelperText>
                  Cho phép hiển thị gói dịch vụ này trên nền tảng
                </FormHelperText>
              </FormControl>
            </Box>
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
