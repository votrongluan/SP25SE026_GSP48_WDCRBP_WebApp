import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Divider,
  useDisclosure,
  Box,
  Grid,
  GridItem,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNotify } from "../../../../../../components/Utility/Notify";
import { FiCheck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import CheckboxList from "../../../../../../components/Utility/CheckboxList";
import { appColorTheme } from "../../../../../../config/appconfig";
import { format } from "date-fns";
import useAuth from "../../../../../../hooks/useAuth";
import {
  useGetContractByServiceOrderIdQuery,
  useCusSignContractMutation,
} from "../../../../../../services/contractApi";
import SignatureComponent from "../../../../../../components/Common/SignatureComponent";
import { useImageUpload } from "../../../../../../hooks/useImageUpload";

export default function ContractConfirmModal({
  serviceOrderId,
  buttonText = "Xác nhận hợp đồng",
  refetch,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notify = useNotify();
  const { auth } = useAuth();
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);
  const { uploadImage } = useImageUpload();

  // Signature state
  const [savedSignature, setSavedSignature] = useState(false);
  const [localSignatureBlob, setLocalSignatureBlob] = useState(null);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);

  // Get contract data
  const {
    data: contractResponse,
    isLoading: contractLoading,
    error: contractError,
  } = useGetContractByServiceOrderIdQuery(serviceOrderId, {
    skip: !isOpen, // Only fetch when modal is open
  });

  // Customer sign contract mutation
  const [confirmContract, { isLoading: confirmLoading }] =
    useCusSignContractMutation();

  const checkboxItems = [
    {
      description: "Tôi đã đọc và đồng ý với các điều khoản trong hợp đồng",
      isOptional: false,
    },
    {
      description: "Tôi xác nhận ký hợp đồng điện tử này",
      isOptional: false,
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy");
    } catch (e) {
      return "";
    }
  };

  // Handle signature save callback
  const handleSaveSignature = (blob, dataUrl) => {
    setLocalSignatureBlob(blob);
    setSignatureDataUrl(dataUrl);
    setSavedSignature(true);
    notify("Lưu chữ ký", "Chữ ký đã được lưu thành công", "success");
  };

  const handleSubmit = async () => {
    try {
      // Set loading state
      const isUploading = savedSignature && localSignatureBlob;
      if (isUploading) {
        notify("Đang xử lý", "Đang tải chữ ký lên hệ thống", "info");
      }

      let customerSign = auth?.username || "Electronic signature";

      // If we have a signature, upload it
      if (savedSignature && localSignatureBlob) {
        try {
          // Create file from blob
          const file = new File(
            [localSignatureBlob],
            `signature-${Date.now()}.png`,
            {
              type: "image/png",
            }
          );

          // Upload to your image storage
          const result = await uploadImage(file);
          customerSign = result.url;
        } catch (error) {
          notify(
            "Lỗi tải chữ ký",
            "Không thể tải chữ ký lên hệ thống, sử dụng chữ ký điện tử mặc định",
            "warning"
          );
        }
      }

      await confirmContract({
        serviceOrderId,
        customerSign: "sss",
        cusId: auth?.userId,
      }).unwrap();

      notify(
        "Xác nhận hợp đồng thành công",
        "Hợp đồng đã được xác nhận và đơn hàng của bạn đã được cập nhật",
        "success"
      );

      onClose();
      refetch(); // Refresh data
    } catch (err) {
      notify(
        "Xác nhận thất bại",
        err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
    }
  };

  const isLoading = contractLoading || confirmLoading;
  const contract = contractResponse?.data;

  return (
    <>
      <Button leftIcon={<FiCheckCircle />} colorScheme="green" onClick={onOpen}>
        {buttonText}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={isLoading ? null : onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{buttonText}</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Text fontSize="lg" fontWeight="bold">
                Chi tiết hợp đồng
              </Text>

              {contractLoading ? (
                <Center p={4}>
                  <Spinner size="lg" color={appColorTheme.brown_2} />
                </Center>
              ) : contractError ? (
                <Box p={4} bg="red.50" borderRadius="md">
                  <Text color="red.500">Không thể tải thông tin hợp đồng</Text>
                </Box>
              ) : contract ? (
                <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                  <Grid templateColumns="180px 1fr" gap={3}>
                    <GridItem>
                      <Text fontWeight="semibold">Mã hợp đồng:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{contract.contractId}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="semibold">Ngày hoàn thành:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{formatDate(contract.completeDate)}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="semibold">Chính sách bảo hành:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{contract.warrantyPolicy || "Không có"}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="semibold">Tổng tiền thanh toán:</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontWeight="bold" color={appColorTheme.brown_2}>
                        {contract.contractTotalAmount?.toLocaleString("vi-VN")}{" "}
                        VNĐ
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="semibold">Hạn bảo hành đến:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{formatDate(contract.warrantyPeriod)}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="semibold">Thợ thực hiện:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{contract.woodworker?.username}</Text>
                    </GridItem>
                  </Grid>

                  <Box mt={4}>
                    <Text fontWeight="semibold">Chữ ký thợ:</Text>
                    {contract.woodworkerSignature ? (
                      <Box mt={2}>
                        <img
                          src={contract.woodworkerSignature}
                          alt="Chữ ký thợ"
                          style={{ maxWidth: "200px" }}
                        />
                      </Box>
                    ) : (
                      <Text>Chưa có chữ ký</Text>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box p={4} bg="orange.50" borderRadius="md">
                  <Text>Không tìm thấy thông tin hợp đồng</Text>
                </Box>
              )}

              {/* Add customer signature section */}
              {!contractLoading && contract && (
                <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                  <Text fontSize="md" fontWeight="bold" mb={3}>
                    Ký tên xác nhận hợp đồng
                  </Text>

                  <SignatureComponent
                    onSaveSignature={handleSaveSignature}
                    savedSignature={savedSignature}
                    title="Chữ ký của bạn"
                    showSizeControls={false}
                  />
                </Box>
              )}

              <Box p={4} bg="blue.50" borderRadius="md">
                <Text>
                  Khi xác nhận, bạn đồng ý với tất cả các điều khoản trong hợp
                  đồng. Việc xác nhận này có giá trị pháp lý tương đương với
                  việc ký hợp đồng giấy.
                </Text>
              </Box>

              <Divider my={2} />
              <CheckboxList
                items={checkboxItems}
                setButtonDisabled={setIsCheckboxDisabled}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              variant="ghost"
              mr={3}
              onClick={onClose}
              leftIcon={<FiXCircle />}
              isDisabled={isLoading}
            >
              Đóng
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={confirmLoading}
              isDisabled={isCheckboxDisabled || !contract || contractLoading}
              leftIcon={<FiCheck />}
            >
              Xác nhận hợp đồng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
