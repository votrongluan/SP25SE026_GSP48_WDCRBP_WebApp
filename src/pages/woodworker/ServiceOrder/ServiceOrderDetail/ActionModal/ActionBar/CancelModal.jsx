import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNotify } from "../../../../../../components/Utility/Notify";
import { FiAlertCircle, FiXCircle, FiXOctagon } from "react-icons/fi";
import CheckboxList from "../../../../../../components/Utility/CheckboxList";
import { useCancelOrderMutation } from "../../../../../../services/serviceOrderApi";

export default function CancelModal({ serviceOrderId, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notify = useNotify();
  const initialRef = useRef(null);
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  const checkboxItems = [
    {
      description: "Tôi đã kiểm tra thông tin và xác nhận thao tác",
      isOptional: false,
    },
  ];

  const handleSubmit = async () => {
    try {
      await cancelOrder({ serviceOrderId: Number(serviceOrderId) });

      notify("Hủy thành công", "", "success");

      onClose();
      refetch(); // Refresh data
    } catch (err) {
      notify(
        "Gửi yêu cầu thất bại",
        err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <>
      <Button
        leftIcon={<FiXOctagon />}
        colorScheme="red"
        variant="outline"
        onClick={onOpen}
      >
        Không nhận đơn
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={isLoading ? undefined : onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xác nhận hủy đơn hàng</ModalHeader>
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Text color="red.500">Bạn đang yêu cầu hủy đơn hàng này.</Text>

              <CheckboxList
                items={checkboxItems}
                setButtonDisabled={setIsCheckboxDisabled}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              variant="ghost"
              mr={3}
              onClick={onClose}
              leftIcon={<FiXCircle />}
            >
              Đóng
            </Button>
            <Button
              colorScheme="red"
              onClick={handleSubmit}
              isLoading={isLoading}
              isDisabled={isCheckboxDisabled}
              leftIcon={<FiAlertCircle />}
            >
              Không nhận đơn hàng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
