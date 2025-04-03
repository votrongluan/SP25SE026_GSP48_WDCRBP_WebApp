import {
  Box,
  Button,
  Grid,
  Heading,
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
  Textarea,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiEye, FiX, FiCheck, FiSlash } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import ImageListSelector from "../../../../components/Utility/ImageListSelector";
import { useUpdateWoodworkerStatusMutation } from "../../../../services/woodworkerApi";
import CheckboxList from "../../../../components/Utility/CheckboxList";
import { useNotify } from "../../../../components/Utility/Notify";

export default function WWRegistrationDetailModal({ registration, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const initialRef = useRef(null);
  const notify = useNotify();
  const [description, setDescription] = useState("");

  const [updateStatus, { isLoading }] = useUpdateWoodworkerStatusMutation();

  const handleStatusUpdate = async (status) => {
    try {
      if (!description) {
        setDescription(
          status
            ? "Chúc mừng bạn đơn đăng ký của bạn đã được kiểm duyệt"
            : "Rất tiếc, đơn đăng ký của bạn đã bị từ chối"
        );
      }

      const res = await updateStatus({
        woodworkerId: registration.woodworkerId,
        status,
        description,
      }).unwrap();

      notify("Thao tác thành công", res?.message, "success");

      refetch();
      onClose();
    } catch (error) {
      notify(
        "Có lỗi xảy ra",
        error.data?.message || "Vui lòng thử lại sau",
        "error"
      );
    }
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
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={isLoading ? null : onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi tiết đăng ký thợ mộc</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody bgColor="app_grey.1" pb={6}>
            <Stack gap={5}>
              <SimpleGrid
                columns={{
                  base: 1,
                  xl: 2,
                }}
                gap={5}
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
                  <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                    <VStack align="stretch" spacing={4}>
                      <Box>
                        <Text fontWeight="bold">Mã thợ mộc:</Text>
                        <Text>{registration?.woodworkerId}</Text>
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
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    <Box>
                      <Text fontWeight="bold">Tên xưởng mộc:</Text>
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
                      <Text whiteSpace="pre-wrap">{registration?.bio}</Text>
                    </Box>
                  </Grid>
                </Box>
              </Box>

              {/* Phần ghi chú */}
              <Box>
                <FormControl>
                  <FormLabel>Ghi chú</FormLabel>
                  <Textarea
                    placeholder="Nhập ghi chú về việc duyệt/từ chối đăng ký"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Stack>

            <HStack mt={6}>
              <CheckboxList
                items={[
                  {
                    isOptional: false,
                    description:
                      "Tôi đã kiểm tra thông tin và xác nhận thao tác",
                  },
                ]}
                setButtonDisabled={setButtonDisabled}
              />
            </HStack>

            <Stack direction="row" justify="flex-end" mt={6} spacing={4}>
              <Button
                isLoading={isLoading}
                onClick={onClose}
                leftIcon={<FiX />}
              >
                Đóng
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleStatusUpdate(false)}
                isLoading={isLoading}
                isDisabled={buttonDisabled}
                leftIcon={<FiSlash />}
              >
                Từ chối
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => handleStatusUpdate(true)}
                isLoading={isLoading}
                isDisabled={buttonDisabled}
                leftIcon={<FiCheck />}
              >
                Duyệt
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
