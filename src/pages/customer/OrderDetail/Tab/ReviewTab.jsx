import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { convertTimeStampToDateTimeString } from "../../../../utils/utils.js";

export default function ReviewTab() {
  return (
    <Box p="20px" border="1px solid black" borderRadius="10px">
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
      </Stack>
    </Box>
  );
}
