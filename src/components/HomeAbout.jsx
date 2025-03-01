import { Box, Button, Container, Text } from "@chakra-ui/react";
import about from "/src/assets/videos/ve_chung_toi.mp4";
import { Link as RouterLink } from "react-router-dom";
import SlideWrapper from "./Utilities/SlideWrapper.jsx";

export default function HomeAbout() {
  return (
    <>
      <Box>
        {/* Background Video */}
        <Box position="relative" overflow="hidden" zIndex="1">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: "-1", // Ensure the video is behind the content
            }}
          >
            <source src={about} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <Box
            h="100%"
            bg="rgb(64,68,75,.77)" /* Optional: Add a dark overlay */
            color="white"
            pb="200px"
          >
            <Container
              w="90%"
              maxW="1400px"
              as="main"
              position="relative"
              zIndex={2}
            >
              <SlideWrapper direction="top" speed=".6s">
                <Text
                  pl="16px"
                  borderBottomLeftRadius="10px"
                  borderBottomRightRadius="10px"
                  py="12px"
                  fontWeight="bold"
                  fontSize="18px"
                  fontFamily="Montserrat"
                  width="340px"
                  bgColor="white"
                  color="app_white.0"
                >
                  Về chúng tôi
                </Text>
              </SlideWrapper>

              <SlideWrapper speed="1.5s">
                <Text
                  pt="200px"
                  width={{
                    base: "100%",
                    xl: "50%",
                  }}
                  textAlign="justify"
                  lineHeight="2"
                  fontSize="20px"
                >
                  Chúng tôi cam kết mang đến những giải pháp in 3D tiên tiến
                  nhất, từ phần mềm thiết kế đến dịch vụ in ấn chất lượng cao
                  cùng với sự phát triển công nghệ để đáp ứng mọi nhu cầu của
                  khách hàng. Sứ mệnh của chúng tôi là hỗ trợ khách hàng trong
                  việc hiện thực hóa những ý tưởng độc đáo và mang lại giá trị
                  thực tế cao.
                </Text>
              </SlideWrapper>

              <SlideWrapper speed="1.5s">
                <Button
                  _hover={{
                    bgColor: "app_black.0",
                    color: "app_white.0",
                  }}
                  bgColor="app_brown.0"
                  color="app_black.0"
                  borderRadius="40px"
                  mt="40px"
                  px="40px"
                  py="25px"
                  to="/about"
                  as={RouterLink}
                >
                  Khám phá thêm
                </Button>
              </SlideWrapper>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}
