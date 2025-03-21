import React, { useState } from "react";
import {
  Button,
  HStack,
  IconButton,
  Image,
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { appColorTheme } from "../../../../../config/appconfig.js";

export default function DesignFileRow({ designFiles }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState([]);
  // Mặc định hiển thị phiên bản mới nhất: index = designFiles.length - 1
  const [currentIndex, setCurrentIndex] = useState(designFiles.length - 1);

  const currentDesign = designFiles[currentIndex];

  const handlePrevVersion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextVersion = () => {
    if (currentIndex < designFiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleViewFile = () => {
    const arr = currentDesign.mediaUrls.split(";");
    setImages(arr);
    onOpen();
  };

  const handleDownloadAll = async () => {
    const arr = currentDesign.mediaUrls.split(";");
    for (let i = 0; i < arr.length; i++) {
      const url = arr[i].trim();
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        // Lấy phần mở rộng từ URL, nếu không có mặc định .jpg
        const extMatch = url.match(/\.(jpg|jpeg|png|gif)$/i);
        const ext = extMatch ? extMatch[0] : ".jpg";
        link.download = `file_thiet_ke_v${currentDesign.version}_${
          i + 1
        }${ext}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Lỗi tải file:", error);
      }
    }
  };

  // Nếu không có designFiles hoặc rỗng thì không hiển thị gì
  if (!designFiles || designFiles.length === 0) return null;

  return (
    <>
      <HStack
        p={5}
        bg="gray.50"
        borderRadius="md"
        boxShadow="sm"
        spacing={5}
        alignItems="center"
      >
        {/* Icon chuyển sang phiên bản trước nếu có */}
        {currentIndex > 0 && (
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={handlePrevVersion}
            aria-label="Phiên bản trước"
            size="sm"
          />
        )}

        <Box flex="1">
          <Text fontWeight="bold">
            Phiên bản: {currentDesign.version} - Ngày upload:{" "}
            {currentDesign.uploadDate}
          </Text>
        </Box>

        {/* Icon chuyển sang phiên bản sau nếu có */}
        {currentIndex < designFiles.length - 1 && (
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={handleNextVersion}
            aria-label="Phiên bản tiếp theo"
            size="sm"
          />
        )}

        <HStack spacing={3}>
          <Button
            bg={appColorTheme.brown_2}
            color="white"
            borderRadius="30px"
            _hover={{ bg: `${appColorTheme.brown_1}` }}
            size="sm"
            colorScheme="blue"
            onClick={handleDownloadAll}
          >
            Tải xuống
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderRadius="30px"
            borderColor={appColorTheme.brown_2}
            color={appColorTheme.brown_2}
            onClick={handleViewFile}
          >
            Xem file thiết kế
          </Button>
        </HStack>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview file thiết kế</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`File thiết kế ${idx}`}
                borderRadius="md"
                objectFit="cover"
                mb={4}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
