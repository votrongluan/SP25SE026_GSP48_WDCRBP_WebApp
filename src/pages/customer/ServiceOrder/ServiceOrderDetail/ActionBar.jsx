import { Box, Button, HStack, Spacer } from "@chakra-ui/react";
import { FiXCircle } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import FeedbackModal from "./FeedbackModal";

export default function ActionBar() {
  return (
    <>
      <HStack spacing={2}>
        <Spacer />
        <FeedbackModal />
        <Box>
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
        </Box>
        <Spacer />
      </HStack>
    </>
  );
}
