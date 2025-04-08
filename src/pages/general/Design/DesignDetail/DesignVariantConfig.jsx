import { useState, useEffect } from "react";
import { Box, Text, Flex, Stack } from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import { formatPrice } from "../../../../utils/utils.js";

export default function DesignVariantConfig({
  designVariants,
  design,
  onVariantSelect,
}) {
  // Transform the API data to structured format
  const getConfigurationsFromVariants = (variants) => {
    if (!variants || variants.length === 0) return [];

    // Extract unique config specifications
    const configMap = new Map();

    variants.forEach((variant) => {
      variant.designIdeaVariantConfig.forEach((config) => {
        const configValue = config.designVariantValues[0];
        const configSpec = configValue.designIdeaConfig;

        if (!configMap.has(configSpec.designIdeaConfigId)) {
          configMap.set(configSpec.designIdeaConfigId, {
            id: configSpec.designIdeaConfigId,
            name: configSpec.specifications,
            values: new Map(),
          });
        }

        const configEntry = configMap.get(configSpec.designIdeaConfigId);
        if (!configEntry.values.has(configValue.designIdeaConfigValueId)) {
          configEntry.values.set(configValue.designIdeaConfigValueId, {
            id: configValue.designIdeaConfigValueId,
            name: configValue.value,
          });
        }
      });
    });

    // Convert Maps to Arrays for easier rendering
    return Array.from(configMap.values()).map((config) => ({
      ...config,
      values: Array.from(config.values.values()),
    }));
  };

  // Transform price data from variants - updated to include variantId
  const getPricesFromVariants = (variants) => {
    if (!variants || variants.length === 0) return [];

    return variants.map((variant) => {
      const configValues = variant.designIdeaVariantConfig.map(
        (config) => config.designVariantValues[0].designIdeaConfigValueId
      );

      // Extract config IDs from the first variant to maintain consistency
      const configIds = variant.designIdeaVariantConfig.map(
        (config) =>
          config.designVariantValues[0].designIdeaConfig.designIdeaConfigId
      );

      return {
        config: configIds,
        configValue: configValues,
        price: variant.price,
        variantId: variant.designIdeaVariantId, // Add variant ID
      };
    });
  };

  // Create structured data from API response
  const configurations = getConfigurationsFromVariants(designVariants);
  const prices = getPricesFromVariants(designVariants);

  // State for selected values (initialize with first values if available)
  const [selectedValues, setSelectedValues] = useState(() => {
    if (configurations.length > 0) {
      return configurations
        .map((config) =>
          config.values.length > 0 ? config.values[0].id : null
        )
        .filter(Boolean);
    }
    return [];
  });

  // Update selected values if configurations change
  useEffect(() => {
    if (configurations.length > 0) {
      setSelectedValues(
        configurations
          .map((config) =>
            config.values.length > 0 ? config.values[0].id : null
          )
          .filter(Boolean)
      );
    }
  }, [designVariants]);

  // Find price and variant based on selected configuration
  const selectedVariantInfo = prices.find(
    (p) =>
      p.configValue.length === selectedValues.length &&
      p.configValue.every((value) => selectedValues.includes(value))
  );

  const selectedPrice = selectedVariantInfo?.price;

  // Find full variant object when selection changes
  useEffect(() => {
    if (selectedVariantInfo && designVariants) {
      // Find the full variant object that matches our selection
      const fullVariant = designVariants.find(
        (variant) =>
          variant.designIdeaVariantId === selectedVariantInfo.variantId
      );

      if (fullVariant && onVariantSelect) {
        onVariantSelect(fullVariant);
      }
    }
  }, [selectedValues, designVariants, selectedVariantInfo, onVariantSelect]);

  if (!configurations.length) {
    return (
      <Box p={4}>
        <Text>Không có thông tin cấu hình cho thiết kế này</Text>
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={4}>
        <Text mt={5} fontSize="18px" fontWeight="bold">
          Cấu hình sản phẩm
        </Text>
        {configurations.map((config) => (
          <Flex gap={5} justifyContent="space-between" key={config.id}>
            <Text width="200px" fontWeight="bold">
              {config.name}
            </Text>
            <Flex flex="1" flexWrap="wrap" gap={5}>
              {config.values.map((value) => (
                <Box key={value.id}>
                  <Box
                    p={2}
                    textAlign="center"
                    cursor="pointer"
                    fontWeight="bold"
                    bg="none"
                    border={
                      selectedValues.includes(value.id)
                        ? `1px solid ${appColorTheme.brown_2}`
                        : "1px solid black"
                    }
                    color={
                      selectedValues.includes(value.id)
                        ? `${appColorTheme.brown_2}`
                        : "black"
                    }
                    onClick={() => {
                      const updatedValues = [...selectedValues];
                      // Find if there's already a selection for this config type
                      const currentIndex = configurations.findIndex(
                        (c) => c.id === config.id
                      );
                      if (currentIndex !== -1) {
                        // Replace the old value with the new one
                        const oldValueIndex = updatedValues.findIndex((v) =>
                          configurations[currentIndex].values.some(
                            (val) => val.id === v
                          )
                        );
                        if (oldValueIndex !== -1) {
                          updatedValues[oldValueIndex] = value.id;
                        } else {
                          updatedValues.push(value.id);
                        }
                      }
                      setSelectedValues(updatedValues);
                    }}
                  >
                    {value.name}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Flex>
        ))}
      </Stack>

      <Box mt={4} p={5} bgColor={appColorTheme.grey_0}>
        <Text fontSize="30px" color={appColorTheme.brown_2} fontWeight="bold">
          {selectedPrice ? `${formatPrice(selectedPrice)}` : "Không có giá"}
        </Text>
      </Box>
    </>
  );
}
