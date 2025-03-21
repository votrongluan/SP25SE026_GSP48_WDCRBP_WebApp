import { Button, HStack, Spacer } from "@chakra-ui/react";
import { FiCalendar, FiCheck, FiXCircle } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import FeedbackModal from "./FeedbackModal";
import AppointmentUpdateModal from "./TaskModal/AppointmentUpdateModal";
import ContractUpdateModal from "./TaskModal/ContractUpdateModal";

export default function ActionBar() {
  return (
    <>
      <HStack spacing={4}>
        <Spacer />

        <AppointmentUpdateModal />
        <ContractUpdateModal />

        <Spacer />
      </HStack>
    </>
  );
}
