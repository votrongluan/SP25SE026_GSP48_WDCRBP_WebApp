import { VStack } from "@chakra-ui/react";
import RevenueDashboard from "./sections/RevenueDashboard";
import ServiceOrdersDashboard from "./sections/ServiceOrdersDashboard";
import WoodworkersDashboard from "./sections/WoodworkersDashboard";

export default function DashboardPage() {
  return (
    <VStack spacing={8} align="stretch">
      <RevenueDashboard />

      <ServiceOrdersDashboard />

      <WoodworkersDashboard />
    </VStack>
  );
}
