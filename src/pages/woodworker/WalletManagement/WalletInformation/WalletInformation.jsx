import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig";
import DepositModal from "../ActionModal/DepositModal";
import WithdrawModal from "../ActionModal/WithdrawModal";
import { useGetUserWalletQuery } from "../../../../services/walletApi";
import useAuth from "../../../../hooks/useAuth";
import { formatPrice } from "../../../../utils/utils";

export default function WalletInformation() {
  const { auth } = useAuth();
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetUserWalletQuery(auth?.userId);

  const wallet = response?.data;

  const {
    isOpen: isDepositOpen,
    onOpen: onDepositOpen,
    onClose: onDepositClose,
  } = useDisclosure();

  const {
    isOpen: isWithdrawOpen,
    onOpen: onWithdrawOpen,
    onClose: onWithdrawClose,
  } = useDisclosure();

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="200px">
        <Text>Đã có lỗi xảy ra khi tải thông tin ví</Text>
      </Center>
    );
  }

  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
      <Stack spacing={6}>
        {/* Account Balance */}
        <Box>
          <Heading size="md" mb={4}>
            Số dư ví
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color={appColorTheme.brown_2}>
            {formatPrice(wallet?.balance || 0)}
          </Text>
        </Box>

        {/* Bank Information */}
        <Box>
          <Heading size="md" mb={4}>
            Thông tin ngân hàng
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <Box>
              <Text fontWeight="bold">Ngân hàng:</Text>
              <Text>Vietcombank</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Số tài khoản:</Text>
              <Text>123456789</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Chủ tài khoản:</Text>
              <Text>NGUYEN VAN A</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Chi nhánh:</Text>
              <Text>Ho Chi Minh City</Text>
            </Box>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <HStack spacing={4}>
          <Button
            colorScheme="green"
            onClick={onDepositOpen}
            leftIcon={<Text>+</Text>}
          >
            Nạp tiền
          </Button>
          <Button
            colorScheme="purple"
            onClick={onWithdrawOpen}
            leftIcon={<Text>-</Text>}
          >
            Rút tiền
          </Button>
        </HStack>
      </Stack>

      {/* Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={onDepositClose}
        wallet={wallet}
        onSuccess={() => {
          refetch();
          onDepositClose();
        }}
      />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={onWithdrawClose}
        balance={wallet?.balance || 0}
        onSuccess={() => {
          refetch();
          onWithdrawClose();
        }}
      />
    </Box>
  );
}
