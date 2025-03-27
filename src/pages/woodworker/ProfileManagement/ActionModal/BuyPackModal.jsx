import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { convertTimeStampToDateTimeString } from "../../../../utils/utils";

const PACK_PRICES = {
  vàng: {
    monthly: 400000,
    quarterly: 1000000,
    annual: 3500000,
  },
  bạc: {
    monthly: 200000,
    quarterly: 500000,
    annual: 1800000,
  },
  đồng: {
    monthly: 100000,
    quarterly: 250000,
    annual: 900000,
  },
};

export default function BuyPackModal({ isOpen, onClose }) {
  const [packType, setPackType] = useState("");
  const [duration, setDuration] = useState("");

  const calculateEndDate = (duration) => {
    const currentDate = new Date();
    let endDate = new Date();

    switch (duration) {
      case "monthly":
        endDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "quarterly":
        endDate.setMonth(currentDate.getMonth() + 3);
        break;
      case "annual":
        endDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        return null;
    }

    return endDate.toISOString().split("T")[0];
  };

  const handleSubmit = () => {
    // TODO: Implement buy pack logic
    onClose();
  };

  const getPrice = () => {
    if (!packType || !duration) return 0;
    return PACK_PRICES[packType][duration];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mua gói mới</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={6}>
            <FormControl>
              <FormLabel>Loại gói</FormLabel>
              <Select
                placeholder="Chọn loại gói"
                value={packType}
                onChange={(e) => setPackType(e.target.value)}
              >
                <option value="vàng">Gói Vàng</option>
                <option value="bạc">Gói Bạc</option>
                <option value="đồng">Gói Đồng</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Thời gian</FormLabel>
              <Select
                placeholder="Chọn thời gian"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="monthly">Hàng tháng</option>
                <option value="quarterly">3 tháng</option>
                <option value="annual">1 năm</option>
              </Select>
            </FormControl>

            {packType && duration && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold">Ngày bắt đầu:</Text>
                  <Text fontSize="xl">
                    {convertTimeStampToDateTimeString(new Date())}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Ngày kết thúc:</Text>
                  <Text fontSize="xl">
                    {convertTimeStampToDateTimeString(
                      new Date(calculateEndDate(duration))
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Giá gói:</Text>
                  <Text fontSize="xl" color="green.500">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(getPrice())}
                  </Text>
                </Box>
              </VStack>
            )}

            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isDisabled={!packType || !duration}
            >
              Mua gói
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

BuyPackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
