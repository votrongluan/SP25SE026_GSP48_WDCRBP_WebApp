import { Box, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { appColorTheme } from "../../config/appconfig";

export default function ImageListSelector({ imgUrls, imgH = 500 }) {
  const imageList = imgUrls ? imgUrls.split(";") : [];
  const [mainImage, setMainImage] = useState(imageList[0] || "");
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Switch mainImage to whichever thumbnail was clicked
  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  // When main image is clicked, open fullscreen mode
  const handleMainImageClick = () => {
    if (mainImage) {
      setIsFullScreen(true);
    }
  };

  // Close fullscreen mode
  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  // Jump to the next image in the list
  const handleNextImage = () => {
    if (!imageList.length) return;
    const currentIndex = imageList.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % imageList.length;
    setMainImage(imageList[nextIndex]);
  };

  // Jump to the previous image in the list
  const handlePrevImage = () => {
    if (!imageList.length) return;
    const currentIndex = imageList.indexOf(mainImage);
    const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    setMainImage(imageList[prevIndex]);
  };

  return (
    <Box position="relative">
      {/* Main Image Display */}
      <Box mb={4} onClick={handleMainImageClick} cursor="pointer">
        {mainImage ? (
          <Image
            src={mainImage}
            borderRadius="md"
            w="100%"
            h={`${imgH}px`}
            objectFit="contain"
            borderTop="1px solid gray"
            borderBottom="1px solid gray"
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

      {/* Thumbnail List */}
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

      {/* Fullscreen Overlay */}
      {isFullScreen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100svw"
          h="100svh"
          bg="rgba(0,0,0,0.9)"
          zIndex="9999"
        >
          <Flex h="100%" alignItems="center">
            {/* Thumbnail Column on the left */}
            <Box
              w="100px"
              h="100%"
              overflowY="auto"
              p={2}
              bg="rgba(255,255,255,0.05)"
            >
              {imageList.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  w="80px"
                  h="80px"
                  mb={2}
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                  border={
                    mainImage === img
                      ? `2px solid ${appColorTheme.brown_2}`
                      : "2px solid transparent"
                  }
                  onClick={() => setMainImage(img)}
                />
              ))}
            </Box>

            {/* Main Image Area */}
            <Flex
              flex="1"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              {/* Prev Button */}
              <IconButton
                icon={<ArrowLeftIcon />}
                aria-label="Previous Image"
                position="absolute"
                left="10"
                colorScheme="whiteAlpha"
                onClick={handlePrevImage}
              />

              {/* Display the main image fullscreen */}
              <Image
                src={mainImage}
                maxH="90%"
                maxW="90%"
                objectFit="contain"
                borderRadius="md"
              />

              {/* Next Button */}
              <IconButton
                icon={<ArrowRightIcon />}
                aria-label="Next Image"
                position="absolute"
                right="10"
                colorScheme="whiteAlpha"
                onClick={handleNextImage}
              />

              {/* Close Button */}
              <IconButton
                icon={<CloseIcon />}
                aria-label="Close Fullscreen"
                position="fixed"
                top="1rem"
                right="2rem"
                colorScheme="whiteAlpha"
                onClick={handleCloseFullScreen}
              />
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
