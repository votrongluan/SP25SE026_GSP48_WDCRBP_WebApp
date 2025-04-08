import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";
import { formatPrice } from "../../../../../utils/utils.js";
import ImageListSelector from "../../../../../components/Utility/ImageListSelector.jsx";

const TechSpecItem = ({ name, value, optionType }) => {
  // For file type specs, use ImageListSelector
  if (optionType === "file" && value) {
    return (
      <Box mb={4}>
        <Text fontWeight="bold" mb={2}>
          {name}:
        </Text>
        <ImageListSelector imgUrls={value} imgH={150} />
      </Box>
    );
  }

  // For other types, show as normal text
  return (
    <HStack justify="space-between" w="100%" mb={2}>
      <Text fontWeight="bold">{name}:</Text>
      <Text>{value || "Không có"}</Text>
    </HStack>
  );
};

export default function PersonalizationProductList({
  products = [],
  totalAmount = 0,
}) {
  console.log(products);

  return (
    <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
      <Heading fontWeight="bold" fontSize="20px" mb={6}>
        Thông tin sản phẩm
      </Heading>

      <Accordion allowMultiple>
        {products.map((product) => {
          const personalDetail = product.personalProductDetail;
          const techSpecList = personalDetail?.techSpecList || [];

          return (
            <AccordionItem
              key={product.requestedProductId}
              border="1px solid #ddd"
              bg="white"
              borderRadius="10px"
              mb={4}
            >
              <AccordionButton
                _expanded={{ bg: appColorTheme.brown_0 }}
                borderRadius="10px"
              >
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Box>
                      <Text fontWeight="bold">
                        Sản phẩm #{product.requestedProductId} x{" "}
                        {product.quantity}
                      </Text>
                      <Badge colorScheme="blue">
                        {product.category?.categoryName || "Không phân loại"}
                      </Badge>
                    </Box>
                    {product.totalAmount > 0 && (
                      <Text
                        fontSize="xl"
                        color={appColorTheme.brown_2}
                        fontWeight="bold"
                        marginLeft="auto"
                      >
                        {formatPrice(product.totalAmount)}
                      </Text>
                    )}
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Stack spacing={4}>
                  {/* Technical Specifications */}
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={3}>
                      Thông số kỹ thuật:
                    </Text>
                    <Stack spacing={2} divider={<Divider />}>
                      {techSpecList.map((spec, index) => (
                        <TechSpecItem
                          key={index}
                          name={spec.name}
                          value={spec.value}
                          optionType={spec.optionType}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Design Images if available */}
                  {personalDetail?.designUrls && (
                    <Box mt={4}>
                      <Text fontWeight="bold" fontSize="lg" mb={3}>
                        Thiết kế:
                      </Text>
                      <ImageListSelector
                        imgUrls={personalDetail.designUrls}
                        imgH={200}
                      />
                    </Box>
                  )}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>

      {totalAmount > 0 && (
        <Flex alignItems="center" my={4} p={5} bgColor={appColorTheme.grey_0}>
          <Text mr={4} fontSize="20px">
            Thành tiền:
          </Text>
          <Text
            ml="auto"
            fontSize="30px"
            color={appColorTheme.brown_2}
            fontWeight="bold"
          >
            {formatPrice(totalAmount)}
          </Text>
        </Flex>
      )}
    </Box>
  );
}
