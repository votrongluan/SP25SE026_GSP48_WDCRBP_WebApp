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
import SearchFilter from "../../components/SearchFilter.jsx";
import Pagination from "../../components/Pagination.jsx";
import ProductUpdateButton from "../../components/ProductUpdateButton.jsx";
import ProductAddButton from "../../components/ProductAddButton.jsx";
import OrderDetailButton from "../../components/OrderDetailButton.jsx";
import OrderUpdateButton from "../../components/OrderUpdateButton.jsx";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import axios from "../../api/axios.js";

export default function AllProductOrder() {
  const orders = [
    {
      id: 1,
      products: [
        {
          name: "Mô hình 1",
          quantity: 2,
        },
        {
          name: "Mô hình 2",
          quantity: 4,
        },
      ],
      date: "20/06/2024",
      email: "trongluan115@gmail.com",
      phone: "0972831212",
      price: "1.200.000đ",
      status: false,
    },
    {
      id: 2,
      products: [
        {
          name: "Mô hình 1",
          quantity: 2,
        },
        {
          name: "Mô hình 2",
          quantity: 4,
        },
      ],
      date: "20/06/2024",
      email: "trongluan115@gmail.com",
      phone: "0972831212",
      price: "1.200.000đ",
      status: false,
    },
    {
      id: 3,
      products: [
        {
          name: "Mô hình 1",
          quantity: 2,
        },
        {
          name: "Mô hình 2",
          quantity: 4,
        },
      ],
      date: "20/06/2024",
      email: "trongluan115@gmail.com",
      phone: "0972831212",
      price: "1.200.000đ",
      status: false,
    },
  ];

  return (
    <>
      <SearchFilter
        searchPlaceholder="Tìm theo tên, số điện thoại, địa chỉ"
        data={orders}
        methods={[{ value: "name", label: "Tên sản phẩm" }]}
        properties={["id"]}
        DisplayData={({ filteredData }) => (
          <Pagination
            itemsPerPage={2}
            data={filteredData}
            DisplayData={({ currentData }) => (
              <TableContainer bgColor="app_white.0" borderRadius="4px">
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
                      <Th textAlign="center">Thao tác</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentData.map((order) => (
                      <Tr key={order.id}>
                        <Td>
                          <Text>{order.id}</Text>
                        </Td>
                        <Td>
                          {order.products.map((e) => {
                            return (
                              <Text key={e.name}>
                                {e.name}
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
                          <Text>{order.date}</Text>
                        </Td>
                        <Td>
                          <Text>{order.email}</Text>
                        </Td>
                        <Td>
                          <Text>{order.phone}</Text>
                        </Td>
                        <Td>
                          <Text>{order.price}</Text>
                        </Td>
                        <Td>
                          <Text>
                            {order.status == true ? (
                              <Badge colorScheme="green" p="8px">
                                Đã xử lý
                              </Badge>
                            ) : (
                              <Badge p="8px">Chưa xử lý</Badge>
                            )}
                          </Text>
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
                                color="app_black.0"
                              />
                              <MenuList
                                fontFamily="Nunito Sans"
                                color="app_white.0"
                                fontSize="16px"
                              >
                                <MenuItem p="0">
                                  <OrderDetailButton />
                                </MenuItem>
                                <MenuItem p="0">
                                  <ConfirmationDialog
                                    title="Nhận đơn"
                                    onConfirm={async () => {}}
                                    colorScheme="red"
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
