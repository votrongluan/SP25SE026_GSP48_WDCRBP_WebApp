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
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import ImageUpdateUploader from "../../../../components/Utility/ImageUpdateUploader.jsx";
import { useState } from "react";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import BuyPackModal from "../ActionModal/BuyPackModal.jsx";

export default function ProfileManagementPage() {
  const notify = useNotify();
  const [imgUrl, setImgUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Mock data - TODO: Get from API
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Văn A",
    email: "example@email.com",
    phone: "0123456789",
    brandName: "Xưởng Mộc A",
    businessType: "Cá nhân",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    taxCode: "123456789",
    bio: "Xưởng mộc chuyên sản xuất nội thất cao cấp",
    imgUrl:
      "https://i.pinimg.com/1200x/fa/56/5d/fa565d80a63c7787dfa3f681169b7941.jpg",
  });

  const [packData, setPackData] = useState({
    startDate: "",
    endDate: "",
    packType: "Chưa đăng ký",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: Implement update profile API call
      notify("Cập nhật thành công", "Thông tin đã được cập nhật", "success");
    } catch (error) {
      notify(
        "Cập nhật thất bại",
        error.data?.data || "Vui lòng thử lại sau",
        "error"
      );
    }
  };

  const getPackColor = (type) => {
    switch (type) {
      case "vàng":
        return "yellow.500";
      case "bạc":
        return "gray.400";
      case "đồng":
        return "orange.500";
      default:
        return "gray.500";
    }
  };

  return (
    <Stack spacing={6}>
      <Heading
        color={appColorTheme.brown_2}
        fontSize="2xl"
        fontFamily="Montserrat"
      >
        Quản lý Hồ sơ
      </Heading>

      {/* Current Pack Information */}
      <PackageFrame packageType="none">
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Heading size="md" mb={4}>
            Thông tin gói dịch vụ
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box>
              <Text fontWeight="bold">Loại gói:</Text>
              <Text color={getPackColor(packData.packType)} fontSize="xl">
                {packData.packType.toUpperCase()}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Ngày bắt đầu:</Text>
              <Text fontSize="xl">
                {packData?.startDate ? packData.startDate : "Chưa đăng ký"}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Ngày kết thúc:</Text>
              <Text fontSize="xl">
                {packData?.endDate ? packData.endDate : "Chưa đăng ký"}
              </Text>
            </Box>
          </SimpleGrid>
          <Button
            colorScheme="green"
            mt={4}
            onClick={onOpen}
            leftIcon={<Text>+</Text>}
          >
            Mua gói mới
          </Button>
        </Box>
      </PackageFrame>

      {/* Profile Information */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
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
                    defaultValue={profileData.fullName}
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
                    defaultValue={profileData.email}
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
                    defaultValue={profileData.phone}
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </Box>

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
                    defaultValue={profileData.brandName}
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
                    defaultValue={profileData.businessType}
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
                    defaultValue={profileData.address}
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
                    defaultValue={profileData.taxCode}
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
                    defaultValue={profileData.bio}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ base: 1, xl: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Ảnh đại diện cho xưởng</FormLabel>
                  <ImageUpdateUploader
                    onUploadComplete={(results) => {
                      setImgUrl(results);
                    }}
                    maxFiles={1}
                    imgUrls={profileData.imgUrl}
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
            Cập nhật thông tin
          </Button>
        </form>
      </Box>

      {/* Buy New Pack Modal */}
      <BuyPackModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}
