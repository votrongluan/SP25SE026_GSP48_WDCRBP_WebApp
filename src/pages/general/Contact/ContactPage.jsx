import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../config/appconfig.js";
import { useNotify } from "../../../components/Utility/Notify.jsx";

function ContactPage() {
  const notify = useNotify();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    job: "",
    support: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      job: "",
      support: "",
      message: "",
    });
    notify(
      "Tin nhắn đã được gửi",
      "Chúng tôi đã nhận được tin nhắn của bạn, bạn sẽ nhận được phản hồi trong thời gian sớm nhất",
      "success"
    );
  };

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Liên hệ với chúng tôi
        </Heading>
      </Box>
      <Box
        bgColor="white"
        color="black"
        padding="40px"
        borderRadius="10px"
        width={{ base: "100%", xl: "80%" }}
      >
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={10}>
            <GridItem>
              <FormControl>
                <FormLabel>Tên của bạn</FormLabel>
                <Input
                  variant="flushed"
                  placeholder=" "
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Họ của bạn</FormLabel>
                <Input
                  variant="flushed"
                  placeholder=" "
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Email của bạn</FormLabel>
                <Input
                  variant="flushed"
                  placeholder=" "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          </SimpleGrid>
          <SimpleGrid mt="40px" columns={{ base: 1, xl: 3 }} spacing={10}>
            <GridItem>
              <FormControl>
                <FormLabel>Số điện thoại của bạn</FormLabel>
                <Input
                  variant="flushed"
                  placeholder=" "
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Công việc của bạn</FormLabel>
                <Input
                  variant="flushed"
                  placeholder=" "
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Bạn cần hỗ trợ gì</FormLabel>
                <Input
                  variant="flushed"
                  placeholder=" "
                  name="support"
                  value={formData.support}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          </SimpleGrid>
          <FormControl mt="40px">
            <FormLabel>Để lại tin nhắn cho chúng tôi</FormLabel>
            <Textarea
              variant="flushed"
              placeholder=" "
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </FormControl>
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
            Gửi tin nhắn
          </Button>
        </form>
      </Box>
    </>
  );
}

export default ContactPage;
