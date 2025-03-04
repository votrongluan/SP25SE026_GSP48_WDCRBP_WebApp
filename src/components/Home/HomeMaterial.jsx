import {
  Box,
  Button,
  Container,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import pla from "../../assets/images/pla.webp";
import resin from "../../assets/images/resin.webp";
import { Link as RouterLink } from "react-router-dom";
import SlideWrapper from "../Utility/SlideWrapper.jsx";

export default function HomeMaterial() {
  return (
    <>
      <Box
        position="relative"
        w="100%"
        h="fit-content"
        bgSize="cover"
        bgPosition="center"
        bgColor="white"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container w="90%" maxW="1400px" position="relative" zIndex={2}>
          <Box>
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
                color="white"
              >
                Khám phá vật liệu của chúng tôi
              </Text>
            </SlideWrapper>

            <Box py="80px">
              <SlideWrapper direction="bottom" speed="2s">
                <SimpleGrid
                  columns={{
                    base: 1,
                    xl: 2,
                  }}
                  columnGap="60px"
                  rowGap="60px"
                >
                  <GridItem>
                    <Image
                      borderRadius="10px"
                      height="300px"
                      src={pla}
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <Text mt="20px" fontSize="18px">
                      PLA
                    </Text>
                  </GridItem>

                  <GridItem>
                    <Image
                      borderRadius="10px"
                      height="300px"
                      src={resin}
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <Text mt="20px" fontSize="18px">
                      Resin
                    </Text>
                  </GridItem>
                </SimpleGrid>{" "}
              </SlideWrapper>

              <Flex justifyContent="center">
                <Button
                  _hover={{
                    bgColor: "black",
                    color: "white",
                  }}
                  bgColor="app_brown.0"
                  color="black"
                  borderRadius="40px"
                  mt="80px"
                  px="40px"
                  py="25px"
                  to="/material"
                  as={RouterLink}
                >
                  Xem chi tiết
                </Button>
              </Flex>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
