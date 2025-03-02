import {
  Box,
  Heading,
  Text,
  Link,
  UnorderedList,
  ListItem,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";
import { appURL } from "../api/axios";

export default function CustomizeHelpGuide() {
  return (
    <>
      <Flex columnGap="100px" px={5} pb={5} color="black">
        <Box flex="2">
          <Heading
            fontSize="24px"
            fontFamily="Montserrat"
            as="h2"
            mb={4}
            fontWeight={"normal"}
          >
            Trợ giúp khách hàng tùy chỉnh và đặt in theo yêu cầu
          </Heading>

          <Text mb={4}>
            Khách hàng ấn vào nút REMIX để bắt đầu chỉnh sửa dựa trên mô hình
            được cung cấp từ hệ thống. Video hướng dẫn chi tiết cách thực hiện
            và chỉnh màu theo 2 kiểu khác nhau và đặt in theo yêu cầu{" "}
          </Text>

          <AspectRatio maxW="350px" ratio={16 / 9} mb={4}>
            <iframe
              src="https://www.youtube.com/embed/9X2Ulsp3o48?si=rKsvLqkDT3SXfzHW"
              title="Hướng dẫn đặt in và tùy chỉnh"
              allowFullScreen
            />
          </AspectRatio>
        </Box>

        <Box flex="1">
          <Heading
            fontSize="24px"
            fontFamily="Montserrat"
            as="h2"
            mb={4}
            fontWeight={"normal"}
          >
            Liên kết nhanh
          </Heading>

          <Text mb={4}>
            <Text mb={4}>
              <Link
                p={5}
                href={"https://drive.google.com/"}
                isExternal
                color="teal.300"
              >
                Chuyển đến trang Google Drive
              </Link>
            </Text>

            <Text mb={4}>
              <Link p={5} href={appURL + "/print"} isExternal color="teal.300">
                Chuyển đến trang đặt in theo yêu cầu
              </Link>
            </Text>

            <Text mb={4}>
              <Link
                p={5}
                href={
                  "https://www.youtube.com/playlist?list=PLwgd2h1X_NbsbKfS0t23VHWhhbPZrJlD_"
                }
                isExternal
                color="teal.300"
              >
                Chuyển đến trang video hướng dẫn của Spline
              </Link>
            </Text>

            <Text mb={4}>
              <Link
                p={5}
                href={appURL + "/personalized"}
                isExternal
                color="teal.300"
              >
                Chuyển đến trang hướng dẫn chỉnh sửa bằng phần mềm khác
              </Link>
            </Text>

            <Text mb={4}>
              Việc chỉnh sửa các mô hình 3D đòi hỏi trình độ kỹ thuật cao. Nếu
              quý khách gặp phải bất kỳ khó khăn nào, xin vui lòng liên hệ{" "}
              <Link
                href="https://www.facebook.com/profile.php?id=61566307373631"
                isExternal
                color="teal.300"
              >
                Fanpage
              </Link>{" "}
              của chúng tôi để được hỗ trợ
            </Text>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
