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
  Link as ChakraLink,
  Tr,
} from "@chakra-ui/react";
import SearchFilter from "../../../components/Utility/SearchFilter.jsx";
import Pagination from "../../../components/Utility/Pagination.jsx";
import axios from "../../../api/axios.js";
import PrintOrderDetailButton from "../../../components/Old/PrintOrderDetailButton.jsx";
import PrintOrderUpdateButton from "../../../components/Old/PrintOrderUpdateButton.jsx";
import useAuth from "../../../hooks/useAuth.js";
import { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  printOrderStatusColorMap,
  printOrderStatusMap,
} from "../../../config/appconfig.js";
import OwnPrintOrderUpdateButton from "../../../components/Old/OwnPrintOrderUpdateButton.jsx";

export default function PrintManagePage() {
  const [printOrder, setPrintOrder] = useState(null);

  function fetchProductOrders() {
    axios
      .get(`/PrintOrder/GetAllPrintOrders`)
      .then((response) => {
        const data = response.data;
        setPrintOrder(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProductOrders();
  }, []);

  if (!printOrder) return <></>;

  return (
    <>
      <SearchFilter
        searchPlaceholder="Tìm theo tên, số điện thoại, địa chỉ"
        data={printOrder}
        methods={[
          { value: "name", label: "Tên khách hàng" },
          { value: "status", label: "Trạng thái" },
        ]}
        properties={["printOrderId"]}
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
                      <Th>File</Th>
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
                      <Tr key={order.printOrderId}>
                        <Td>
                          <Text>{order.printOrderId}</Text>
                        </Td>
                        <Td overflow="hidden" maxW="100px">
                          <ChakraLink
                            color="app_brown.0"
                            target="_blank"
                            href={order.fileLink}
                          >
                            {order.fileLink}
                          </ChakraLink>
                        </Td>
                        <Td>
                          <Text>
                            {new Date(order.date).toLocaleString("vi-VN")}
                          </Text>
                        </Td>
                        <Td>
                          <Text>{order.email}</Text>
                        </Td>
                        <Td>
                          <Text>{order.phone}</Text>
                        </Td>
                        <Td>
                          <Text>
                            {order?.price
                              ? order?.price?.toLocaleString() + " đ"
                              : "(Đang chờ)"}{" "}
                          </Text>
                        </Td>
                        <Td>
                          <Text>
                            <Badge
                              color={printOrderStatusColorMap[order?.status]}
                              p="8px"
                            >
                              {printOrderStatusMap[order?.status]}
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
                                  <PrintOrderDetailButton order={order} />
                                </MenuItem>
                                <MenuItem p="0">
                                  <OwnPrintOrderUpdateButton
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
