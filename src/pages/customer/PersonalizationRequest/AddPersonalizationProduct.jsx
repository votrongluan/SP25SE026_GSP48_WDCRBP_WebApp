import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import ImageUpdateUploader from "../../../components/Utility/ImageUpdateUploader.jsx";
import ActionButton from "../../../components/Button/ActionButton.jsx";
import AutoCompleteInput from "./AutoCompleteInput.jsx";

export default function AddPersonalizationProduct({
  techSpecs = [],
  productData = {},
  setProductData,
  handleAddProduct,
  isEditing = false,
  onCancelEdit,
}) {
  // Handle form input changes
  const handleInputChange = (techSpecId, value) => {
    setProductData({
      ...productData,
      [`techSpec_${techSpecId}`]: value,
    });
  };

  // Handle quantity changes
  const handleQuantityChange = (value) => {
    if (value < 1) value = 1;
    if (value > 4) value = 4;
    setProductData({
      ...productData,
      quantity: value,
    });
  };

  // Handle file upload completion
  const handleImageUploadComplete = (techSpecId, imageUrls) => {
    handleInputChange(techSpecId, imageUrls);
  };

  // Get required tech specs (dimensions)
  const getRequiredTechSpecs = () => {
    return techSpecs
      .filter((spec) => spec.optionType === "number")
      .map((spec) => spec.techSpecId);
  };

  // Render appropriate input for each tech spec type
  const renderInput = (techSpec) => {
    const value = productData[`techSpec_${techSpec.techSpecId}`] || "";

    switch (techSpec.optionType) {
      case "number":
        return (
          <NumberInput
            min={1}
            value={value}
            onChange={(valueString) =>
              handleInputChange(techSpec.techSpecId, valueString)
            }
          >
            <NumberInputField
              placeholder={`Nhập ${techSpec.name.toLowerCase()}`}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );

      case "select":
        return (
          <AutoCompleteInput
            options={techSpec.values || []}
            value={value}
            onChange={(newValue) =>
              handleInputChange(techSpec.techSpecId, newValue)
            }
            placeholder={`Chọn ${techSpec.name.toLowerCase()}`}
          />
        );

      case "file":
        return (
          <ImageUpdateUploader
            imgUrls={value} // Pass the current image URLs
            maxFiles={1}
            onUploadComplete={(imgUrls) =>
              handleImageUploadComplete(techSpec.techSpecId, imgUrls)
            }
          />
        );

      case "text":
      default:
        return (
          <Input
            placeholder={`Nhập ${techSpec.name.toLowerCase()}`}
            value={value}
            onChange={(e) =>
              handleInputChange(techSpec.techSpecId, e.target.value)
            }
          />
        );
    }
  };

  // Get the required tech spec IDs
  const requiredTechSpecIds = getRequiredTechSpecs();

  return (
    <Box>
      <Box bgColor="white" p="20px" borderRadius="10px">
        <Heading fontWeight="bold" fontSize="20px" mb={4}>
          {isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </Heading>

        {techSpecs.map((techSpec) => (
          <FormControl
            key={techSpec.techSpecId}
            mt={4}
            isRequired={requiredTechSpecIds.includes(techSpec.techSpecId)}
          >
            <FormLabel>{techSpec.name}</FormLabel>
            {renderInput(techSpec)}
          </FormControl>
        ))}

        <FormControl mt={4} isRequired>
          <FormLabel>Số lượng ({productData.quantity}/4)</FormLabel>
          <Flex align="center">
            <NumberInput
              min={1}
              max={4}
              value={productData.quantity || 1}
              onChange={(valueString) =>
                handleQuantityChange(parseInt(valueString))
              }
              maxW="100px"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text ml={2} color="gray.500">
              Tối đa 4 sản phẩm
            </Text>
          </Flex>
        </FormControl>

        <Flex mt={6}>
          <Spacer />
          {isEditing && (
            <ButtonGroup spacing={4}>
              <ActionButton
                text="Hủy"
                bgColor="gray.400"
                onClickExeFn={onCancelEdit}
              />
              <ActionButton text="Cập nhật" onClickExeFn={handleAddProduct} />
            </ButtonGroup>
          )}
          {!isEditing && (
            <ActionButton text="+ Thêm" onClickExeFn={handleAddProduct} />
          )}
        </Flex>
      </Box>
    </Box>
  );
}
