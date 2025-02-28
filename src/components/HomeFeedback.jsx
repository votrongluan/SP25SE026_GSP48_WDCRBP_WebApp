import {
  Box,
  Container,
  Flex,
  Avatar,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import SlideWrapper from "./SlideWrapper";

export default function HomeFeedback() {
  return (
    <>
      <Box w="100%" bgColor="app_grey.0" pb="160px">
        <Container w="90%" maxW="1400px" bgColor="app_grey.0" pb="80px">
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
              Đánh giá từ khách hàng
            </Text>
          </SlideWrapper>

          <Box mt="60px">
            <SimpleGrid
              columns={{
                base: 1,
                xl: 3,
              }}
            >
              <Box height="160px" bgColor="app_grey.0" padding="50px">
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.5s">
                    <Box
                      position="absolute"
                      height="150px"
                      width="8px"
                      bgColor="app_brown.0"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>

                  <SlideWrapper direction="left" speed="1s">
                    <Text height="150px" fontSize="16px" textAlign="justify">
                      Sản phẩm 3D rất sắc nét và chi tiết, vượt xa mong đợi của
                      mình. Giao hàng nhanh chóng và đóng gói cẩn thận. Chắc
                      chắn sẽ tiếp tục ủng hộ.
                    </Text>
                  </SlideWrapper>

                  <Flex
                    flexDirection={{ base: "column", xl: "row" }}
                    mt="30px"
                    ml="-30px"
                    columnGap="20px"
                    rowGap="20px"
                  >
                    <Avatar
                      bgColor="app_white.0"
                      borderRadius="10px"
                      height="60px"
                      width="60px"
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                    <Box>
                      <Text>Võ Trọng Luân</Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>

              <Box
                mt={{
                  base: "170px",
                  xl: "0",
                }}
                height="160px"
                bgColor="app_grey.0"
                padding="50px"
              >
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.5s">
                    <Box
                      position="absolute"
                      height="150px"
                      width="8px"
                      bgColor="app_brown.0"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>

                  <SlideWrapper direction="left" speed="1s">
                    <Text height="150px" fontSize="16px" textAlign="justify">
                      Mẫu 3D cực kỳ tinh xảo, độ chính xác cao và chất lượng
                      tuyệt vời. Giá cả lại rất phải chăng. Rất đáng để đầu tư.
                    </Text>
                  </SlideWrapper>

                  <Flex
                    flexDirection={{ base: "column", xl: "row" }}
                    mt="30px"
                    ml="-30px"
                    columnGap="20px"
                    rowGap="20px"
                  >
                    <Avatar
                      bgColor="app_white.0"
                      borderRadius="10px"
                      height="60px"
                      width="60px"
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                    <Box>
                      <Text>Cao Hoàng Gia Bảo</Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box
                mt={{
                  base: "170px",
                  xl: "0",
                }}
                height="160px"
                bgColor="app_grey.0"
                padding="50px"
              >
                <Box position="relative">
                  <SlideWrapper direction="top" speed="1.5s">
                    <Box
                      position="absolute"
                      height="150px"
                      width="8px"
                      bgColor="app_brown.0"
                      top="-20px"
                      left="-30px"
                      borderRadius="20px"
                    ></Box>
                  </SlideWrapper>

                  <SlideWrapper direction="left" speed="1s">
                    <Text height="150px" fontSize="16px" textAlign="justify">
                      Mình rất hài lòng với sản phẩm 3D này, đường nét thiết kế
                      đẹp mắt và chất liệu tốt. Sẽ giới thiệu cho bạn bè và quay
                      lại mua thêm.
                    </Text>
                  </SlideWrapper>

                  <Flex
                    flexDirection={{ base: "column", xl: "row" }}
                    mt="30px"
                    ml="-30px"
                    columnGap="20px"
                    rowGap="20px"
                  >
                    <Avatar
                      bgColor="app_white.0"
                      borderRadius="10px"
                      height="60px"
                      width="60px"
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                    <Box>
                      <Text>Nguyễn Thị Châu</Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
