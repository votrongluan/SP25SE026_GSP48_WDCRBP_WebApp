import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import AppointmentTab from "../Tab/AppointmentTab";
import AutoResizeTextarea from "../../../../components/Input/AutoResizeTextarea";
import ProductTab from "../Tab/ProductTab";
import { formatPrice } from "../../../../utils/utils";

export default function DesignUpdateModal({ order, reFetch }) {
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
            Xác nhận, điều chỉnh thiết kế sản phẩm
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
                  <ProductTab />
                </Box>

                <Box>
                  <Heading
                    textAlign="center"
                    fontWeight={500}
                    as="h3"
                    fontSize="20px"
                    mb={4}
                  >
                    Phản hồi
                  </Heading>

                  <Box boxShadow="md" borderRadius="10px" p={5} bgColor="white">
                    <FormControl isRequired>
                      <FormLabel>Phản hồi</FormLabel>
                      <AutoResizeTextarea />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Trạng thái</FormLabel>
                      <Select name="orderStatus" type="text" ref={initialRef}>
                        <option value={0}>Xác nhận đồng ý</option>
                        <option value={1}>Yêu cầu điểu chỉnh</option>
                      </Select>
                    </FormControl>

                    <VStack>
                      <HStack mt={4}>
                        <Text>Số dư ví:</Text>
                        <Text fontWeight={500}>{formatPrice(12000000)}</Text>
                      </HStack>

                      <HStack mt={4}>
                        <Text>Số tiền đặt cọc:</Text>
                        <Text fontWeight={500}>{formatPrice(5000000)}</Text>
                      </HStack>
                    </VStack>
                  </Box>
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
