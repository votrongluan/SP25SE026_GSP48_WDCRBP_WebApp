import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import { useState } from "react";
import CheckboxList from "../../../../components/Utility/CheckboxList.jsx";
import {
  useUpdateUserInformationMutation,
  useChangePasswordMutation,
} from "../../../../services/userApi";
import useAuth from "../../../../hooks/useAuth";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import PasswordInput from "../../../../components/Input/PasswordInput";
import { FiCheckCircle, FiEdit3 } from "react-icons/fi";

export default function PersonalInformationManagement({ woodworker, refetch }) {
  const { auth } = useAuth();
  const notify = useNotify();
  const [personalInfoDisabled, setPersonalInfoDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [updateUserInformation] = useUpdateUserInformationMutation();
  const [changePassword] = useChangePasswordMutation();

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      setIsLoading(true);
      await updateUserInformation({
        id: auth.userId,
        data,
      }).unwrap();

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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData.entries());

    if (postData.newPassword !== postData.confirmPassword) {
      notify("Lỗi", "Mật khẩu mới không khớp", "error");
      return;
    }

    try {
      setIsLoading(true);
      await changePassword({
        userId: auth.userId,
        data: postData,
      }).unwrap();

      refetch();
      notify("Đổi mật khẩu thành công", "Mật khẩu đã được cập nhật", "success");

      e.target.reset();
      setPasswordDisabled(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notify(
        "Đổi mật khẩu thất bại",
        error.data?.message || "Vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <>
      <Heading
        color={appColorTheme.brown_2}
        fontSize="2xl"
        fontFamily="Montserrat"
      >
        Quản lý Thông tin cá nhân
      </Heading>

      <Stack bg="white" p={5} borderRadius="lg" boxShadow="md" spacing={10}>
        <form onSubmit={handlePersonalInfoSubmit}>
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
                    defaultValue={woodworker.user?.username}
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
                    defaultValue={woodworker.user?.email}
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
                    defaultValue={woodworker.user?.phone}
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </Box>

          <Box mb={6}>
            <CheckboxList
              items={[
                {
                  description:
                    "Tôi xác nhận thông tin đã được cập nhật chính xác",
                  isOptional: false,
                },
              ]}
              setButtonDisabled={setPersonalInfoDisabled}
            />
          </Box>

          <Button
            _hover={{ backgroundColor: "app_brown.1", color: "white" }}
            px="30px"
            py="20px"
            bgColor={appColorTheme.brown_2}
            color="white"
            borderRadius="40px"
            zIndex="1"
            type="submit"
            isDisabled={personalInfoDisabled}
            leftIcon={<FiCheckCircle />}
          >
            Cập nhật thông tin
          </Button>
        </form>

        <form onSubmit={handlePasswordSubmit}>
          <Box mb={8}>
            <Heading as="h3" fontSize="18px" fontFamily="Montserrat" mb={6}>
              Đổi mật khẩu
            </Heading>
            <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={10}>
              <GridItem>
                <PasswordInput
                  label="Mật khẩu hiện tại"
                  name="oldPassword"
                  placeholder="Nhập mật khẩu hiện tại"
                  isRequired
                />
              </GridItem>
              <GridItem>
                <PasswordInput
                  label="Mật khẩu mới"
                  name="newPassword"
                  placeholder="Nhập mật khẩu mới"
                  isRequired
                />
              </GridItem>
              <GridItem>
                <PasswordInput
                  label="Xác nhận mật khẩu mới"
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu mới"
                  isRequired
                />
              </GridItem>
            </SimpleGrid>
          </Box>

          <Box mb={6}>
            {isLoading ? (
              <Spinner />
            ) : (
              <CheckboxList
                items={[
                  {
                    description: "Tôi xác nhận muốn đổi mật khẩu",
                    isOptional: false,
                  },
                ]}
                setButtonDisabled={setPasswordDisabled}
              />
            )}
          </Box>

          <Button
            _hover={{ backgroundColor: "app_brown.1", color: "white" }}
            px="30px"
            py="20px"
            bgColor={appColorTheme.brown_2}
            color="white"
            borderRadius="40px"
            zIndex="1"
            type="submit"
            isDisabled={passwordDisabled}
            leftIcon={<FiCheckCircle />}
          >
            Đổi mật khẩu
          </Button>
        </form>
      </Stack>
    </>
  );
}
