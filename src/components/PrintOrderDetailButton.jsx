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
  Textarea,
  Box,
  Heading,
  Badge,
  Flex,
  Text,
  useDisclosure,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { Download } from "@mui/icons-material";
import { useRef, useState } from "react";
import {
  printOrderStatusColorMap,
  printOrderStatusMap,
} from "../data/globalData";
import axios from "../api/axios";

export default function PrintOrderDetailButton({ order }) {
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false); // State to control showing payment info
  let payOSLink = "https://pay.payos.vn/web/";

  function fetchPaymentInfo() {
    if (!order?.payOsOrderId) {
      setPaymentDetail({});
      return;
    }

    axios
      .get(`/Payment/GetOrder/${order.payOsOrderId}`)
      .then((response) => {
        const data = response.data;
        setPaymentDetail(data);
      })
      .catch((error) => {
        setPaymentDetail({});
      });
  }

  const handleShowPaymentInfo = () => {
    fetchPaymentInfo();
    setShowPaymentInfo(true); // Show payment info after fetching data
  };

  return (
    <>
      <Box p="8px" onClick={onOpen} width="100%">
        Chi tiết
      </Box>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="8xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Chi tiết đơn hàng
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Flex>
              <Box flex="1">
                <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
                  <Heading as="h2" size="sm" textAlign="center">
                    Thông tin đơn hàng
                  </Heading>
                  <FormControl mt={4}>
                    <FormLabel>
                      <Flex alignItems="center">
                        <Text>Mã đơn hàng </Text>
                        <Badge
                          p={2}
                          color={printOrderStatusColorMap[order?.status]}
                          ml={2}
                        >
                          {printOrderStatusMap[order?.status]}
                        </Badge>
                      </Flex>
                    </FormLabel>
                    <Input
                      value={order?.printOrderId}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl color="gray.400" mt={2}>
                    Đường dẫn đến thư mục
                    <Link
                      p="20px"
                      color="app_brown.0"
                      target="_blank"
                      href={order?.fileLink}
                      verticalAlign="baseline"
                    >
                      {order?.fileLink}
                    </Link>
                  </FormControl>
                  <FormControl mt={8}>
                    <FormLabel>Ngày đặt</FormLabel>
                    <Input
                      value={new Date(order?.date).toLocaleString()}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Tên</FormLabel>
                    <Input
                      value={order?.name}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input
                      value={order?.phone}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Địa chỉ giao hàng</FormLabel>
                    <Input
                      value={order?.shipAddress}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={order?.email}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Thành tiền</FormLabel>
                    <Input
                      _readOnly={{ bg: "gray.100" }}
                      value={
                        order?.price
                          ? order.price.toLocaleString()
                          : "Chưa cập nhật giá tiền"
                      }
                      readOnly
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Ghi chú của bạn</FormLabel>
                    <Textarea
                      _readOnly={{ bg: "gray.100" }}
                      value={order?.note}
                      height="150px"
                      readOnly
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box flex="2">
                <Box boxShadow="sm" p={8}>
                  <Heading as="h2" size="sm" textAlign="center" mb={4}>
                    Thông tin thanh toán
                  </Heading>

                  {!showPaymentInfo ? (
                    <Box textAlign="center" mt={4}>
                      <Button onClick={handleShowPaymentInfo}>
                        Hiển thị thông tin thanh toán
                      </Button>
                    </Box>
                  ) : paymentDetail ? (
                    <>
                      <Text mt={4}>
                        Tình trạng thanh toán:{" "}
                        {paymentDetail?.status || "Chưa có thông tin"}
                      </Text>
                      <Text mt={4}>
                        Số tiền thanh toán:{" "}
                        {paymentDetail?.amount?.toLocaleString() ||
                          "Chưa có thông tin"}{" "}
                        đ
                      </Text>
                      <Text mt={4}>
                        Link thanh toán:{" "}
                        <Link href={paymentDetail?.id} color="teal.500">
                          {paymentDetail?.id}
                        </Link>
                      </Text>
                      <Text mt={4}>
                        Ngày tạo:{" "}
                        {new Date(paymentDetail?.createdAt)?.toLocaleString(
                          "vi-VN"
                        )}
                      </Text>
                    </>
                  ) : (
                    <Spinner />
                  )}
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
