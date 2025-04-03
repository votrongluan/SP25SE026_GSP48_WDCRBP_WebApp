import React from "react";
import {
  Box,
  Text,
  Button,
  Stack,
  Icon,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { appColorTheme, service } from "../../../../../../config/appconfig.js";
import { useGetAvailableServiceByWwIdQuery } from "../../../../../../services/availableServiceApi";
import { useParams } from "react-router-dom";

export default function AvailableService({ woodworkerId, onServiceAction }) {
  const { id } = useParams();
  const wwId = woodworkerId || id;

  const {
    data: response,
    isLoading,
    error,
  } = useGetAvailableServiceByWwIdQuery(wwId);

  const services = response?.data || [];

  const handleServiceClick = (serviceType) => {
    const serviceConfig = service[serviceType] || {};
    if (serviceConfig && onServiceAction) {
      onServiceAction(
        serviceType,
        serviceConfig.path,
        serviceConfig.action,
        serviceConfig.tabIndex
      );
    }
  };

  if (isLoading) {
    return (
      <Center
        p={5}
        bgColor="white"
        boxShadow="md"
        borderRadius="10px"
        h="200px"
      >
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (error) {
    return (
      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Text color="red.500">
          Unable to load available services. Please try again later.
        </Text>
      </Box>
    );
  }

  return (
    <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
      <Stack spacing={6}>
        {services.map((availableService) => {
          if (!availableService.operatingStatus || !availableService.status)
            return null;

          const serviceType = availableService.service.serviceName;
          const serviceInfo = service[serviceType] || {};

          return (
            <Box key={availableService.availableServiceId}>
              <Text
                fontFamily="Montserrat"
                fontWeight="bold"
                as="h3"
                fontSize="20px"
                mb={1}
                color={appColorTheme.brown_2}
              >
                {serviceInfo.serviceName}
              </Text>
              <Text mb={2}>
                <b>Mô tả dịch vụ của xưởng:</b> {availableService.description}
              </Text>
              <Button
                bg={appColorTheme.brown_2}
                color="white"
                borderRadius="20px"
                px={6}
                py={3}
                _hover={{ bg: appColorTheme.brown_1 }}
                rightIcon={<Icon as={FiArrowRight} />}
                onClick={() => handleServiceClick(serviceType)}
              >
                {serviceInfo.buttonText || "Đặt dịch vụ"}
              </Button>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
