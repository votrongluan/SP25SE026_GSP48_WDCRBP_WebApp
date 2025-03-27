import { HStack, Spacer } from "@chakra-ui/react";
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
