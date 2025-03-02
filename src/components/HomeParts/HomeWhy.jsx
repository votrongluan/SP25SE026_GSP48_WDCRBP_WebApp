import React, { useState, useEffect } from "react";
import { Box, Container, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import why from "/src/assets/images/vi_sao_nen_chon_chung_toi.webp";
import { ReactSVG } from "react-svg";
import congnghe from "/src/assets/images/cong-nghe-tien-tien.svg";
import vatlieu from "/src/assets/images/vat-lieu-chat-luong.svg";
import dichvu from "/src/assets/images/dich-vu-in-an-theo-yeu-cau.svg";
import huongdan from "/src/assets/images/huong-dan-cua-chuyen-gia.svg";
import SlideWrapper from "../Utilities/SlideWrapper.jsx";
import FadeWrapper from "../FadeWrapper.jsx";

export default function HomeWhy() {
  const [bgPosition, setBgPosition] = useState("center");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setBgPosition(`-${scrollPosition * 0.2}px center`); // Adjust the multiplier as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        position="relative"
        w="100%"
        bgImage={`url(${why})`}
        bgColor={{
          base: "app_grey.2",
          xl: "none",
        }}
        pb="80px"
        bgSize="cover"
        bgPosition={bgPosition}
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
          opacity={0.2}
          zIndex={1}
        />

        <Container w="90%" maxW="1400px" position="relative" zIndex={2}>
          <Box
            w={{
              base: "100%",
              xl: "50%",
            }}
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
                color="white"
              >
                Vì sao nên chọn chúng tôi
              </Text>
            </SlideWrapper>

            <Box py="80px">
              <SimpleGrid
                columns={{
                  base: 1,
                  xl: 2,
                }}
                columnGap="60px"
                rowGap="60px"
              >
                <FadeWrapper>
                  <GridItem>
                    <Box
                      width="fit-content"
                      border="1px solid white"
                      borderRadius="10px"
                      p="8px"
                    >
                      <ReactSVG
                        src={congnghe}
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            "style",
                            "width: 30px; height: 30px; fill: white"
                          );
                        }}
                      />
                    </Box>
                    <Text mt="30px" fontFamily="Montserrat" fontSize="26px">
                      Công nghệ in tiên tiến
                    </Text>
                    <Text mt="30px" fontSize="18px" textAlign="justify">
                      Khám phá công nghệ in 3D mới nhất và thỏa sức sáng tạo với
                      các giải pháp sáng tạo của chúng tôi.
                    </Text>
                  </GridItem>
                </FadeWrapper>

                <FadeWrapper>
                  <GridItem>
                    <Box
                      width="fit-content"
                      border="1px solid white"
                      borderRadius="10px"
                      p="8px"
                    >
                      <ReactSVG
                        src={vatlieu}
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            "style",
                            "width: 30px; height: 30px; fill: white"
                          );
                        }}
                      />
                    </Box>
                    <Text mt="30px" fontFamily="Montserrat" fontSize="26px">
                      Vật liệu chất lượng
                    </Text>
                    <Text mt="30px" fontSize="18px" textAlign="justify">
                      Chúng tôi tìm nguồn và sử dụng các vật liệu bền, chất
                      lượng cao để biến thiết kế của bạn thành hiện thực với kết
                      quả đặc biệt.
                    </Text>
                  </GridItem>
                </FadeWrapper>

                <FadeWrapper>
                  <GridItem>
                    <Box
                      width="fit-content"
                      border="1px solid white"
                      borderRadius="10px"
                      p="8px"
                    >
                      <ReactSVG
                        src={dichvu}
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            "style",
                            "width: 30px; height: 30px; fill: white"
                          );
                        }}
                      />
                    </Box>
                    <Text mt="30px" fontFamily="Montserrat" fontSize="26px">
                      Dịch vụ in ấn theo yêu cầu{" "}
                    </Text>
                    <Text mt="30px" fontSize="18px" textAlign="justify">
                      Chúng tôi hiểu rằng mỗi dự án là duy nhất. Phương pháp cá
                      nhân hóa của chúng tôi đảm bảo rằng nhu cầu in 3D của bạn
                      được đáp ứng một cách chính xác và cẩn thận.
                    </Text>
                  </GridItem>
                </FadeWrapper>

                <FadeWrapper>
                  <GridItem>
                    <Box
                      width="fit-content"
                      border="1px solid white"
                      borderRadius="10px"
                      p="8px"
                    >
                      <ReactSVG
                        src={huongdan}
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            "style",
                            "width: 30px; height: 30px; fill: white"
                          );
                        }}
                      />
                    </Box>
                    <Text mt="30px" fontFamily="Montserrat" fontSize="26px">
                      Hướng dẫn của chuyên gia{" "}
                    </Text>
                    <Text mt="30px" fontSize="18px" textAlign="justify">
                      Các cố vấn giàu kinh nghiệm của chúng tôi sẵn sàng hướng
                      dẫn bạn trong quá trình in 3D, cung cấp những hiểu biết
                      sâu sắc và hỗ trợ có giá trị.
                    </Text>
                  </GridItem>
                </FadeWrapper>
              </SimpleGrid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
