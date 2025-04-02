import { HStack, Spacer } from "@chakra-ui/react";
import AppointmentUpdateModal from "./AppointmentUpdateModal.jsx";
import ContractUpdateModal from "./ContractUpdateModal.jsx";

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
