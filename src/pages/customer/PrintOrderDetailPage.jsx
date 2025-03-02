import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Heading,
  Badge,
  Flex,
  Text,
  Container,
  Link,
  Spacer,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios, { appURL } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {
  printOrderStatusColorMap,
  printOrderStatusMap,
} from "../../data/globalData";
import { GlobalContext } from "../../context/GlobalContext";

export default function PrintOrderDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [isNewPaymentLoading, setIsNewPaymentLoading] = useState(false);
  const { id } = useParams();
  const toast = useToast();
  const { auth } = useAuth();
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [order, setOrder] = useState(null);
  const { orderId, incrementOrderId } = useContext(GlobalContext);

  function refreshPayment() {
    if (!order?.price || order?.status == 4 || order?.status == 1) {
      toast({
        title: "Đơn in chưa được cập nhật giá",
        description: "Số tiền không hợp lệ",
        status: "info",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    setIsNewPaymentLoading(true);

    const paymentData = {
      orderId: orderId.toString(),
      description: `3dcreatify ma gd ${orderId}`,
      priceTotal: order.price,
      returnUrl: `${appURL}/printorder/${id}?payStatus=true&orderId=${orderId}`,
      cancelUrl: `${appURL}/printorder/${id}`,
      items: [
        {
          productName: `Ma don in ${id}`,
          quantity: 1,
          priceSingle: order.price,
        },
      ],
    };

    axios
      .post("/Payment/CreatePayment", paymentData, {
        headers: {
          "Content-Type": "application/json", // Explicitly set the content type
        },
      })
      .then((response) => {
        axios
          .put(`/PrintOrder/UpdatePayOsOrderId?printOrderId=${id}`, {
            payOsOrderId: orderId,
            url: response.data,
          })
          .then((response) => {
            incrementOrderId();
            setIsNewPaymentLoading(false);
            fetchProductOrders();
          })
          .catch((error) => {
            console.error("Error placing order", error);
          });
      })
      .catch((error) => {
        console.error("Error placing order", error);
      });
  }

  function fetchProductOrders() {
    axios
      .get(`/PrintOrder/GetAllPrintOrders`)
      .then((response) => {
        const data = response.data;
        const tmpOrder = data.find(
          (item) =>
            item.printOrderId == id && item.customerId == auth.EmployeeId
        );
        setOrder(tmpOrder);
        const payOsOrderId = tmpOrder.payOsOrderId;

        axios
          .get(`/Payment/GetOrder/${payOsOrderId}`)
          .then((response) => {
            const data = response.data;
            console.log(data);
            setPaymentDetail(data);

            if (
              searchParams.get("payStatus") == "true" &&
              searchParams.get("orderId") == searchParams.get("orderCode") &&
              searchParams.get("code") &&
              searchParams.get("id") &&
              searchParams.get("cancel") &&
              searchParams.get("status")
            ) {
              axios
                .put(`/PrintOrder/UpdatePayStatus?printOrderId=${id}`)
                .then(() => {
                  window.location.href = `${appURL}/printorder/${id}`;
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProductOrders();
  }, []);

  if (!order) {
    return <></>;
  } else {
    return (
      <>
        <Container w="90%" maxW="1400px" pb="100px">
          <Box height="80px">
            <Heading
              fontWeight="normal"
              as="h2"
              fontSize="26px"
              fontFamily="Montserrat"
              textAlign="center"
            >
              Chi tiết đơn in
            </Heading>
          </Box>

          <Box borderRadius="10px" bg="white" color="white">
            <Flex wrap="wrap" spacing={8}>
              <Box flex="1" boxShadow="sm" p={8}>
                <Heading as="h2" size="sm" textAlign="center">
                  Thông tin đơn in
                </Heading>

                <FormControl mt={4}>
                  <FormLabel>
                    <Flex alignItems="center">
                      <Text>Mã đơn hàng </Text>
                      <Badge
                        color={printOrderStatusColorMap[order.status]}
                        p={2}
                        ml={2}
                      >
                        {printOrderStatusMap[order.status]}
                      </Badge>
                    </Flex>
                  </FormLabel>
                  <Input
                    value={order.printOrderId}
                    readOnly
                    _readOnly={{ bg: "gray.100" }}
                  />
                </FormControl>

                <Text mt={4} fontWeight="bold">
                  Đường dẫn đến thư mục:{" "}
                  <Link href={order.fileLink} isExternal color="app_brown.0">
                    {order.fileLink}
                  </Link>
                </Text>

                <FormControl mt={4}>
                  <FormLabel>Thành tiền</FormLabel>
                  <Input
                    _readOnly={{ bg: "gray.100" }}
                    value={
                      order?.price
                        ? order?.price?.toLocaleString() + " đ"
                        : "Chưa cập nhật giá tiền"
                    }
                    readOnly
                    fontWeight="bold"
                  />
                </FormControl>

                <FormControl mt={8}>
                  <FormLabel>Ngày đặt</FormLabel>
                  <Input
                    value={new Date(order?.date)?.toLocaleString("vi-VN")}
                    readOnly
                    _readOnly={{ bg: "gray.100" }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Tên</FormLabel>
                  <Input
                    value={order.name}
                    readOnly
                    _readOnly={{ bg: "gray.100" }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    value={order.phone}
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
                    value={order.email}
                    readOnly
                    _readOnly={{ bg: "gray.100" }}
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

                <Flex columnGap={4}>
                  <Spacer />

                  {[0, 1].includes(order?.status) && (
                    <Button
                      _hover={{
                        backgroundColor: "white",
                        color: "black",
                      }}
                      px="40px"
                      py="25px"
                      bgColor="red"
                      color="black"
                      borderRadius="40px"
                      mt="40px"
                      zIndex="1"
                      type="submit"
                      onClick={() => {
                        axios
                          .put(
                            `/PrintOrder/UpdatePrintOrderStatus?printOrderId=${order.printOrderId}`,
                            {
                              status: 4,
                              price: order?.price,
                              supplierId: order?.supplierId,
                            }
                          )
                          .then((response) => {
                            toast({
                              title: `${order.printOrderId} đã cập nhật thành công`,
                              status: "success",
                              duration: 500,
                              isClosable: true,
                            });

                            fetchProductOrders();
                          })
                          .catch((error) => {
                            console.error("Error placing order", error);
                          });
                      }}
                    >
                      Hủy đơn in
                    </Button>
                  )}

                  {order?.status == 1 && (
                    <Button
                      _hover={{
                        backgroundColor: "white",
                        color: "black",
                      }}
                      px="40px"
                      py="25px"
                      bgColor="app_brown.0"
                      color="black"
                      borderRadius="40px"
                      mt="40px"
                      zIndex="1"
                      type="submit"
                      onClick={() => {
                        axios
                          .put(
                            `/PrintOrder/UpdatePrintOrderStatus?printOrderId=${order.printOrderId}`,
                            {
                              status: 2,
                              price: order?.price,
                              supplierId: order?.supplierId,
                            }
                          )
                          .then((response) => {
                            toast({
                              title: `${order.printOrderId} đã cập nhật thành công`,
                              status: "success",
                              duration: 500,
                              isClosable: true,
                            });

                            fetchProductOrders();
                          })
                          .catch((error) => {
                            console.error("Error placing order", error);
                          });
                      }}
                    >
                      Xác nhận đơn in
                    </Button>
                  )}
                </Flex>
              </Box>

              <Box flex="2">
                {!isNewPaymentLoading ? (
                  <Box boxShadow="sm" p={8}>
                    <Heading as="h2" size="sm" textAlign="center" mb={4}>
                      Thông tin thanh toán
                    </Heading>

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
                    {order?.payStatus != true && (
                      <Text mt={12}>
                        <Link
                          onClick={refreshPayment}
                          cursor={"pointer"}
                          color="teal.500"
                        >
                          Tạo link thanh toán mới
                        </Link>
                      </Text>
                    )}
                  </Box>
                ) : (
                  <Spinner />
                )}
              </Box>
            </Flex>
          </Box>
        </Container>
      </>
    );
  }
}
