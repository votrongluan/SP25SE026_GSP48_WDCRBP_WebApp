import { Box, Heading, Stack, HStack, Text, Image } from "@chakra-ui/react";
import { convertTimeStampToDateTimeString } from "../../../../../utils/utils.js";

export default function ReviewTab() {
  return (
    <>
      <Heading fontWeight={500} fontSize="20px" mb={5} textAlign="center">
        Đánh giá đơn hàng
      </Heading>
      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="500">Số sao:</Text>
            <Text>5</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Bình luận:</Text>
            <Text>Sản phẩm cũng ok</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Ngày đăng:</Text>
            <Text>{convertTimeStampToDateTimeString(new Date())}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Trạng thái:</Text>
            <Text>Đã phê duyệt</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Ảnh đính kèm:</Text>
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
