import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
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
  useToast,
} from "@chakra-ui/react";
import SearchFilter from "../../components/Utilities/SearchFilter.jsx";
import axios from "../../api/axios.js";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import Pagination from "../../components/Utilities/Pagination.jsx";
import ProductUpdateButton from "../../components/ProductUpdateButton.jsx";
import ProductAddButton from "../../components/ProductAddButton.jsx";

export default function ProductManagePage() {
  const toast = useToast();
  const products = [
    {
      id: 1,
      name: "Test",
      price: "Test",
      category: "Test",
    },
    {
      id: 2,
      name: "Test",
      price: "Test",
      category: "Test",
    },
    {
      id: 3,
      name: "Test",
      price: "Test",
      category: "Test",
    },
    {
      id: 4,
      name: "Test",
      price: "Test",
      category: "Test",
    },
    {
      id: 5,
      name: "Test",
      price: "Test",
      category: "Test",
    },
    {
      id: 6,
      name: "Test",
      price: "Test",
      category: "Test",
    },
    {
      id: 7,
      name: "Test",
      price: "Test",
      category: "Test",
    },
    {
      id: 8,
      name: "Test",
      price: "Test",
      category: "Test",
    },
  ];

  return (
    <>
      <Heading as="h2" size="lg" textAlign="center">
        Quản lý sản phẩm
      </Heading>

      <Box mt="5" h="40px">
        <ProductAddButton />
      </Box>

      <SearchFilter
        searchPlaceholder="Tìm theo tên, số điện thoại, địa chỉ"
        data={products}
        methods={[{ value: "name", label: "Tên sản phẩm" }]}
        properties={["name", "price", "category"]}
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
                      <Th>Tên</Th>
                      <Th>Giá</Th>
                      <Th>Loại</Th>
                      <Th>Mô tả</Th>
                      <Th>Ảnh</Th>
                      <Th>Supplier</Th>
                      <Th textAlign="center">Thao tác</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentData.map((product) => (
                      <Tr key={product.id}>
                        <Td maxW="150px" whiteSpace="normal">
                          <Text>{product.id}</Text>
                        </Td>
                        <Td maxW="150px" whiteSpace="normal">
                          <Text>{product.name}</Text>
                        </Td>
                        <Td maxW="100px" whiteSpace="normal">
                          <Text>{product.price}</Text>
                        </Td>
                        <Td maxW="150px" whiteSpace="normal">
                          <Text>{product.category}</Text>
                        </Td>
                        <Td maxW="300px" whiteSpace="normal">
                          <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Suscipit eius mollitia nobis quo sunt
                            reiciendis, magnam laboriosam laudantium corporis
                            officiis consequatur, hic sapiente placeat, a ipsum
                            praesentium nemo magni dolorum!
                          </Text>
                        </Td>
                        <Td maxW="100px" whiteSpace="normal">
                          <Image
                            src="https://designshack.net/wp-content/uploads/placeholder-image.png"
                            objectFit="cover"
                            objectPosition="center"
                            h="50px"
                          />
                        </Td>
                        <Td maxW="150px" whiteSpace="normal">
                          <Text>Tân Bình 3D</Text>
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
                                  <ProductUpdateButton />
                                </MenuItem>
                                <MenuItem p="0">
                                  <ConfirmationDialog
                                    title="Xóa"
                                    onConfirm={async () => {
                                      const res = await axios.delete(
                                        `/v1/deleteClub/${product.id}`
                                      );

                                      if (res.data.status == "Ok") {
                                        toast({
                                          title: "Xóa thành công",
                                          description:
                                            "Club đã được xóa khỏi hệ thống",
                                          status: "success",
                                          duration: 700,
                                          isClosable: true,
                                        });
                                        window.location.reload();
                                      } else {
                                        toast({
                                          title: "Xóa thất bại",
                                          description:
                                            "Club không được xóa khỏi hệ thống",
                                          status: "error",
                                          duration: 700,
                                          isClosable: true,
                                        });
                                      }
                                    }}
                                    colorScheme="red"
                                  >
                                    Xóa
                                  </ConfirmationDialog>
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
