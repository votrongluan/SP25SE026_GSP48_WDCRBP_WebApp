import {
  Box,
  Button,
  Container,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import intro from "/src/assets/images/intro.webp";
import { Link as RouterLink } from "react-router-dom";
import SlideWrapper from "./SlideWrapper";

export default function HomeIntro() {
  return (
    <>
      <Box
        position="relative"
        w="100%"
        bgImage={`url(${intro})`}
        pb="80px"
        h="fit-content"
        mt="-100px"
        bgSize="cover"
        bgAttachment="fixed"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgColor="black"
          opacity={0.1}
          zIndex={1}
        />
        <Container w="90%" maxW="1400px" position="relative" zIndex={2}>
          <Box
            mt="200px"
            w={{
              base: "100%",
              xl: "50%",
            }}
          >
            <SlideWrapper speed="1s">
              <Text fontSize="44px" fontFamily="Jockey One">
                Creatify
              </Text>
            </SlideWrapper>
            <SlideWrapper speed="1.5s">
              <Text
                mt="20px"
                textAlign="justify"
                lineHeight="2"
                fontSize="20px"
              >
                Chúng tôi tự hào là đơn vị tiên phong trong việc ứng dụng các
                công nghệ in 3D tiên tiến nhất hiện nay. Với đội ngũ kỹ thuật
                viên chuyên nghiệp và hệ thống máy in 3D hiện đại, chúng tôi
                mang đến cho khách hàng những sản phẩm chất lượng cao, đáp ứng
                mọi yêu cầu từ đơn giản đến phức tạp. Công nghệ in 3D của chúng
                tôi không chỉ giúp rút ngắn thời gian sản xuất mà còn đảm bảo độ
                chính xác và chi tiết cao nhất.
              </Text>
            </SlideWrapper>
            <SlideWrapper speed="1.8s">
              <HStack spacing={5}>
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
                  to="/contact"
                  as={RouterLink}
                >
                  Liên hệ
                </Button>
                <Button
                  _hover={{
                    bgColor: "app_black.0",
                    color: "app_white.0",
                  }}
                  bgColor="app_grey.0"
                  color="app_black.0"
                  borderRadius="40px"
                  mt="40px"
                  px="40px"
                  py="25px"
                  to="/material"
                  as={RouterLink}
                >
                  Khám phá vật liệu
                </Button>
              </HStack>
            </SlideWrapper>
          </Box>

          <Box mt="200px">
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }}>
              <Box height="160px" bgColor="app_grey.0" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.0"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    In 3D theo yêu cầu
                  </Text>
                </Box>
              </Box>

              <Box height="160px" bgColor="app_grey.0" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.0"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    Sử dụng nhựa PLA và nhựa Resin
                  </Text>
                </Box>
              </Box>
              <Box height="160px" bgColor="app_grey.0" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.0"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    Tận tâm phục vụ
                  </Text>
                </Box>
              </Box>
              <Box height="160px" bgColor="app_grey.0" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.0"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    Cam kết chất lượng sản phẩm
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
