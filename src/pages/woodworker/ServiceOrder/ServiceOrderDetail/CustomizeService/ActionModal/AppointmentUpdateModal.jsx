import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";
import { appColorTheme } from "../../../../../../config/appconfig.js";
import AutoResizeTextarea from "../../../../../../components/Input/AutoResizeTextarea.jsx";
import { useAcceptServiceOrderMutation } from "../../../../../../services/serviceOrderApi.js";
import CheckboxList from "../../../../../../components/Utility/CheckboxList.jsx";
import { useNotify } from "../../../../../../components/Utility/Notify.jsx";

export default function AppointmentUpdateModal({ order, refetch }) {
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const notify = useNotify();

  // API mutation
  const [acceptServiceOrder, { isLoading }] = useAcceptServiceOrderMutation();

  // Button disable state for checkboxes
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData from form and convert to object
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData);

      // Add order ID to the form data
      const apiData = {
        serviceOrderId: order.orderId,
        ...formDataObj,
      };

      // Call the API
      await acceptServiceOrder(apiData).unwrap();

      notify(
        "Lịch hẹn đã được cập nhật",
        "Thông tin lịch hẹn đã được lưu thành công",
        "success"
      );
      refetch();
      onClose();
    } catch (error) {
      console.error("Appointment update error:", error);
      notify(
        "Đã xảy ra lỗi",
        error.message || "Không thể cập nhật lịch hẹn, vui lòng thử lại sau",
        "error"
      );
    }
  };

  const confirmationItems = [
    {
      description: "Tôi xác nhận cập nhật thông tin lịch hẹn",
      isOptional: false,
    },
  ];

  return (
    <>
      <Button
        py={1}
        px={2}
        color={appColorTheme.blue_0}
        bg="none"
        border={`1px solid ${appColorTheme.blue_0}`}
        _hover={{ bg: appColorTheme.blue_0, color: "white" }}
        leftIcon={<FiCalendar />}
        onClick={onOpen}
      >
        Đặt lịch
      </Button>

      <Modal
        size="5xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tạo, điều chỉnh lịch hẹn</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody bgColor="app_grey.1" pb={6}>
            <form onSubmit={handleSubmit}>
              <Box>
                <Heading
                  fontWeight="bold"
                  fontSize="20px"
                  mb={6}
                  textAlign="center"
                >
                  Thông tin lịch hẹn
                </Heading>

                <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
                  <Grid templateColumns="100px 1fr" gap={5}>
                    <GridItem>
                      <Text fontWeight="bold" mb={2}>
                        Hình thức:
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Input name="form" placeholder="Hình thức" required />
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold" mb={2}>
                        Địa điểm:
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Input
                        name="linkMeeting"
                        placeholder="Địa điểm"
                        required
                      />
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold" mb={2}>
                        Ngày hẹn:
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Input
                        type="datetime-local"
                        name="timeMeeting"
                        placeholder="Ngày hẹn"
                        required
                      />
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold" mb={2}>
                        Mô tả:
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Textarea name="desc" placeholder="Mô tả" required />
                    </GridItem>
                  </Grid>
                </Box>
              </Box>

              <Box mt={6}>
                <CheckboxList
                  items={confirmationItems}
                  setButtonDisabled={setIsButtonDisabled}
                />
              </Box>

              <HStack mt={10}>
                <Spacer />
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Đang lưu"
                  leftIcon={<FiCheck />}
                  isDisabled={isButtonDisabled}
                >
                  Cập nhật
                </Button>
                <Button onClick={onClose} leftIcon={<FiX />}>
                  Hủy
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
