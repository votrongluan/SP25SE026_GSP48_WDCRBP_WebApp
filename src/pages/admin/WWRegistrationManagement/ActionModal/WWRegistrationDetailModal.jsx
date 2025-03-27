import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiEye } from "react-icons/fi";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { appColorTheme } from "../../../../config/appconfig";
import ImageListSelector from "../../../../components/Utility/ImageListSelector";

export default function WWRegistrationDetailModal({ registration, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const navigate = useNavigate();

  const handleApprove = () => {
    // TODO: Implement approve logic
    navigate(
      "/success?title=Duyệt đăng ký thành công&desc=Đã duyệt đăng ký thợ mộc thành công&path=/ad/ww-registration"
    );
  };

  return (
    <>
      <Tooltip label="Chi tiết" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.brown_2}
          bg="none"
          border={`1px solid ${appColorTheme.brown_2}`}
          _hover={{ bg: appColorTheme.brown_2, color: "white" }}
          onClick={onOpen}
        >
          <FiEye />
        </Button>
      </Tooltip>

      <Modal
        size="6xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">
            Chi tiết đăng ký thợ mộc
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <Stack gap={6}>
              <SimpleGrid
                columns={{
                  base: 1,
                  xl: 2,
                }}
                gap={6}
              >
                {/* Phần hình ảnh */}
                <Box>
                  <Heading size="md" mb={4}>
                    Ảnh đại diện
                  </Heading>
                  <ImageListSelector
                    imgH={300}
                    imgUrls={registration?.imgUrl}
                  />
                </Box>

                {/* Phần thông tin cơ bản */}
                <Box>
                  <Heading size="md" mb={4}>
                    Thông tin cơ bản
                  </Heading>
                  <Box bg="white" p={5} borderRadius="lg" boxShadow="sm">
                    <VStack align="stretch" spacing={4}>
                      <Box>
                        <Text fontWeight="bold">Mã đăng ký:</Text>
                        <Text>{registration?.id}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Họ và tên:</Text>
                        <Text>{registration?.fullName}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Email:</Text>
                        <Text>{registration?.email}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Số điện thoại:</Text>
                        <Text>{registration?.phone}</Text>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </SimpleGrid>

              {/* Phần thông tin xưởng mộc */}
              <Box gridColumn="span 2">
                <Heading size="md" mb={4}>
                  Thông tin xưởng mộc
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="sm">
                  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    <Box>
                      <Text fontWeight="bold">Tên thương hiệu:</Text>
                      <Text>{registration?.brandName}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Loại hình kinh doanh:</Text>
                      <Text>{registration?.businessType}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Mã số thuế:</Text>
                      <Text>{registration?.taxCode}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Địa chỉ:</Text>
                      <Text>{registration?.address}</Text>
                    </Box>
                    <Box gridColumn="span 2">
                      <Text fontWeight="bold">Giới thiệu:</Text>
                      <Text>{registration?.bio}</Text>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </Stack>

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
              <Button colorScheme="blue" onClick={handleApprove}>
                Duyệt
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

WWRegistrationDetailModal.propTypes = {
  registration: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    businessType: PropTypes.string.isRequired,
    taxCode: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
