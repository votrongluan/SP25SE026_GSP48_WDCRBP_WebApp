import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spacer,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import AppointmentTab from "../Tab/AppointmentTab";
import AutoResizeTextarea from "../../../../components/Inputs/AutoResizeTextarea";
import ProductTab from "../Tab/ProductTab";

export default function AppointmentUpdateModal({ order, reFetch }) {
  const toast = useToast();
  const navigate = useNavigate();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Button leftIcon={<FiRefreshCw />} colorScheme="blue" onClick={onOpen}>
        Cập nhật
      </Button>

      <Modal
        size="full"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">
            Xác nhận, điều chỉnh lịch hẹn
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
              <SimpleGrid
                mt={4}
                columns={{
                  base: 1,
                  xl: 2,
                }}
                spacing={10}
              >
                <Box>
                  <AppointmentTab />
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Hình thức</FormLabel>
                    <Select name="orderStatus" type="text" ref={initialRef}>
                      <option value={0}>Trực tuyến</option>
                      <option value={1}>Trực tiếp</option>
                    </Select>
                  </FormControl>

                  <FormControl mt={4} isRequired>
                    <FormLabel>Địa điểm</FormLabel>
                    <Input
                      name="location"
                      type="text"
                      placeholder="Nhập địa điểm hoặc đường link họp"
                    />
                  </FormControl>

                  <FormControl mt={4} isRequired>
                    <FormLabel>Ngày hẹn</FormLabel>
                    <Input name="meetingDate" type="datetime-local" />
                  </FormControl>

                  <FormControl mt={4} isRequired>
                    <FormLabel>Mô tả</FormLabel>
                    <AutoResizeTextarea
                      name="description"
                      placeholder="Nhập mô tả nội dung cuộc họp..."
                    />
                  </FormControl>
                </Box>
              </SimpleGrid>

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
