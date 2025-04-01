import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Spinner,
  GridItem,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../../config/appconfig.js";
import CheckboxList from "../../../../components/Utility/CheckboxList.jsx";
import { useUpdateUserInformationMutation } from "../../../../services/userApi.js";
import useAuth from "../../../../hooks/useAuth.js";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import { FiCheckCircle } from "react-icons/fi";
import PasswordInput from "../../../../components/Input/PasswordInput.jsx";

export default function CustomerPersonalInfoForm({ userData, refetch }) {
  const { auth } = useAuth();
  const notify = useNotify();
  const [personalInfoDisabled, setPersonalInfoDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const [updateUserInformation] = useUpdateUserInformationMutation();

  const handleCheckboxChange = (disabled) => {
    setPersonalInfoDisabled(disabled);
    setShowPasswordField(!disabled);
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      userId: auth.userId,
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    try {
      setIsLoading(true);
      await updateUserInformation(data).unwrap();

      setIsLoading(false);
      refetch();
      notify("Cập nhật thành công", "Thông tin đã được cập nhật", "success");
    } catch (error) {
      setIsLoading(false);
      notify(
        "Cập nhật thất bại",
        error.data?.message || "Vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <form onSubmit={handlePersonalInfoSubmit}>
      <Box mb={6}>
        <Heading as="h3" fontSize="18px" fontFamily="Montserrat" mb={6}>
          Đổi mật khẩu
        </Heading>

        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Tên của bạn</FormLabel>
            <Input
              name="fullName"
              defaultValue={userData?.username || ""}
              placeholder="Nhập họ và tên"
              bg="white"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              defaultValue={userData?.email || ""}
              isReadOnly
              bgColor={appColorTheme.grey_2}
              placeholder="Nhập email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="phone"
              defaultValue={userData?.phone || ""}
              placeholder="Nhập số điện thoại"
              bg="white"
            />
          </FormControl>
        </Stack>
      </Box>

      <Box mb={6}>
        {isLoading ? (
          <Spinner />
        ) : (
          <CheckboxList
            items={[
              {
                description: "Tôi xác nhận muốn cập nhật thông tin cá nhân",
                isOptional: false,
              },
            ]}
            setButtonDisabled={handleCheckboxChange}
          />
        )}
      </Box>

      {showPasswordField && (
        <Box mt={2} mb={6}>
          <GridItem>
            <PasswordInput
              label="Mật khẩu xác nhận"
              name="password"
              placeholder="Nhập mật khẩu để xác nhận thay đổi"
              isRequired
            />
          </GridItem>
        </Box>
      )}

      <Button
        _hover={{ backgroundColor: appColorTheme.brown_1, color: "white" }}
        px="30px"
        py="20px"
        bgColor={appColorTheme.brown_2}
        color="white"
        borderRadius="40px"
        zIndex="1"
        type="submit"
        isDisabled={personalInfoDisabled}
        leftIcon={<FiCheckCircle />}
        isLoading={isLoading}
      >
        Cập nhật thông tin
      </Button>
    </form>
  );
}
