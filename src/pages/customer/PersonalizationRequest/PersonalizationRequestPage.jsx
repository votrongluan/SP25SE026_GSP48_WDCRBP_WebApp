import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios, { appURL } from "../../../api/axios.js";
import RequireAuth from "../../../components/Utility/RequireAuth.jsx";
import useAuth from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/Button/SubmitButton.jsx";
import AutoResizeTextarea from "../../../components/Input/AutoResizeTextarea.jsx";
import AddPersonalizationProduct from "./AddPersonalizationProduct.jsx";
import ActionButton from "../../../components/Button/ActionButton.jsx";

export default function PersonalizationRequestPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth?.EmployeeName,
    phone: auth?.Phone,
    email: auth?.Email,
    shipAddress: auth?.Address,
    fileLink: "",
    note: "",
    customerId: auth?.EmployeeId,
    supplierId: "",
    payOsOrderId: "",
    status: 0,
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/PrintOrder/AddPrintOrder", formData)
      .then((response) => {
        console.log(response.data);
        navigate(`/printorder/${response.data.data[0].printOrderId}`);
      })
      .catch((error) => {
        console.error("Error placing order", error);
      });
  };

  // Store user input for adding new products
  const [productData, setProductData] = useState({
    length: "",
    width: "",
    height: "",
    woodType: [],
    finishType: [],
    color: "",
    carving: false,
    carvingDetails: "",
    referenceImage: false,
    specialRequest: "",
    quantity: "",
  });

  // List of added products
  const [productList, setProductList] = useState([]);

  // Handle changes in form input
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle adding new product
  const handleAddProduct = () => {
    if (
      !productData.length ||
      !productData.width ||
      !productData.height ||
      !productData.quantity
    ) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng nhập đầy đủ kích thước và số lượng sản phẩm.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    setProductList([...productList, productData]);
    setProductData({
      length: "",
      width: "",
      height: "",
      woodType: [],
      finishType: [],
      color: "",
      carving: false,
      carvingDetails: "",
      referenceImage: false,
      specialRequest: "",
      quantity: "",
    });

    toast({
      title: "Thêm thành công!",
      description: "Sản phẩm đã được thêm vào danh sách.",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box mb={6}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Đặt thiết kế và gia công theo yêu cầu
        </Heading>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box>
          <SimpleGrid
            columns={{
              base: 1,
              xl: 2,
            }}
          >
            <Box>
              <Box boxShadow="md" bgColor="white" p={5} borderRadius="10px">
                <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
                  Thông tin khách hàng
                </Heading>
                <SimpleGrid
                  columns={{
                    base: 1,
                    xl: 2,
                  }}
                  spacing={10}
                >
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Tên</FormLabel>
                      <Input
                        name="name"
                        placeholder=" "
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Số điện thoại</FormLabel>
                      <Input
                        name="phone"
                        placeholder=" "
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </GridItem>
                </SimpleGrid>

                <FormControl isRequired mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired mt={4}>
                  <FormLabel>Địa chỉ giao hàng</FormLabel>
                  <Input
                    name="shipAddress"
                    value={formData.shipAddress}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired mt={4}>
                  <FormLabel>Mức phí tối đa có thể trả</FormLabel>
                  <Input
                    name="fileLink"
                    type="text"
                    value={formData.fileLink}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired mt={4}>
                  <FormLabel>Thời gian hoàn thành mong muốn</FormLabel>
                  <Input
                    name="fileLink"
                    type="text"
                    value={formData.fileLink}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired mt={4}>
                  <FormLabel>Ghi chú</FormLabel>
                  <AutoResizeTextarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>

              <Box bgColor="white" p={5} borderRadius="10px" mt={6}>
                <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
                  Thông tin xưởng mộc
                </Heading>

                <Stack spacing={4}>
                  <HStack>
                    <Text>Tên xưởng</Text>
                    <Spacer />
                    <Text>
                      <Link color="blue">Highland</Link>
                    </Text>
                  </HStack>

                  <HStack>
                    <Text>Địa chỉ xưởng</Text>
                    <Spacer />
                    <Text>1775 Lê Văn Luong, ap 3 nhon duc nha be</Text>
                  </HStack>

                  <HStack>
                    <Text>Số điện thoại</Text>
                    <Spacer />
                    <Text>0987382382</Text>
                  </HStack>
                </Stack>
              </Box>

              <Box bgColor="white" mt={6} p={5} borderRadius="10px">
                <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
                  Danh sách sản phẩm đã thêm
                </Heading>
                {productList.length === 0 ? (
                  <Text>Chưa có sản phẩm nào.</Text>
                ) : (
                  <Accordion allowToggle>
                    {productList.map((product, index) => (
                      <AccordionItem
                        key={index}
                        borderWidth="1px"
                        borderRadius="lg"
                        mb={4}
                      >
                        <h2>
                          <AccordionButton _expanded={{ bg: "blue.100" }}>
                            <Box flex="1" textAlign="left">
                              <strong>Sản phẩm {index + 1}</strong> -{" "}
                              {product.length}cm x {product.width}cm x{" "}
                              {product.height}cm
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Text>
                            <strong>Kích thước:</strong> {product.length}cm x{" "}
                            {product.width}cm x {product.height}cm
                          </Text>
                          <Text>
                            <strong>Loại gỗ:</strong> {product.woodType}
                          </Text>
                          <Text>
                            <strong>Hoàn thiện:</strong> {product.finishType}
                          </Text>
                          <Text>
                            <strong>Màu sắc:</strong> {product.color}
                          </Text>
                          {product.carving && (
                            <Text>
                              <strong>Điêu khắc:</strong>{" "}
                              {product.carvingDetails}
                            </Text>
                          )}
                          <Text>
                            <strong>Số lượng:</strong> {product.quantity} bộ
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </Box>
            </Box>

            <AddPersonalizationProduct
              productList={productList}
              productData={productData}
              handleAddProduct={handleAddProduct}
              setProductList={setProductList}
              handleProductInputChange={handleProductInputChange}
              setProductData={setProductData}
            />
          </SimpleGrid>

          <Flex>
            <Spacer />
            <SubmitButton text={"Xác nhận"} onClickExeFn={handleAddProduct} />
            <Spacer />
          </Flex>
        </Box>
      </form>
    </>
  );
}
