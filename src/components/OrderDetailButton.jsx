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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Flex,
  Text,
  useDisclosure,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { orderStatusMap } from "../data/globalData";
import axios, { appURL } from "../api/axios";

export default function OrderDetailButton({ order }) {
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  function calculatePrice(orderDetail, additional = 0) {
    let sum = additional;

    orderDetail.forEach((item) => (sum += item.products.price * item.quantity));

    return sum.toLocaleString();
  }

  const [paymentDetail, setPaymentDetail] = useState(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false); // Add state to control payment info display
  let payOSLink = "https://pay.payos.vn/web/";

  function fetchAll() {
    axios
      .get(`/Payment/GetOrder/${order.payOsOrderId}`)
      .then((response) => {
        const data = response.data;
        setPaymentDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleShowPaymentInfo = () => {
    fetchAll();
    setShowPaymentInfo(true); // Show payment info after fetching data
  };

  return (
    <>
      <Box p="8px" width="100%" onClick={onOpen}>
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
            <Flex wrap="wrap" spacing={8}>
              <Box flex="2">
                <Box boxShadow="sm" p={8}>
                  <Heading as="h2" size="sm" textAlign="center">
                    Thông tin đơn hàng
                  </Heading>
                  <FormControl mt={4}>
                    <FormLabel>
                      <Flex alignItems="center">
                        <Text>Mã đơn hàng </Text>
                        <Badge ml={2}>
                          {orderStatusMap[order.orderStatus]}
                        </Badge>
                      </Flex>
                    </FormLabel>
                    <Input
                      value={order.orderId}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Ngày đặt</FormLabel>
                    <Input
                      value={new Date(order.orderDate).toLocaleString("vi-VN")}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Tên</FormLabel>
                    <Input
                      value={order.customer[0].name}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input
                      value={order.customer[0].phone}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Địa chỉ giao hàng</FormLabel>
                    <Input
                      value={order.shipAddress}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={order.customer[0].email}
                      readOnly
                      _readOnly={{ bg: "gray.100" }}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Thành tiền</FormLabel>
                    <Input
                      _readOnly={{ bg: "gray.100" }}
                      value={`${calculatePrice(order.orderDetail, 0)}`}
                      readOnly
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Ghi chú của bạn</FormLabel>
                    <Textarea
                      _readOnly={{ bg: "gray.100" }}
                      value={order.note}
                      height="150px"
                      readOnly
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box flex="5">
                <Box boxShadow="sm" p={8}>
                  <Heading as="h2" size="sm" textAlign="center" mb={4}>
                    Sản phẩm
                  </Heading>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Mã sản phẩm</Th>
                        <Th>Tên sản phẩm</Th>
                        <Th>Ảnh</Th>
                        <Th>Giá tiền</Th>
                        <Th>Số lượng</Th>
                        <Th textAlign="end">Tổng cộng</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {order.orderDetail.map((order) => {
                        const product = order.products;

                        return (
                          <Tr key={product.productId}>
                            <Td>
                              <Link
                                noOfLines={1}
                                href={`${appURL}/products/${product.productId}`}
                                isExternal
                                color="teal.300"
                              >
                                {product.productId}
                              </Link>
                            </Td>
                            <Td>
                              <Text noOfLines={1}>{product.name}</Text>
                            </Td>
                            <Td>
                              <Image
                                src={product.img}
                                alt="Product Image"
                                w="100px"
                                objectFit="contain"
                              />
                            </Td>
                            <Td>{product.price.toLocaleString()}</Td>
                            <Td>
                              <Flex align="center" justify="center">
                                <Text mx={2}>{order.quantity}</Text>
                              </Flex>
                            </Td>
                            <Td textAlign="end">
                              <Text fontWeight="bold">
                                {(
                                  order.quantity * product.price
                                ).toLocaleString()}{" "}
                              </Text>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                  <Text fontWeight="bold" textAlign="end" pr={4} mt={4}>
                    Thành tiền: {calculatePrice(order.orderDetail)}đ
                  </Text>
                </Box>

                {/* Payment Info Section */}
                {!showPaymentInfo ? (
                  <Box textAlign="center" mt={4}>
                    <Button onClick={handleShowPaymentInfo}>
                      Hiển thị thông tin thanh toán
                    </Button>
                  </Box>
                ) : (
                  <Box boxShadow="sm" p={8} mt={4}>
                    <Heading as="h2" size="sm" textAlign="center" mb={4}>
                      Thông tin thanh toán
                    </Heading>

                    {paymentDetail ? (
                      <>
                        <Text mt={4}>
                          Tình trạng thanh toán: {paymentDetail?.status}
                        </Text>
                        <Text mt={4}>
                          Số tiền thanh toán:{" "}
                          {paymentDetail?.amount.toLocaleString()} đ
                        </Text>
                        <Text mt={4}>
                          Link thanh toán:{" "}
                          <Link href={paymentDetail?.id} color="teal.500">
                            {paymentDetail?.id}
                          </Link>
                        </Text>
                        <Text mt={4}>
                          Ngày tạo:{" "}
                          {new Date(paymentDetail?.createdAt).toLocaleString(
                            "vi-VN"
                          )}
                        </Text>
                      </>
                    ) : (
                      <Spinner />
                    )}
                  </Box>
                )}
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
