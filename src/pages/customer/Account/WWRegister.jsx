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
  Divider,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import { useNotify } from "../../../components/Utility/Notify";
import ImageUpload from "../../../components/Utility/ImageUpload";

export default function WWRegister() {
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // For testing, remove in production

    notify(
      "Đăng ký thành công",
      "Chúng tôi đã nhận được thông tin của bạn, bạn sẽ nhận được phản hồi trong thời gian sớm nhất",
      "success"
    );
    e.target.reset();
  };

  return (
    <>
      <Box mb={5}>
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
                  <FormLabel>Tên xưởng</FormLabel>
                  <Input
                    variant="flushed"
                    placeholder="Nhập tên xưởng"
                    name="workshopName"
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
                    <option value="personal">Cá nhân</option>
                    <option value="family">Hộ gia đình</option>
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
                    name="description"
                    rows={4}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ base: 1, xl: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Ảnh đại diện</FormLabel>
                  <ImageUpload
                    onUploadComplete={(results) => console.log(results)}
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
          >
            Đăng ký
          </Button>
        </form>
      </Box>
    </>
  );
}
