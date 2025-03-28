import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiEye } from "react-icons/fi";
import PropTypes from "prop-types";
import { appColorTheme } from "../../../../config/appconfig";
import { convertTimeStampToDateTimeString } from "../../../../utils/utils";

export default function TransactionDetailModal({ transaction }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Tooltip label="Chi tiết" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.brown_2}
          bg="none"
          border={`1px solid ${appColorTheme.brown_2}`}
          _hover={{ bg: appColorTheme.brown_2, color: "white" }}
          onClick={onOpen}
        >
          <FiEye />
        </Button>
      </Tooltip>

      <Modal
        size="4xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">Chi tiết giao dịch</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <Stack gap={6}>
              {/* Thông tin cơ bản */}
              <Box>
                <Heading size="md" mb={4}>
                  Thông tin giao dịch
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="sm">
                  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    <Box>
                      <Text fontWeight="bold">Mã giao dịch:</Text>
                      <Text>{transaction?.transactionId}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Loại giao dịch:</Text>
                      <Text
                        color={
                          transaction?.type === "Nạp ví"
                            ? "green.500"
                            : transaction?.type === "Thanh toán"
                            ? "red.500"
                            : "blue.500"
                        }
                      >
                        {transaction?.type}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Số tiền:</Text>
                      <Text
                        color={
                          transaction?.type === "Nạp ví"
                            ? "green.500"
                            : transaction?.type === "Thanh toán"
                            ? "red.500"
                            : "blue.500"
                        }
                        fontWeight="bold"
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(transaction?.amount)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Ngày tạo:</Text>
                      <Text>
                        {convertTimeStampToDateTimeString(
                          transaction?.createdAt
                        )}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Trạng thái:</Text>
                      <Text
                        color={
                          transaction?.status === "Thành công"
                            ? "green.500"
                            : transaction?.status === "Thất bại"
                            ? "red.500"
                            : "gray.500"
                        }
                      >
                        {transaction?.status}
                      </Text>
                    </Box>
                  </Grid>
                </Box>
              </Box>

              {/* Mô tả */}
              <Box>
                <Heading size="md" mb={4}>
                  Mô tả
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="sm">
                  <Text>{transaction?.description}</Text>
                </Box>
              </Box>
            </Stack>

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

TransactionDetailModal.propTypes = {
  transaction: PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};
