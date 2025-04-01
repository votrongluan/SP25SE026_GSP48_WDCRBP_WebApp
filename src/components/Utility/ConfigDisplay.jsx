import { Box, Flex, Text } from "@chakra-ui/react";

export default function ConfigDisplay({
  config,
  compact = true,
  color = "gray.900",
}) {
  if (!config || !Array.isArray(config) || config.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <Flex flexWrap="wrap" gap={1} mt={1}>
        {config.map((configItem, index) => {
          const value = configItem.designVariantValues[0];
          return (
            <Box
              key={index}
              bg="gray.100"
              px={2}
              py={0.5}
              borderRadius="md"
              fontSize="xs"
            >
              <Text as="span" fontWeight="medium">
                {value.designIdeaConfig.specifications}:
              </Text>{" "}
              <Text as="span">{value.value}</Text>
            </Box>
          );
        })}
      </Flex>
    );
  }

  // Standard display (like in cart details)
  return (
    <Box mt={1}>
      {config.map((configItem, index) => {
        const value = configItem.designVariantValues[0];
        return (
          <Flex key={index} fontSize="sm" mb={0.5}>
            <Text color={color} fontWeight="medium" mr={1}>
              {value.designIdeaConfig.specifications}:
            </Text>
            <Text color={color}>{value.value}</Text>
          </Flex>
        );
      })}
    </Box>
  );
}
