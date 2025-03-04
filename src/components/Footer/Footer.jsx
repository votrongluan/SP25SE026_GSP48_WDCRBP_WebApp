import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Box as="footer" py="50px" px="50px" bg="app_grey.0" color="black">
      <Flex
        direction={{ base: "column", xl: "row" }} // Responsive direction
        alignItems={{ base: "center", xl: "flex-start" }} // Center align items on small screens
        textAlign={{ base: "center", xl: "left" }} // Center text on small screens
      >
        <Box mb={{ base: "40px", xl: "0" }}>
          <Text
            fontFamily="Montserrat"
            fontSize="16px"
            color="black"
            fontWeight="bold"
          >
            Địa chỉ
          </Text>
          <Text mt="20px" fontSize="16px" color="black">
            Đại học FPT
          </Text>
          <Text mt="10px" fontSize="16px" color="black">
            ww@com.vn
          </Text>
          <Button
            _hover={{
              color: "white",
              backgroundColor: "black",
            }}
            px="40px"
            bgColor="app_brown.0"
            color="black"
            borderRadius="40px"
            mt="40px"
            as={RouterLink}
            to={"/contact"}
          >
            Nhận hỗ trợ
          </Button>
        </Box>

        <Box textAlign="center" flex="1" mb={{ base: "40px", xl: "0" }}>
          <Box>
            <Text
              fontFamily="Montserrat"
              fontSize="16px"
              color="black"
              fontWeight="bold"
            >
              Nhận thông tin mới từ chúng tôi
            </Text>

            <Text mt="20px" fontSize="16px" color="black">
              Đăng ký bằng cách gửi email để nhận được những thông tin mới nhất
              từ chúng tôi
            </Text>

            <Text
              mt={{
                base: "20px",
                xl: "20px",
              }}
              fontSize="16px"
              color="black"
            >
              Email*
              <Box mt="20px">
                <Box>
                  <Input
                    borderRadius="100px"
                    width="330px"
                    color="black"
                    py="25px"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    _hover={{
                      backgroundColor: "white",
                      color: "black",
                    }}
                    px="40px"
                    py="25px"
                    bgColor="black"
                    color="white"
                    borderRadius="40px"
                    ml="-40px"
                    zIndex="1"
                    mt="-2px"
                    onClick={() => {
                      const isEmailCorrect = validateEmail(email);

                      if (!isEmailCorrect) {
                        toast({
                          title: "Email không hợp lệ",
                          status: "error",
                          duration: 700,
                          isClosable: true,
                        });

                        setEmail("");
                      } else {
                        toast({
                          title: "Bạn đã đăng ký nhận thông tin thành công",
                          status: "success",
                          duration: 700,
                          isClosable: true,
                        });

                        setEmail("");
                      }
                    }}
                  >
                    Gửi ngay
                  </Button>
                </Box>
              </Box>
            </Text>
          </Box>
        </Box>

        <Box>
          <Text
            fontFamily="Montserrat"
            fontSize="16px"
            color="black"
            fontWeight="bold"
          >
            Theo dõi chúng tôi
          </Text>
          <Text mt="20px" fontSize="16px" color="black">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61566307373631&locale=vi_VN"
            >
              Facebook
            </a>
          </Text>
          <Text mt="10px" fontSize="16px" color="black">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/3d_creatify?igsh=Z255bXFnaXllNnJp"
            >
              Instagram
            </a>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;
