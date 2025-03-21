import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiXCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ContractUpdateModal from "./UpdateModal/ContractUpdateModal.jsx";
import AppointmentUpdateModal from "./UpdateModal/AppointmentUpdateModal.jsx";
import DesignUpdateModal from "./UpdateModal/DesignUpdateModal.jsx";

export default function ActionBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box position="fixed" top="20px" right="20px" zIndex="2">
      <HStack spacing={2} bg="white" borderRadius="10px" p={2} boxShadow="md">
        <IconButton
          icon={isOpen ? <FiChevronRight /> : <FiChevronLeft />}
          onClick={() => setIsOpen(!isOpen)}
          colorScheme="gray"
          size="lg"
          aria-label="Toggle Actions"
        />

        {isOpen && (
          <>
            <DesignUpdateModal />
            <Button leftIcon={<FiXCircle />} colorScheme="red">
              Hủy
            </Button>
          </>
        )}
      </HStack>
    </Box>
  );
}
