import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import chungtoilaai from "/src/assets/images/aboutus.webp";
import nhiemvu from "/src/assets/images/nhiemvu.webp";

function AboutPage() {
  return (
    <>
      <Container w="90%" maxW="1400px" pb="50px">
        <Box height="80px">
          <Heading
            fontWeight="normal"
            as="h2"
            fontSize="26px"
            fontFamily="Montserrat"
          >
            Chúng tôi là ai
          </Heading>
        </Box>

        <Flex
          columnGap="20px"
          bgColor="app_grey.1"
          alignItems="center"
          padding="100px"
          direction={{
            base: "column",
            xl: "row",
          }}
        >
          <Box
            width={{
              base: "100%",
              xl: "50%",
            }}
            fontSize="20px"
            letterSpacing="0.5px"
            lineHeight="1.7"
            textAlign="justify"
          >
            <Text
              width={{
                base: "100%",
                xl: "70%",
              }}
            >
              Tại WDCRBP, chúng tôi tin rằng công nghệ 3D không chỉ là một công
              cụ, mà còn là một ngôn ngữ mới để kết nối ý tưởng, sáng tạo và
              thực tế. Chúng tôi mơ ước một thế giới nơi mọi giới hạn sáng tạo
              đều có thể được vượt qua, nơi bất kì ai cũng có thể biến ý tưởng
              của mình thành hiện thực một cách dễ dàng và chính xác.
            </Text>
          </Box>
          <Box
            width={{
              base: "100%",
              xl: "50%",
            }}
          >
            <Image
              mt={{
                base: "40px",
                xl: "0",
              }}
              src={chungtoilaai}
            />
          </Box>
        </Flex>
      </Container>

      <Box
        mt="100px"
        position="relative"
        w="100%"
        bgImage={`url(${nhiemvu})`}
        pb="40px"
        h="fit-content"
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
          opacity={0.5}
          zIndex={1}
        />

        {/* Content */}
        <Container
          w="90%"
          maxW="1400px"
          as="main"
          position="relative"
          zIndex={2}
        >
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
            color="white"
          >
            Nhiệm vụ của chúng tôi
          </Text>
          <Text
            py="200px"
            textAlign="justify"
            letterSpacing="1px"
            lineHeight="2"
            fontSize="20px"
            width={{
              base: "100%",
              xl: "50%",
            }}
          >
            Chúng tôi cam kết mang đến những giải pháp in 3D tiên tiến nhất, từ
            phần mềm thiết kế đến dịch vụ in ấn chất lượng cao cùng với sự phát
            triển công nghệ để đáp ứng mọi nhu cầu của khách hàng. Sứ mệnh của
            chúng tôi là hỗ trợ khách hàng trong việc hiện thực hóa những ý
            tưởng độc đáo và mang lại giá trị thực tế cao.
          </Text>
          <Text
            pl="16px"
            borderTopLeftRadius="10px"
            borderTopRightRadius="10px"
            py="12px"
            fontWeight="bold"
            fontSize="18px"
            fontFamily="Montserrat"
            width="340px"
            bgColor="white"
            color="white"
          >
            Giá trị cốt lỗi
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }}>
            <Box
              height="370px"
              border="1px solid"
              borderColor="app_grey.1"
              bgColor="white"
              padding="50px"
            >
              <Box position="relative">
                <Box
                  position="absolute"
                  height="70px"
                  width="10px"
                  bgColor="app_brown.0"
                  left="-30px"
                  borderRadius="20px"
                ></Box>
                <Text height="150px" fontSize="26px" fontFamily="Montserrat">
                  Chất lượng và độ chính xác
                </Text>
              </Box>
              <Text textAlign="justify" fontSize="16px">
                {" "}
                Chúng tôi đặt tiêu chuẩn cao về chất lượng và độ chính xác trong
                mọi sản phẩm và dịch vụ.
              </Text>
            </Box>
            <Box
              height="370px"
              border="1px solid"
              borderColor="app_grey.1"
              bgColor="white"
              padding="50px"
            >
              <Box position="relative">
                <Box
                  position="absolute"
                  height="70px"
                  width="10px"
                  bgColor="app_brown.0"
                  left="-30px"
                  borderRadius="20px"
                ></Box>
                <Text height="150px" fontSize="26px" fontFamily="Montserrat">
                  Hợp tác và hỗ trợ
                </Text>
              </Box>
              <Text textAlign="justify" fontSize="16px">
                Chúng tôi xây dựng mối quan hệ bền vững với khách hàng, dựa trên
                sự hợp tác và hỗ trợ liên tục.
              </Text>
            </Box>
            <Box
              height="370px"
              border="1px solid"
              borderColor="app_grey.1"
              bgColor="white"
              padding="50px"
            >
              <Box position="relative">
                <Box
                  position="absolute"
                  height="70px"
                  width="10px"
                  bgColor="app_brown.0"
                  left="-30px"
                  borderRadius="20px"
                ></Box>
                <Text height="150px" fontSize="26px" fontFamily="Montserrat">
                  Phát triển bền vững
                </Text>
              </Box>
              <Text textAlign="justify" fontSize="16px">
                Chúng tôi cam kết phát triển công nghệ 3D một cách bền vững và
                thân thiện với môi trường.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

export default AboutPage;
