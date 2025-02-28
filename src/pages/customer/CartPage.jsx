import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import CartItemDetail from "../../components/CartItemDetail";
import useCart from "../../hooks/useCart"; // Using custom hook for cart
import axios, { appURL } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export default function CartPage() {
  const { getCart, calculateTotalPrice, getNameById, clearCart } = useCart();
  const { orderId, incrementOrderId } = useContext(GlobalContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [note, setNote] = useState({}); // State for the notes (per employeeId)
  const [shipAddress, setShipAddress] = useState({}); // State for shipping addresses (per employeeId)

  const productsByEmployee = getCart().reduce((acc, curr) => {
    const { employeeId, products } = curr;
    if (!acc[employeeId]) {
      acc[employeeId] = { employeeId, products: [] };
    }
    acc[employeeId].products.push(...products);
    return acc;
  }, {});

  const handleNoteChange = (employeeId, value) => {
    setNote((prev) => ({ ...prev, [employeeId]: value }));
  };

  const handleAddressChange = (employeeId, value) => {
    setShipAddress((prev) => ({ ...prev, [employeeId]: value }));
  };

  const handleOrder = (employeeId) => {
    const orderDetail = productsByEmployee[employeeId].products.map((item) => {
      return {
        quantity: item.quantity,
        productId: item.productId,
      };
    });

    const postData = {
      note: note[employeeId] || "", // Specific note for employeeId
      shipAddress: shipAddress[employeeId] || auth?.Address, // Specific shipping address for employeeId
      orderDetail,
      paymentId: 2,
      employeeId: auth.EmployeeId,
      supplierId: employeeId, // EmployeeId acts as the supplierId in this case
      totalPrice: calculateTotalPrice(employeeId) + 0,
    };

    axios
      .post("/Order/AddNewSelling", postData)
      .then((response) => {
        clearCart(employeeId);

        const appOrderId = response.data[0].orderId;

        const paymentData = {
          orderId: orderId.toString(),
          description: `3dcreatify ma gd ${orderId}`,
          priceTotal: calculateTotalPrice(employeeId) + 0,
          returnUrl: `${appURL}/order/${appOrderId}?payStatus=true&orderId=${orderId}`,
          cancelUrl: `${appURL}/order/${appOrderId}`,
          items: [
            {
              productName: `Ma don ${appOrderId}`,
              quantity: 1,
              priceSingle: calculateTotalPrice(employeeId),
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
              .put(`/Order/UpdatePayOsOrderId?orderId=${appOrderId}`, {
                payOsOrderId: orderId,
                url: response.data,
              })
              .then((response) => {
                incrementOrderId();
                navigate(`/order/${appOrderId}`);
              })
              .catch((error) => {
                console.error("Error placing order", error);
              });
          })
          .catch((error) => {
            console.error("Error placing order", error);
          });
      })
      .catch((error) => {
        console.error("Error placing order", error);
      });
  };

  return (
    <Container w="90%" maxW="1400px" pb="100px">
      {Object.keys(productsByEmployee).map((employeeId) => (
        <Grid
          key={employeeId}
          columnGap="60px"
          px="5%"
          templateColumns="repeat(3, 1fr)"
        >
          <GridItem colSpan={{ base: 3, xl: 2 }} pb="20px">
            <Text
              pb="20px"
              borderBottom="1px solid rgba(256,256,256,0.4)"
              fontSize="20px"
            >
              Giỏ hàng - Nhà cung cấp: {getNameById(employeeId)}
            </Text>

            <Stack>
              {productsByEmployee[employeeId].products.map((product) => (
                <CartItemDetail key={product.productId} product={product} />
              ))}
            </Stack>
          </GridItem>

          <GridItem colSpan={{ base: 3, xl: 1 }} pb="20px">
            <Box mt="20px">
              <Text fontSize="20px" pb="20px">
                Thêm ghi chú
              </Text>
              <Textarea
                h="150px"
                fontSize="16px"
                color="app_black.0"
                placeholder="Hướng dẫn? Yêu cầu đặc biệt? Hãy thêm chúng tại đây"
                value={note[employeeId] || ""}
                onChange={(e) => handleNoteChange(employeeId, e.target.value)} // Handle note input per employeeId
              />
            </Box>

            <Box mt="20px">
              <Text fontSize="20px" pb="20px">
                Địa chỉ giao hàng
              </Text>
              <Input
                fontSize="16px"
                color="app_black.0"
                placeholder="Nhập địa chỉ giao hàng"
                value={shipAddress[employeeId] || auth?.Address}
                onChange={(e) =>
                  handleAddressChange(employeeId, e.target.value)
                } // Handle shipping address input per employeeId
              />
            </Box>

            <Box>
              <Text
                pb="20px"
                borderBottom="1px solid rgba(256,256,256,0.4)"
                fontSize="20px"
                mt="40px"
              >
                Tóm tắt đơn hàng
              </Text>

              <Stack
                borderBottom="1px solid rgba(256,256,256,0.4)"
                spacing="20px"
                py="20px"
                fontSize="16px"
              >
                <HStack>
                  <Text>Sản phẩm</Text>
                  <Spacer />
                  <Text>
                    {calculateTotalPrice(employeeId).toLocaleString()}đ
                  </Text>{" "}
                  {/* Dynamic total price */}
                </HStack>

                <HStack>
                  <Text>Giao hàng</Text>
                  <Spacer />
                  <Text>30.000đ</Text>
                </HStack>
              </Stack>

              <HStack fontSize="20px" py="20px">
                <Text>Tổng</Text>
                <Spacer />
                <Text>
                  {(calculateTotalPrice(employeeId) + 0).toLocaleString()}đ
                </Text>{" "}
                {/* Dynamic grand total */}
              </HStack>

              <Button
                _hover={{ opacity: ".8" }}
                w="100%"
                bgColor="app_brown.0"
                color="app_black.0"
                borderRadius="0"
                mt="40px"
                onClick={() => handleOrder(employeeId)} // Handle order for specific employeeId
              >
                Đặt hàng
              </Button>
            </Box>
          </GridItem>
        </Grid>
      ))}
    </Container>
  );
}
