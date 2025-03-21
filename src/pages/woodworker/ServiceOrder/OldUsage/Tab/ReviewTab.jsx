import { Box, Heading, Stack, HStack, Text, Image } from "@chakra-ui/react";
import { convertTimeStampToDateTimeString } from "../../../../../utils/utils.js";

export default function ReviewTab() {
  return (
    <>
      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Heading fontWeight="bold" fontSize="20px" mb={5}>
          Đánh giá đơn hàng
        </Heading>
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="bold">Số sao:</Text>
            <Text>5</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Bình luận:</Text>
            <Text>Sản phẩm cũng ok</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Ngày đăng:</Text>
            <Text>{convertTimeStampToDateTimeString(new Date())}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Trạng thái:</Text>
            <Text>Đã phê duyệt</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Ảnh đính kèm:</Text>
            <Image
              src="https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp"
              alt="Ảnh đánh giá"
              maxW="200px"
              borderRadius="md"
            />
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
