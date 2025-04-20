import {
  Box,
  Button,
  Heading,
  Alert,
  AlertIcon,
  Skeleton,
  Stack,
  Text,
  RadioGroup,
  Radio,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";

export default function AddressSelection({
  addresses = [],
  isLoading = false,
  error = null,
  selectedAddress,
  setSelectedAddress,
  auth,
}) {
  // Set default address when addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      // Find default address or use the first one
      const defaultAddress =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddress.userAddressId.toString());
    }
  }, [addresses, selectedAddress, setSelectedAddress]);

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Không thể tải địa chỉ. Vui lòng thử lại sau.
      </Alert>
    );
  }

  if (addresses.length === 0) {
    return (
      <Box textAlign="center" py={3}>
        <Text mb={3}>Bạn chưa có địa chỉ giao hàng</Text>
        <Button
          leftIcon={<FiPlusCircle />}
          as={Link}
          to="/cus/profile"
          size="sm"
          colorScheme="green"
        >
          Thêm địa chỉ mới
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="sm" mb={3}>
        Địa chỉ giao hàng
      </Heading>

      <RadioGroup onChange={setSelectedAddress} value={selectedAddress}>
        <Stack>
          {addresses.map((address) => (
            <Box
              key={address.userAddressId}
              borderWidth="1px"
              borderRadius="md"
              p={3}
              borderColor={
                selectedAddress === address.userAddressId.toString()
                  ? "green.500"
                  : "gray.200"
              }
              bg={
                selectedAddress === address.userAddressId.toString()
                  ? "green.50"
                  : "white"
              }
            >
              <Radio value={address.userAddressId.toString()} mb={2}>
                <Flex alignItems="center">
                  <Text fontWeight="medium">{address.address}</Text>
                </Flex>
              </Radio>
            </Box>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
}
