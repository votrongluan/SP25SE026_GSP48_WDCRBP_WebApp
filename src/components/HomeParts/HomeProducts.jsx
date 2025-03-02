import React from "react";
import { Box, Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FadeWrapper from "../FadeWrapper.jsx";
import { mockProducts } from "../../data/globalData.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeProduct() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Box w="100%" bgColor="white" pt="80px" pb="80px">
        <Container w="90%" maxW="1400px">
          <Text textAlign="center" fontFamily="Montserrat" fontSize="40px">
            Khám phá các sản phẩm của chúng tôi
          </Text>

          <Box mt="60px">
            <FadeWrapper>
              <Slider {...sliderSettings}>
                {mockProducts.slice(0, 8).map((product) => (
                  <Box key={product.id} px="10px" height="200px">
                    <Image
                      src={product.img}
                      alt={product.name}
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                ))}
              </Slider>
            </FadeWrapper>

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
                to="/products"
                as={RouterLink}
              >
                Xem tất cả
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
}
