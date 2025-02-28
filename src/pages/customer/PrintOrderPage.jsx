import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios, { appURL } from "../../api/axios";
import RequireAuth from "../../components/RequireAuth";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton";

export default function PrintOrderPage() {
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

  return (
    <Container w="90%" maxW="1400px" pb="100px">
      <Box height="80px">
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="26px"
          fontFamily="Montserrat"
        >
          Đặt thiết kế và gia công theo yêu cầu
        </Heading>
      </Box>

      <form onSubmit={handleSubmit}>
        <SimpleGrid
          bgColor="app_grey.0"
          color="app_black.0"
          columns={{
            base: 1,
            xl: 2,
          }}
        >
          <Box px="40px" py="40px">
            <Box>
              <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
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
                      borderColor="app_black.0"
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
                      borderColor="app_black.0"
                    />
                  </FormControl>
                </GridItem>
              </SimpleGrid>

              <FormControl isRequired mt="16px">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleInputChange}
                  borderColor="app_black.0"
                />
              </FormControl>

              <FormControl isRequired mt="16px">
                <FormLabel>Địa chỉ giao hàng</FormLabel>
                <Input
                  name="shipAddress"
                  value={formData.shipAddress}
                  onChange={handleInputChange}
                  borderColor="app_black.0"
                />
              </FormControl>

              <FormControl isRequired mt="16px">
                <FormLabel>Đường dẫn đến thư mục</FormLabel>
                <Input
                  name="fileLink"
                  type="text"
                  value={formData.fileLink}
                  onChange={handleInputChange}
                  borderColor="app_black.0"
                />
              </FormControl>

              <FormControl isRequired mt="16px">
                <FormLabel>Ghi chú</FormLabel>
                <Textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  borderColor="app_black.0"
                />
              </FormControl>
            </Box>

            <Box mt={4}>
              <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
                Thông tin xưởng mộc
              </Heading>
            </Box>
          </Box>
        </SimpleGrid>
      </form>
    </Container>
  );
}
