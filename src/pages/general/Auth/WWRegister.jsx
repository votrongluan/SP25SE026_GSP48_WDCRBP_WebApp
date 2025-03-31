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
import AddressInput from "../../../components/Utility/AddressInput.jsx";
import { useState } from "react";
import { useRegisterWoodworkerMutation } from "../../../services/woodworkerApi.js";
import { Navigate, useNavigate } from "react-router-dom";
import { validateWoodworkerRegister } from "../../../validations/index.js";
import useAuth from "../../../hooks/useAuth.js";
import CheckboxList from "../../../components/Utility/CheckboxList.jsx";
import { FiUserPlus } from "react-icons/fi";

export default function WWRegister() {
  const { auth } = useAuth();
  const notify = useNotify();
  const [imgUrl, setImgUrl] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    taxCode: "",
    brandName: "",
    bio: "",
  });
  const [fullAddress, setFullAddress] = useState({
    street: "",
    cityId: "",
    districtId: "",
    wardCode: "",
    cityName: "",
    districtName: "",
    wardName: "",
  });
  const [registerWoodworker, { isLoading }] = useRegisterWoodworkerMutation();

  if (auth) return <Navigate to="/" />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateWoodworkerRegister({
      ...formData,
      imgUrl,
      address: fullAddress.street,
      wardCode: fullAddress.wardCode,
      districtId: fullAddress.districtId,
      cityId: fullAddress.cityId,
    });
    if (errors.length > 0) {
      notify("Đăng ký thất bại", errors.join(" [---] "), "error");
      return;
    }

    try {
      const registerData = {
        ...formData,
        address: `${fullAddress.street}, ${fullAddress.wardName}, ${fullAddress.districtName}, ${fullAddress.cityName}`,
        wardCode: fullAddress.wardCode,
        districtId: fullAddress.districtId,
        cityId: fullAddress.cityId,
        imgUrl,
      };

      await registerWoodworker(registerData).unwrap();

      navigate(
        "/success?title=Đăng ký thành công&desc=Chúng tôi đã nhận được thông tin của bạn, bạn sẽ nhận được phản hồi trong thời gian sớm nhất. Thông tin tài khoản của bạn sẽ được gửi đến email của bạn sau khi được kiểm duyệt."
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
                    placeholder="Nhập họ và tên"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Nhập email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
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
                  <FormLabel>Tên xưởng mộc</FormLabel>
                  <Input
                    placeholder="Nhập tên xưởng mộc"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Loại hình kinh doanh</FormLabel>
                  <Select
                    placeholder="Chọn loại hình"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                  >
                    <option value="Cá nhân">Cá nhân</option>
                    <option value="Hộ kinh doanh">Hộ kinh doanh</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <AddressInput value={fullAddress} onChange={setFullAddress} />
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Mã số thuế</FormLabel>
                  <Input
                    placeholder="Nhập mã số thuế"
                    name="taxCode"
                    value={formData.taxCode}
                    onChange={handleChange}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Giới thiệu</FormLabel>
                  <Textarea
                    placeholder="Giới thiệu về xưởng mộc của bạn"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
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

          <Box mt={6}>
            <CheckboxList
              items={[
                {
                  isOptional: false,
                  description:
                    "Tôi đã kiểm tra thông tin đã cung cấp và đảm bảo tất cả thông tin là chính xác",
                },
              ]}
              setButtonDisabled={setButtonDisabled}
            />
          </Box>

          <Button
            _hover={{ backgroundColor: "app_brown.1", color: "white" }}
            px="30px"
            py="20px"
            bgColor={appColorTheme.brown_2}
            color="white"
            borderRadius="40px"
            mt={6}
            zIndex="1"
            isDisabled={buttonDisabled}
            type="submit"
            isLoading={isLoading}
            leftIcon={<FiUserPlus />}
          >
            Đăng ký
          </Button>
        </form>
      </Box>
    </>
  );
}
