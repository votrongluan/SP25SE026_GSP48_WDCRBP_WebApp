import { useState, useEffect } from "react";
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
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../../config/appconfig.js";
import { formatDateForInput } from "../../../../../../utils/utils.js";
import SignatureComponent from "../../../../../../components/Common/SignatureComponent.jsx";

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

  // Handle signature save from SignatureComponent
  const handleSignatureSave = (blob, dataUrl) => {
    handleChange("signatureData", dataUrl);
    onSaveSignature && onSaveSignature(blob, dataUrl);
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

            <FormControl isRequired>
              <FormLabel>Ngày hoàn thành:</FormLabel>
              <Input
                type="date"
                value={contract.completeDate}
                onChange={(e) => handleChange("completeDate", e.target.value)}
              />
            </FormControl>
          </Stack>
        </Box>

        {/* Signature section - using the new component */}
        <Box
          p={5}
          bgColor={appColorTheme.grey_1}
          boxShadow="md"
          borderRadius="10px"
        >
          {!isExistingContract ? (
            <SignatureComponent
              onSaveSignature={handleSignatureSave}
              savedSignature={savedSignature}
              title="Chữ ký thợ"
            />
          ) : (
            <SignatureComponent
              initialSignature={contract.woodworkerSignature}
              isEditable={false}
              title="Chữ ký đã lưu"
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
}
