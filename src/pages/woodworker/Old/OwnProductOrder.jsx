import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import SearchFilter from "../../../components/Utility/SearchFilter.jsx";
import Pagination from "../../../components/Utility/Pagination.jsx";
import ProductUpdateButton from "../../../components/Old/ProductUpdateButton.jsx";
import ProductAddButton from "../../../components/Old/ProductAddButton.jsx";
import OrderDetailButton from "../../../components/Old/OrderDetailButton.jsx";
import OrderUpdateButton from "../../../components/Old/OrderUpdateButton.jsx";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import ConfirmationDialog from "../../../components/Utility/ConfirmationDialog.jsx";
import axios from "../../../api/axios.js";
import useAuth from "../../../hooks/useAuth.js";
import { useEffect, useState } from "react";
import { orderStatusColorMap, orderStatusMap } from "../../../config/appconfig.js";

export default function OwnProductOrder() {
  const { auth } = useAuth();
  const [productOrders, setProductOrders] = useState(null);

  function calculatePrice(orderDetail, additional = 0) {
    let sum = additional;

    orderDetail.forEach((item) => (sum += item.products.price * item.quantity));

    return sum.toLocaleString();
  }

  function fetchProductOrders() {
    axios
      .get(`/Order/GetOrderBySupplierId?supplierId=${auth.EmployeeId}`)
      .then((response) => {
        const data = response.data;
        setProductOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProductOrders();
  }, []);

  if (!productOrders) return <></>;

  return (
    <>
      <SearchFilter
        searchPlaceholder="Tìm theo mã đặt hàng"
        data={productOrders}
        methods={[
          { value: "orderId", label: "Mã đặt hàng" },
          { value: "orderDate", label: "Ngày đặt" },
          { value: "orderStatus", label: "Trạng thái" },
        ]}
        properties={["orderId"]}
        DisplayData={({ filteredData }) => (
          <Pagination
            itemsPerPage={2}
            data={filteredData}
            DisplayData={({ currentData }) => (
              <TableContainer bgColor="white" borderRadius="4px">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Mã</Th>
                      <Th>Sản phẩm</Th>
                      <Th>Ngày đặt</Th>
                      <Th>Email</Th>
                      <Th>SĐT</Th>
                      <Th>Giá</Th>
                      <Th>Trạng thái</Th>
                      <Th>Thanh toán</Th>
                      <Th textAlign="center">Thao tác</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentData.map((order) => (
                      <Tr key={order.orderId}>
                        <Td>
                          <Text>{order.orderId}</Text>
                        </Td>
                        <Td>
                          {order.orderDetail.map((e) => {
                            return (
                              <Text key={e.products.id}>
                                {e.products.name}
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginLeft: "20px",
                                  }}
                                >
                                  x{e.quantity}
                                </span>
                              </Text>
                            );
                          })}
                        </Td>
                        <Td>
                          <Text>
                            {new Date(order.orderDate).toLocaleString("vi-VN")}
                          </Text>
                        </Td>
                        <Td>
                          <Text>{order.customer[0].email}</Text>
                        </Td>
                        <Td>
                          <Text>{order.customer[0].phone}</Text>
                        </Td>
                        <Td>
                          <Text>{calculatePrice(order.orderDetail, 0)}</Text>
                        </Td>

                        <Td>
                          <Text>
                            <Badge
                              p="8px"
                              color={orderStatusColorMap[order.orderStatus]}
                            >
                              {orderStatusMap[order.orderStatus]}
                            </Badge>
                          </Text>
                        </Td>

                        <Td>
                          <Badge
                            colorScheme={order?.payStatus ? "green" : "blue"}
                            p="8px"
                          >
                            {order?.payStatus
                              ? "Đã thanh toán"
                              : "Chưa thanh toán"}
                          </Badge>
                        </Td>

                        <Td>
                          <Flex alignItems="center" columnGap="20px">
                            <Spacer />
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<HamburgerIcon />}
                                variant="outline"
                                color="black"
                              />
                              <MenuList
                                fontFamily="Nunito Sans"
                                color="white"
                                fontSize="16px"
                              >
                                <MenuItem p="0">
                                  <OrderDetailButton order={order} />
                                </MenuItem>
                                <MenuItem p="0">
                                  <OrderUpdateButton
                                    reFetch={fetchProductOrders}
                                    order={order}
                                  />
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          />
        )}
      />
    </>
  );
}
