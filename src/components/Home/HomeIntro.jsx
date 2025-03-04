import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import intro from "/src/assets/images/intro.jpg";
import SlideWrapper from "../Utility/SlideWrapper.jsx";

export default function HomeIntro() {
  return (
    <>
      <Box
        position="relative"
        w="100%"
        bgImage={`url(${intro})`}
        pb="80px"
        h="fit-content"
        mt="-50px"
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
            color="white"
            w={{
              base: "100%",
              xl: "50%",
            }}
          >
            <SlideWrapper speed="1s">
              <Text fontSize="44px" fontFamily="Jockey One">
                WDCRBP
              </Text>
            </SlideWrapper>
            <SlideWrapper speed="1.5s">
              <Text
                mt="20px"
                textAlign="justify"
                lineHeight="2"
                fontSize="20px"
              >
                Chúng tôi tự hào là nền tảng tiên phong trong việc cung cấp dịch
                vụ thiết kế, gia công và sửa chữa đồ gỗ theo yêu cầu. Với đội
                ngũ thợ lành nghề và hệ thống máy móc hiện đại, chúng tôi mang
                đến những sản phẩm chất lượng cao, đáp ứng mọi yêu cầu từ đơn
                giản đến phức tạp. Công nghệ gia công tiên tiến giúp tối ưu thời
                gian sản xuất, đảm bảo độ chính xác và tinh xảo trong từng chi
                tiết.
              </Text>
            </SlideWrapper>
          </Box>

          <Box mt="200px">
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }}>
              <Box height="160px" bgColor="app_grey.1" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.2"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    Thiết kế theo yêu cầu
                  </Text>
                </Box>
              </Box>

              <Box height="160px" bgColor="app_grey.1" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.2"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    Gia công theo yêu cầu
                  </Text>
                </Box>
              </Box>
              <Box height="160px" bgColor="app_grey.1" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.2"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    Nhiểu mẫu mã
                  </Text>
                </Box>
              </Box>
              <Box height="160px" bgColor="app_grey.1" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.55s">
                    <Box
                      position="absolute"
                      height="80px"
                      width="10px"
                      bgColor="app_brown.2"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>
                  <Text height="150px" fontSize="18px" fontFamily="Montserrat">
                    Cam kết chất lượng
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
