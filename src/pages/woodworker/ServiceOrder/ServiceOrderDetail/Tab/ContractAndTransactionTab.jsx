import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  SimpleGrid,
  Badge,
  Link as ChakraLink,
  Spacer,
  Image,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";
import { useGetContractByServiceOrderIdQuery } from "../../../../../services/contractApi.js";
import { useGetAllOrderDepositByOrderIdQuery } from "../../../../../services/orderDepositApi.js";
import {
  formatPrice,
  formatDateTimeString,
} from "../../../../../utils/utils.js";
import useAuth from "../../../../../hooks/useAuth.js";

export default function ContractAndTransactionTab({
  activeTabIndex,
  isActive,
}) {
  const { id } = useParams();
  const { auth } = useAuth();

  // Fetch contract data
  const {
    data: contractResponse,
    isLoading: isContractLoading,
    error: contractError,
    refetch: refetchContract,
  } = useGetContractByServiceOrderIdQuery(id);

  // Fetch deposit data
  const {
    data: depositsResponse,
    isLoading: isDepositsLoading,
    error: depositsError,
    refetch: refetchDeposits,
  } = useGetAllOrderDepositByOrderIdQuery(id);

  // Refetch data when tab becomes active
  useEffect(() => {
    if (isActive) {
      refetchContract();
      refetchDeposits();
    }
  }, [isActive, refetchContract, refetchDeposits]);

  const contract = contractResponse?.data;
  const deposits = depositsResponse?.data || [];

  // Loading state
  if (isContractLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Error state
  if (contractError) {
    return (
      <Center h="200px">
        <Text>Đã có lỗi xảy ra khi tải thông tin hợp đồng</Text>
      </Center>
    );
  }

  // No contract case
  if (!contract) {
    return (
      <Center h="200px" bg="white" borderRadius="10px" p={5} boxShadow="md">
        <Text fontSize="lg" color="gray.500">
          Chưa có thông tin hợp đồng
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        {/* Contract Information */}
        <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
          <Heading fontWeight="bold" as="h3" fontSize="20px" mb={6}>
            Thông tin hợp đồng
          </Heading>

          <Stack spacing={4}>
            <HStack>
              <Text fontWeight="bold">Họ tên thợ mộc:</Text>
              <Text>{contract?.woodworker?.username || "Chưa cập nhật"}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">SĐT thợ mộc:</Text>
              <Text>{contract?.woodworker?.phone || "Chưa cập nhật"}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Email thợ mộc:</Text>
              <Text>{contract?.woodworker?.email || "Chưa cập nhật"}</Text>
            </HStack>

            <Box height="10px" />

            <HStack>
              <Text fontWeight="bold">Họ tên khách hàng:</Text>
              <Text>{contract?.customer?.username || "Chưa cập nhật"}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">SĐT khách hàng:</Text>
              <Text>{contract?.customer?.phone || "Chưa cập nhật"}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Email khách hàng:</Text>
              <Text>{contract?.customer?.email || "Chưa cập nhật"}</Text>
            </HStack>

            <Box height="10px" />

            <HStack>
              <Text fontWeight="bold">Mã hợp đồng:</Text>
              <Text>{contract.contractId || "Chưa cập nhật"}</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Ngày ký:</Text>
              <Text>
                {contract.signDate
                  ? formatDateTimeString(new Date(contract.signDate))
                  : "Chưa cập nhật"}
              </Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Ngày cam kết giao sản phẩm:</Text>
              <Text>
                {contract.completeDate
                  ? formatDateTimeString(new Date(contract.completeDate))
                  : "Chưa cập nhật"}
              </Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Giá trị hợp đồng:</Text>
              <Text>
                {contract.contractTotalAmount
                  ? formatPrice(contract.contractTotalAmount)
                  : "Chưa cập nhật"}
              </Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Thời hạn bảo hành:</Text>
              <Text>
                {contract.warrantyPeriod
                  ? formatDateTimeString(new Date(contract.warrantyPeriod))
                  : "Chưa cập nhật"}
              </Text>
            </HStack>

            <Box>
              <Text fontWeight="bold">Chính sách bảo hành:</Text>
              <Text whiteSpace={"pre-wrap"}>
                {contract.warrantyPolicy || "Chưa cập nhật"}
              </Text>
            </Box>

            <HStack>
              <Box>
                <Text fontWeight="bold">Chữ ký thợ mộc</Text>
                {contract.woodworkerSignature ? (
                  <Image
                    mt={4}
                    height="100px"
                    src={contract.woodworkerSignature}
                    fallbackSrc="https://via.placeholder.com/200x100?text=Chữ+ký+thợ+mộc"
                  />
                ) : (
                  <Box
                    mt={4}
                    height="100px"
                    width="200px"
                    bg="gray.100"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color="gray.500">Chưa có chữ ký</Text>
                  </Box>
                )}
              </Box>
              <Spacer />

              <Box>
                <Text fontWeight="bold">Chữ ký khách hàng</Text>
                {contract.customerSignature ? (
                  <Image
                    mt={4}
                    height="100px"
                    src={contract.customerSignature}
                    fallbackSrc="https://via.placeholder.com/200x100?text=Chữ+ký+khách+hàng"
                  />
                ) : (
                  <Box
                    mt={4}
                    height="100px"
                    width="200px"
                    bg="gray.100"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color="gray.500">Chưa có chữ ký</Text>
                  </Box>
                )}
              </Box>
            </HStack>

            <HStack>
              <Spacer />

              <ChakraLink
                target="_blank"
                textDecoration="underline"
                color={appColorTheme.brown_2}
                href={`/contract/${contract.contractId}`}
              >
                Xem chi tiết
              </ChakraLink>
            </HStack>
          </Stack>
        </Box>

        {/* Deposit/Transaction Information */}
        <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
          <Heading fontWeight="bold" as="h3" fontSize="20px" mb={6}>
            Thông tin giao dịch
          </Heading>

          {isDepositsLoading ? (
            <Center py={8}>
              <Spinner size="md" color={appColorTheme.brown_2} />
            </Center>
          ) : depositsError ? (
            <Center py={8}>
              <Text color="red.500">
                Đã có lỗi xảy ra khi tải thông tin thanh toán
              </Text>
            </Center>
          ) : deposits.length === 0 ? (
            <Center py={8}>
              <Text color="gray.500">Chưa có thông tin thanh toán</Text>
            </Center>
          ) : (
            <Stack spacing={4}>
              <Stack spacing={4}>
                <HStack>
                  <Text fontWeight="bold">Chi tiết giao dịch của đơn hàng</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Thành tiền:</Text>
                  <Text>
                    {contract.contractTotalAmount
                      ? formatPrice(contract.contractTotalAmount)
                      : "Chưa cập nhật"}
                  </Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Số tiền đã thanh toán:</Text>
                  <Text>
                    {formatPrice(
                      deposits.reduce(
                        (sum, deposit) =>
                          deposit.status ? sum + (deposit.amount || 0) : sum,
                        0
                      )
                    )}
                  </Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Số tiền còn lại:</Text>
                  <Text>
                    {formatPrice(
                      contract.contractTotalAmount -
                        deposits.reduce(
                          (sum, deposit) =>
                            deposit.status ? sum + (deposit.amount || 0) : sum,
                          0
                        )
                    )}
                  </Text>
                </HStack>
              </Stack>

              <Spacer height="20px" />

              {deposits.map((deposit) => (
                <Stack
                  key={deposit.serviceDepositId}
                  spacing={4}
                  p={3}
                  bg={deposit.status ? "green.50" : "gray.50"}
                  borderRadius="md"
                >
                  <HStack>
                    <Text fontWeight="bold">
                      Đặt cọc lần {deposit.depositNumber}
                    </Text>
                    <Badge colorScheme={deposit.status ? "green" : "gray"}>
                      {deposit.status ? "Đã thanh toán" : "Chưa thanh toán"}
                    </Badge>
                  </HStack>

                  <HStack>
                    <Text fontWeight="bold">Ngày thanh toán:</Text>
                    <Text>
                      {deposit.createdAt
                        ? formatDateTimeString(new Date(deposit.createdAt))
                        : "Chưa cập nhật"}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="bold">Số tiền thanh toán:</Text>
                    <Text>
                      {deposit.amount
                        ? formatPrice(deposit.amount)
                        : "Chưa cập nhật"}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="bold">Phần trăm cọc:</Text>
                    <Text>
                      {deposit.percent
                        ? `${deposit.percent}%`
                        : "Chưa cập nhật"}
                    </Text>
                  </HStack>

                  {deposit.description && (
                    <HStack>
                      <Text fontWeight="bold">Ghi chú:</Text>
                      <Text>{deposit.description}</Text>
                    </HStack>
                  )}
                </Stack>
              ))}
            </Stack>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
}
