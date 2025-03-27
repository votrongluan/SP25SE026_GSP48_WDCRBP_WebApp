import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig.js";
import { useNotify } from "../../../components/Utility/Notify.jsx";
import ImageUpload from "../../../components/Utility/ImageUpload.jsx";
import { useState } from "react";
import { useRegisterWoodworkerMutation } from "../../../services/woodworkerApi.js";
import { useNavigate } from "react-router-dom";

export default function WWRegister() {
  const notify = useNotify();
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

  const [registerWoodworker, { isLoading }] = useRegisterWoodworkerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const registerData = {
        ...data,
        imgUrl,
      };

      await registerWoodworker(registerData).unwrap();

      navigate(
        "/success?title=Đăng ký thành công&desc=Chúng tôi đã nhận được thông tin của bạn, bạn sẽ nhận được phản hồi trong thời gian sớm nhất"
      );
    } catch (error) {
      notify(
        "Đăng ký thất bại",
        error.data?.data || "Vui lòng thử lại sau",
        "error"
      );
    }
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
          Đăng ký thông tin xưởng mộc
        </Heading>
      </Box>
      <Box
        bgColor="white"
        color="black"
        padding={5}
        borderRadius="10px"
        width={{ base: "100%", xl: "80%" }}
      >
        <form onSubmit={handleSubmit}>
          <Box mb={8}>
            <Heading as="h3" fontSize="18px" fontFamily="Montserrat" mb={6}>
              Thông tin người đại diện
            </Heading>
            <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={10}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Họ và tên</FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="Nhập họ và tên"
                    name="fullName"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="Nhập email"
                    name="email"
                    type="email"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    type="tel"
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </Box>

          {/* Thông tin xưởng mộc */}
          <Box>
            <Heading as="h3" fontSize="18px" fontFamily="Montserrat" mb={6}>
              Thông tin xưởng mộc
            </Heading>
            <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={10}>
              <GridItem colSpan={{ base: 2, xl: "none" }}>
                <FormControl isRequired>
                  <FormLabel>Tên thương hiệu</FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="Nhập tên thương hiệu"
                    name="brandName"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Loại hình kinh doanh</FormLabel>
                  <Select
                    variant="flushed"
                    placeholder="Chọn loại hình"
                    name="businessType"
                  >
                    <option value="Cá nhân">Cá nhân</option>
                    <option value="Hộ gia đình">Hộ gia đình</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ base: 2, xl: "none" }}>
                <FormControl isRequired>
                  <FormLabel>Địa chỉ xưởng</FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="Nhập địa chỉ xưởng"
                    name="address"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Mã số thuế</FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="Nhập mã số thuế"
                    name="taxCode"
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Giới thiệu</FormLabel>
                  <Textarea
                    variant="flushed"
                    placeholder="Giới thiệu về xưởng mộc của bạn"
                    name="bio"
                    rows={4}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ base: 1, xl: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Ảnh đại diện cho xưởng</FormLabel>
                  <ImageUpload
                    onUploadComplete={(results) => {
                      setImgUrl(results);
                    }}
                    maxFiles={1}
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </Box>

          <Button
            _hover={{ backgroundColor: "app_brown.1", color: "white" }}
            px="40px"
            py="25px"
            bgColor={appColorTheme.brown_2}
            color="white"
            borderRadius="40px"
            mt="40px"
            zIndex="1"
            type="submit"
            isLoading={isLoading}
          >
            Đăng ký
          </Button>
        </form>
      </Box>
    </>
  );
}
