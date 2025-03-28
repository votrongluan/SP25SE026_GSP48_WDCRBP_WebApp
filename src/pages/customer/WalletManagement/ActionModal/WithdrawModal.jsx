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

export default function WithdrawModal({ isOpen, onClose, balance }) {
  const initialRef = useRef(null);
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleSubmit = () => {
    // TODO: Implement withdraw logic
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rút tiền</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Text>
              Số dư hiện tại:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(balance)}
            </Text>

            <FormControl>
              <FormLabel>Số tiền rút</FormLabel>
              <Input
                ref={initialRef}
                value={amount}
                onChange={handleAmountChange}
                placeholder="Nhập số tiền cần rút"
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
            colorScheme="purple"
            onClick={handleSubmit}
            isDisabled={
              !amount || parseInt(amount) <= 0 || parseInt(amount) > balance
            }
          >
            Rút tiền
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

WithdrawModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};
