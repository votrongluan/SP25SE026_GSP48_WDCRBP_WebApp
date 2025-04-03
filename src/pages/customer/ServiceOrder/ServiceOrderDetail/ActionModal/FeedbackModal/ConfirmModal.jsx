import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAcceptServiceOrderMutation } from "../../../../../../services/serviceOrderApi";
import { useNotify } from "../../../../../../components/Utility/Notify";
import { FiCheck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import CheckboxList from "../../../../../../components/Utility/CheckboxList";

export default function ConfirmModal({
  serviceOrderId,
  details,
  buttonText = "Xác nhận",
  refetch,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notify = useNotify();
  const [acceptOrder, { isLoading }] = useAcceptServiceOrderMutation();
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);

  const checkboxItems = [
    {
      description: "Tôi đã kiểm tra thông tin và xác nhận thao tác",
      isOptional: false,
    },
  ];

  const handleSubmit = async () => {
    try {
      await acceptOrder({
        serviceOrderId: serviceOrderId,
      }).unwrap();

      notify(
        "Xác nhận thành công",
        "Đơn hàng của bạn đã được cập nhật",
        "success"
      );

      onClose();
      refetch(); // Refresh data
    } catch (err) {
      notify(
        "Xác nhận thất bại",
        err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <>
      <Button leftIcon={<FiCheckCircle />} colorScheme="green" onClick={onOpen}>
        {buttonText}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={isLoading ? null : onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{buttonText}</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Divider my={2} />
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
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={isLoading}
              isDisabled={isCheckboxDisabled}
              leftIcon={<FiCheck />}
            >
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
