import { useRef, useState, useEffect } from "react";
import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  VStack,
  Textarea,
  FormControl,
  FormLabel,
  Badge,
} from "@chakra-ui/react";
import SignatureCanvas from "react-signature-canvas";
import { appColorTheme } from "../../../../../../config/appconfig.js";
import { formatDateForInput } from "../../../../../../utils/utils.js";
import { FiSave, FiTrash2 } from "react-icons/fi";

export default function ContractEditSection({
  initialContract,
  onChange,
  onSaveSignature,
  savedSignature,
  order,
  isExistingContract,
}) {
  const [contract, setContract] = useState({
    warrantyPolicy: "",
    contractTotalAmount: 0,
    completeDate: formatDateForInput(
      new Date(new Date().setMonth(new Date().getMonth() + 1))
    ),
    warrantyPeriod: 12,
    woodworkerSignature: "",
    signatureData: null, // Store raw signature data for later upload
  });

  const signaturePad = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 200 });

  // Initialize contract data from existing contract (if any)
  useEffect(() => {
    if (initialContract) {
      setContract({
        warrantyPolicy: initialContract.warrantyPolicy || "",
        contractTotalAmount: initialContract.contractTotalAmount || 0,
        completeDate: formatDateForInput(initialContract.completeDate) || "",
        warrantyPeriod: initialContract.warrantyPeriod
          ? new Date(initialContract.warrantyPeriod).getMonth() -
            new Date().getMonth()
          : 12,
        woodworkerSignature: initialContract.woodworkerSignature || "",
        signatureData: null,
      });
    } else if (order?.totalAmount) {
      setContract((prev) => ({
        ...prev,
        contractTotalAmount: order.totalAmount,
      }));
    }
  }, [initialContract, order]);

  // Update signature data whenever the user finishes drawing
  useEffect(() => {
    if (!isExistingContract && signaturePad.current) {
      const updateSignatureData = () => {
        if (!signaturePad.current.isEmpty()) {
          const dataURL = signaturePad.current.toDataURL("image/png");
          setContract((prev) => ({
            ...prev,
            signatureData: dataURL,
          }));
        }
      };

      // Add an event listener to the signature pad element
      const canvas = signaturePad.current._canvas;
      canvas.addEventListener("mouseup", updateSignatureData);
      canvas.addEventListener("touchend", updateSignatureData);

      // Clean up the event listeners
      return () => {
        if (canvas) {
          canvas.removeEventListener("mouseup", updateSignatureData);
          canvas.removeEventListener("touchend", updateSignatureData);
        }
      };
    }
  }, [isExistingContract, canvasSize]);

  // Notify parent component of changes
  useEffect(() => {
    onChange && onChange(contract);
  }, [contract, onChange]);

  const handleChange = (field, value) => {
    setContract((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      return updated;
    });
  };

  // Handle signature actions
  const clearSignature = () => {
    if (signaturePad.current) {
      signaturePad.current.clear();
      handleChange("woodworkerSignature", "");
      handleChange("signatureData", null);
    }
  };

  const saveSignature = () => {
    if (signaturePad.current && !signaturePad.current.isEmpty()) {
      const dataURL = signaturePad.current.toDataURL("image/png");

      // Convert to blob for storage in parent component
      fetch(dataURL)
        .then((res) => res.blob())
        .then((blob) => {
          // Call the parent component's handler with both blob and dataURL
          onSaveSignature(blob, dataURL);
        });
    }
  };

  // Handle canvas size changes
  const handleSizeChange = (field, value) => {
    signaturePad.current.clear();
    setCanvasSize((prev) => ({
      ...prev,
      [field]: parseInt(value),
    }));
  };

  return (
    <Box>
      <Heading fontWeight="bold" fontSize="20px" mb={6} textAlign="center">
        Thông tin hợp đồng
      </Heading>

      <Stack spacing={6}>
        {/* Contract basic information */}
        <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Chính sách bảo hành:</FormLabel>
              <Textarea
                rows={4}
                value={contract.warrantyPolicy}
                onChange={(e) => handleChange("warrantyPolicy", e.target.value)}
                placeholder="Chính sách bảo hành"
              />
            </FormControl>

            <HStack>
              <FormControl isRequired>
                <FormLabel>Thời hạn bảo hành (tháng):</FormLabel>
                <NumberInput
                  value={contract.warrantyPeriod}
                  onChange={(value) => handleChange("warrantyPeriod", value)}
                  min={1}
                  max={120}
                  width="full"
                >
                  <NumberInputField placeholder="Thời hạn bảo hành" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>

            <HStack>
              <FormControl isRequired>
                <FormLabel>Ngày hoàn thành:</FormLabel>
                <Input
                  type="date"
                  value={contract.completeDate}
                  onChange={(e) => handleChange("completeDate", e.target.value)}
                />
              </FormControl>
            </HStack>
          </Stack>
        </Box>

        {/* Signature section - only shown for new contracts */}
        {!isExistingContract && (
          <Box
            p={5}
            bgColor={appColorTheme.grey_1}
            boxShadow="md"
            borderRadius="10px"
          >
            <Heading size="md" mb={4}>
              Chữ ký{" "}
              {savedSignature && (
                <Badge colorScheme="green" ml={2}>
                  Đã lưu
                </Badge>
              )}
            </Heading>

            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <HStack>
                  <Text fontWeight="bold" mb={2}>
                    Chiều rộng (px):
                  </Text>
                  <NumberInput
                    value={canvasSize.width}
                    onChange={(value) => handleSizeChange("width", value)}
                    min={200}
                    max={1000}
                    border="1px solid black"
                    borderRadius="8px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>

                <HStack>
                  <Text fontWeight="bold" mb={2}>
                    Chiều cao (px):
                  </Text>
                  <NumberInput
                    value={canvasSize.height}
                    onChange={(value) => handleSizeChange("height", value)}
                    min={100}
                    max={500}
                    border="1px solid black"
                    borderRadius="8px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>
              </HStack>

              <Text fontSize="sm" color="gray.600">
                Vui lòng ký tên vào khu vực bên dưới
              </Text>

              <VStack>
                <SignatureCanvas
                  backgroundColor="white"
                  ref={signaturePad}
                  canvasProps={{
                    width: canvasSize.width,
                    height: canvasSize.height,
                    className: "signature-canvas",
                    style: {
                      border: "2px solid black",
                      borderRadius: "0.375rem",
                    },
                  }}
                />
              </VStack>

              <HStack justifyContent="flex-end" mt={2} spacing={3}>
                <Button
                  onClick={saveSignature}
                  colorScheme="green"
                  leftIcon={<FiSave />}
                  isDisabled={savedSignature}
                >
                  Lưu
                </Button>
                <Button
                  onClick={clearSignature}
                  variant="outline"
                  colorScheme="red"
                  leftIcon={<FiTrash2 />}
                >
                  Xóa
                </Button>
              </HStack>
            </VStack>
          </Box>
        )}

        {/* For existing contracts, just show the signature */}
        {isExistingContract && contract.woodworkerSignature && (
          <Box
            p={5}
            bgColor={appColorTheme.grey_1}
            boxShadow="md"
            borderRadius="10px"
          >
            <Heading size="md" mb={4}>
              Chữ ký đã lưu
            </Heading>
            <Image
              src={contract.woodworkerSignature}
              alt="Chữ ký"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              maxH="200px"
              mx="auto"
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
