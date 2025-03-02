import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
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
import { HamburgerIcon } from "@chakra-ui/icons";
import ConfirmationDialog from "../../../components/Utility/ConfirmationDialog.jsx";
import axios from "../../../api/axios.js";
import PrintOrderDetailButton from "../../../components/Old/PrintOrderDetailButton.jsx";
import { useEffect, useState } from "react";
import PrintOrderUpdateButton from "../../../components/Old/PrintOrderUpdateButton.jsx";
import {
  printOrderStatusColorMap,
  printOrderStatusMap,
} from "../../../data/globalData.js";

export default function AllPrintOrder() {
  const [printOrder, setPrintOrder] = useState(null);

  function fetchAll() {
    axios
      .get(`/PrintOrder/GetAllPrintOrders`)
      .then((response) => {
        const data = response.data;
        setPrintOrder(data.filter((item) => item.status == 0));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchAll();
  }, []);

  if (!printOrder) return <Spinner />;

  return (
    <>
      <SearchFilter
        searchPlaceholder="Tìm theo tên, số điện thoại, địa chỉ"
        data={printOrder}
        methods={[{ value: "printOrderId", label: "Mã in" }]}
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
                      <Th>File Link</Th>
                      <Th>Email</Th>
                      <Th>SĐT</Th>
                      <Th>Giá</Th>
                      <Th>Trạng thái</Th>
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
                          <Link
                            color="app_brown.0"
                            target="_blank"
                            href={order.fileLink}
                          >
                            {order.fileLink}
                          </Link>
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
                              ? order.price
                              : "Chưa cập nhất giá tiền"}
                          </Text>
                        </Td>
                        <Td>
                          <Badge
                            color={printOrderStatusColorMap[order?.status]}
                            p="8px"
                          >
                            {printOrderStatusMap[order?.status]}
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
                                  <PrintOrderUpdateButton
                                    order={order}
                                    reFetch={fetchAll}
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
