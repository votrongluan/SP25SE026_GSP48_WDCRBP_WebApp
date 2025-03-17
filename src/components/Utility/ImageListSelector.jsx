import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../config/appconfig";

export default function ImageListSelector({ imgUrls }) {
  // Tách chuỗi media_urls thành mảng các URL
  const imageList = imgUrls ? imgUrls.split(";") : [];

  // Ảnh chính ban đầu lấy từ imageUrl, nếu không có thì lấy phần tử đầu của imageList
  const [mainImage, setMainImage] = useState(imageList[0] || "");

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  return (
    <Box>
      <Box mb={4}>
        {mainImage ? (
          <Image
            src={mainImage}
            borderRadius="md"
            w="100%"
            h="500px"
            objectFit="contain"
          />
        ) : (
          <Box
            w="100%"
            h="300px"
            bgColor="gray.200"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text>Không có ảnh</Text>
          </Box>
        )}
      </Box>

      <Flex gap={4} overflowX="auto">
        {imageList.map((img, index) => (
          <Image
            key={index}
            src={img}
            w="80px"
            h="80px"
            objectFit="cover"
            borderRadius="md"
            cursor="pointer"
            border={
              mainImage === img
                ? `2px solid ${appColorTheme.brown_2}`
                : "2px solid transparent"
            }
            onClick={() => handleThumbnailClick(img)}
          />
        ))}
      </Flex>
    </Box>
  );
}
