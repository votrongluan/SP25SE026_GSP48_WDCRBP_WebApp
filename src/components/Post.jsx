import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ChatBubble, Favorite, RemoveRedEyeRounded } from "@mui/icons-material";
import pla from "/src/assets/images/pla.webp";
import { Link as RouterLink } from "react-router-dom";

export default function Post() {
  return (
    <>
      <RouterLink to="/forum/1">
        <Box
          cursor="pointer"
          _hover={{
            opacity: "0.7",
          }}
          transition="opacity 0.3s ease"
          bgColor="app_white.0"
        >
          <Image
            h="220px"
            w="100%"
            objectFit="cover"
            objectPosition="center"
            src={pla}
          />
          <Box p="20px">
            <Text fontSize="12px">12 tháng 7</Text>
            <Text
              fontSize="21px"
              fontWeight="bold"
              fontFamily="Montserrat"
              height="60px"
              mt="20px"
              noOfLines={2}
            >
              Thông báo thêm sản phẩm vào trang chủ của chúng tôi vào 12/7 nam
            </Text>
            <Text fontSize="18px" mt="20px" noOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore alias molestiae expedita, quia dolore iusto sit
              consectetur cumque sequi tempora ratione, temporibus natus ipsam
              iure harum, dolor cum exercitationem aut?
            </Text>
            <Flex
              borderTop="1px solid "
              borderTopColor="app_grey.0"
              mt="20px"
              justifyContent="space-between"
              pt="20px"
            >
              {/* <Flex>
              <Flex alignItems="center">
                <RemoveRedEyeRounded />
                <Text mt="2px" ml="4px">
                  2
                </Text>
              </Flex>

              <Flex ml="20px" alignItems="center">
                <ChatBubble />
                <Text mt="2px" ml="4px">
                  0
                </Text>
              </Flex>
            </Flex>

            <Flex alignItems="center">
              <Text mt="2px">2</Text>
              <Favorite
                sx={{
                  marginLeft: "4px",
                  color: "red",
                }}
              />
            </Flex> */}
            </Flex>
          </Box>
        </Box>
      </RouterLink>
    </>
  );
}
