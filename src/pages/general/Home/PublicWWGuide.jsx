import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { FiTool, FiCheck, FiDollarSign, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { appColorTheme } from "../../../config/appconfig";

const WoodworkerGuideStep = ({ icon, title, description, steps }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      mb={3}
    >
      <Flex align="center" mb={3}>
        <Box
          p={2}
          bg={appColorTheme.brown_1 + ".50"}
          color={appColorTheme.brown_2}
          borderRadius="md"
          mr={3}
        >
          <Icon as={icon} boxSize={5} />
        </Box>
        <Heading size="md">{title}</Heading>
      </Flex>
      <Text fontSize="md" mb={3}>
        {description}
      </Text>
      <List spacing={2}>
        {steps.map((step, idx) => (
          <ListItem key={idx} fontSize="md">
            <ListIcon as={FiCheck} color={appColorTheme.brown_2} />
            {step}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default function PublicWWGuide() {
  const navigate = useNavigate();

  return (
    <>
      <Heading color={appColorTheme.brown_2} size="md" mb={4}>
        Công khai xưởng trên nền tảng
      </Heading>

      <Box
        mb={6}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        borderColor={appColorTheme.brown_1}
        bg="white"
      >
        <Heading size="md" mb={4}>
          Hướng dẫn công khai xưởng mộc để cung cấp dịch vụ trên nền tảng
        </Heading>

        <Accordion allowToggle defaultIndex={[0]} mb={4}>
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                _expanded={{
                  bg: appColorTheme.brown_1 + ".50",
                  color: appColorTheme.brown_2,
                }}
                borderRadius="md"
              >
                <Box flex="1" textAlign="left" fontWeight="medium">
                  Các bước để công khai xưởng mộc
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} pt={4}>
              <WoodworkerGuideStep
                icon={FiTool}
                title="1. Kích hoạt gói dịch vụ"
                description="Để công khai xưởng mộc của bạn, trước tiên cần kích hoạt gói dịch vụ phù hợp."
                steps={[
                  "Click vào biểu tượng avatar trên góc phải màn hình",
                  'Chọn "Quản lý thông tin"',
                  'Chọn "Hồ sơ" trên thanh menu bên góc trái màn hình',
                  "Mua gói dịch vụ",
                ]}
              />

              <WoodworkerGuideStep
                icon={FiDollarSign}
                title="2. Đảm bảo số dư trong ví"
                description="Để đảm bảo hoạt động cung cấp dịch vụ, trong ví của bạn cần có đủ số dư."
                steps={[
                  "Trong ví phải có ít nhất 10 triệu đồng",
                  "Click vào biểu tượng avatar trên góc phải màn hình",
                  'Chọn "Quản lý thông tin"',
                  'Chọn "Ví" trên thanh menu bên góc trái màn hình',
                  'Chọn "nạp tiền"',
                ]}
              />

              <WoodworkerGuideStep
                icon={FiShield}
                title="3. Cập nhật chính sách bảo hành"
                description="Thiết lập chính sách bảo hành rõ ràng sẽ giúp tăng độ tin cậy với khách hàng."
                steps={[
                  "Click vào biểu tượng avatar trên góc phải màn hình",
                  'Chọn "Quản lý thông tin"',
                  'Chọn "BH / Sửa chữa" trên thanh menu bên góc trái màn hình',
                  'Chọn "quản lý lỗi bảo hành"',
                ]}
              />

              <Button
                mt={4}
                colorScheme="brown"
                bgColor={appColorTheme.brown_2}
                _hover={{ bgColor: appColorTheme.brown_1 }}
                onClick={() => navigate("/ww/profile")}
                size="sm"
              >
                Đi đến trang hồ sơ
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
}
