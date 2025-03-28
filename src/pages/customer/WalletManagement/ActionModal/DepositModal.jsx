import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { appColorTheme } from "../../../../config/appconfig";

export default function DepositModal({ isOpen, onClose }) {
  const initialRef = useRef(null);
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleSubmit = () => {
    // TODO: Implement deposit logic
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nạp tiền</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Số tiền nạp</FormLabel>
              <Input
                ref={initialRef}
                value={amount}
                onChange={handleAmountChange}
                placeholder="Nhập số tiền cần nạp"
                type="number"
              />
            </FormControl>
            {amount && (
              <HStack justify="space-between">
                <Spacer />
                <Text
                  fontSize="xl"
                  color={appColorTheme.brown_2}
                  fontWeight="bold"
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(parseInt(amount))}
                </Text>
              </HStack>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isDisabled={!amount || parseInt(amount) <= 0}
          >
            Nạp tiền
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

DepositModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
