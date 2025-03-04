import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function ConfirmationDialog({ onConfirm, title, color }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Box p="8px" width="100%" onClick={onOpen}>
        {title}
      </Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xác nhận</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Bạn có chắc chắn muốn thực hiện thao tác này?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Không
            </Button>
            <Button colorScheme="telegram" ml={3} onClick={onConfirm}>
              Có
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
