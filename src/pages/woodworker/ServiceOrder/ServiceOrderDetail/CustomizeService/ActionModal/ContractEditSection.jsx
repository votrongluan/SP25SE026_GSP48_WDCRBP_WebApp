import { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import SignatureCanvas from "react-signature-canvas";
import { appColorTheme } from "../../../../../../config/appconfig.js";

const initialContract = {
  contractId: "",
  warrantyPolicy: "",
  contractTotalAmount: 0,
  completeDate: "",
  signDate: "",
  createdAt: new Date(),
  orderId: "",
  woodworkerSignature: "",
  cusFullName: "",
  cusAddress: "",
  cusPhone: "",
  warrantyPeriod: 0,
};

export default function ContractEditSection() {
  const [contract, setContract] = useState(initialContract);
  const [signatureImage, setSignatureImage] = useState(null);
  const signaturePad = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 200 });

  const handleChange = (field, value) => {
    setContract((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Xử lý ký tên
  const clearSignature = () => {
    signaturePad.current.clear();
    setSignatureImage(null);
  };

  const saveSignature = () => {
    if (signaturePad.current.isEmpty()) {
      alert("Vui lòng ký tên trước khi lưu");
      return;
    }
    const image = signaturePad.current.toDataURL();
    setSignatureImage(image);
    handleChange("woodworkerSignature", image);
  };

  // Xử lý thay đổi kích thước canvas
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
        {/* Thông tin cơ bản */}
        <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
          <Stack spacing={4}>
            <HStack>
              <Text fontWeight="bold" width="200px">
                Chính sách bảo hành:
              </Text>
              <Textarea
                rows={4}
                value={contract.warrantyPolicy}
                onChange={(e) => handleChange("warrantyPolicy", e.target.value)}
                placeholder="Chính sách bảo hành"
              />
            </HStack>

            <HStack>
              <Text fontWeight="bold" width="200px">
                Thời hạn bảo hành (tháng):
              </Text>
              <NumberInput
                value={contract.warrantyPeriod}
                onChange={(value) => handleChange("warrantyPeriod", value)}
                min={0}
                max={120}
                width="full"
              >
                <NumberInputField placeholder="Thời hạn bảo hành" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>

            <HStack>
              <Text fontWeight="bold" width="200px">
                Tổng giá trị hợp đồng:
              </Text>
              <NumberInput
                value={contract.contractTotalAmount}
                onChange={(value) => handleChange("contractTotalAmount", value)}
                min={0}
                width="full"
              >
                <NumberInputField placeholder="Tổng giá trị hợp đồng" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>

            <HStack>
              <Text fontWeight="bold" width="200px">
                Ngày hoàn thành:
              </Text>
              <Input
                type="date"
                value={contract.completeDate}
                onChange={(e) => handleChange("completeDate", e.target.value)}
              />
            </HStack>
          </Stack>
        </Box>

        {/* Phần ký tên */}
        <Box
          p={5}
          bgColor={appColorTheme.grey_1}
          boxShadow="md"
          borderRadius="10px"
        >
          <Heading size="md" mb={4}>
            Chữ ký
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

            <VStack>
              <SignatureCanvas
                backgroundColor="white"
                ref={signaturePad}
                canvasProps={{
                  width: canvasSize.width,
                  height: canvasSize.height,
                  className: "signature-canvas",
                }}
              />
            </VStack>

            <HStack spacing={4}>
              <Button onClick={saveSignature} colorScheme="green" width="150px">
                Lưu chữ ký
              </Button>
              <Button onClick={clearSignature} variant="outline" width="150px">
                Xóa
              </Button>
            </HStack>

            {signatureImage && (
              <VStack>
                <Text fontWeight="bold" mb={2}>
                  Xem trước chữ ký:
                </Text>
                <Image
                  src={signatureImage}
                  alt="Chữ ký"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                />
              </VStack>
            )}
          </VStack>
        </Box>
      </Stack>
    </Box>
  );
}
