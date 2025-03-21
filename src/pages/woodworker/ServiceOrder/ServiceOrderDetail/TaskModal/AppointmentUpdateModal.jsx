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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { appColorTheme } from "../../../../../config/appconfig.js";
import AutoResizeTextarea from "../../../../../components/Input/AutoResizeTextarea.jsx";

// Hàm lấy thời gian địa phương theo định dạng "YYYY-MM-DDTHH:mm"
const getLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 16);
};

const appointmentData = {
  type: "Online",
  location: "https://google.com",
  date: getLocalDateTime(),
  description:
    "Bàn bạc chi tiết mô tả và chỉnh sửa lại các yêu cầu để đảm báo tính khả thi",
};

export default function AppointmentUpdateModal({ order, reFetch }) {
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const [formData, setFormData] = useState(appointmentData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
        size="xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">
            Tạo, điều chỉnh lịch hẹn
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const putData = Object.fromEntries(formData);
                putData.orderStatus = +putData.orderStatus;
              }}
            >
              <Box>
                <Heading
                  fontWeight="bold"
                  fontSize="20px"
                  mb={5}
                  textAlign="center"
                >
                  Thông tin lịch hẹn
                </Heading>

                <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
                  <Grid templateColumns="100px 1fr" gap={4}>
                    <GridItem>
                      <Text fontWeight="bold" mb={2}>
                        Hình thức:
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Input
                        value={formData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        placeholder="Hình thức"
                      />
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold" mb={2}>
                        Địa điểm:
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Input
                        value={formData.location}
                        onChange={(e) =>
                          handleChange("location", e.target.value)
                        }
                        placeholder="Địa điểm"
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
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        placeholder="Ngày hẹn"
                      />
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold" mb={2}>
                        Mô tả:
                      </Text>
                    </GridItem>
                    <GridItem>
                      <AutoResizeTextarea
                        value={formData.description}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        placeholder="Mô tả"
                      />
                    </GridItem>
                  </Grid>
                </Box>
              </Box>
              <HStack mt={10}>
                <Spacer />
                <Button colorScheme="blue" mr={3} type="submit">
                  Cập nhật
                </Button>
                <Button onClick={onClose}>Hủy</Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
