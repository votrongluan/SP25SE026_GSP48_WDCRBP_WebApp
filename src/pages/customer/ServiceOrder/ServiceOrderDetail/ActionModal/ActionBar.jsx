import { Button, HStack, Spacer } from "@chakra-ui/react";
import { FiCheck, FiXCircle } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import FeedbackModal from "./FeedbackModal";

export default function ActionBar() {
  return (
    <>
      <HStack spacing={4}>
        <Spacer />
        <Button
          py={1}
          px={2}
          color={appColorTheme.green_0}
          bg="none"
          border={`1px solid ${appColorTheme.green_0}`}
          _hover={{ bg: appColorTheme.green_0, color: "white" }}
          leftIcon={<FiCheck />}
        >
          Xác nhận lịch hẹn
        </Button>

        <FeedbackModal />

        <Button
          py={1}
          px={2}
          color={appColorTheme.red_0}
          bg="none"
          border={`1px solid ${appColorTheme.red_0}`}
          _hover={{ bg: appColorTheme.red_0, color: "white" }}
          leftIcon={<FiXCircle />}
        >
          Hủy
        </Button>
        <Spacer />
      </HStack>
    </>
  );
}
