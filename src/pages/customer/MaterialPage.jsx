import {
  Box,
  Container,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import pla from "/src/assets/images/pla.webp";
import resin from "/src/assets/images/resin.webp";

function MaterialPage() {
  return (
    <>
      <Container w="90%" maxW="1400px" pb="100px">
        <Box height="80px">
          <Heading
            fontWeight="normal"
            as="h2"
            fontSize="26px"
            fontFamily="Montserrat"
          >
            Vật liệu với chất lượng hàng đầu
          </Heading>
          <Text mt="10px" fontSize="18px">
            Nâng cao sản phẩm của bạn bằng những vật liệu tốt nhất
          </Text>
        </Box>

        <SimpleGrid
          bgColor="app_grey.0"
          columns={{
            base: 1,
            xl: 2,
          }}
        >
          <GridItem px="100px" pb="40px">
            <Text
              pl="16px"
              borderBottomLeftRadius="10px"
              borderBottomRightRadius="10px"
              py="12px"
              fontWeight="bold"
              fontSize="18px"
              fontFamily="Montserrat"
              width="250px"
              bgColor="white"
              color="app_white.0"
            >
              Nhựa PLA
            </Text>
            <Image
              mt="40px"
              borderRadius="10px"
              src={pla}
              height="175px"
              objectFit="cover"
              objectPosition="center"
            />
            <Text
              fontSize="18px"
              borderBottom="1px solid"
              borderBottomColor="rgba(255,255,255,0.5)"
              mt="40px"
              pb="10px"
            >
              Thân thiện với môi trường: Nhựa PLA góp phần giảm thiểu khí thải
              nhà kính do được sản xuất từ nguồn thực vật và có khả năng phân
              hủy tự nhiên.
            </Text>
            <Text
              fontSize="18px"
              borderBottom="1px solid"
              borderBottomColor="rgba(255,255,255,0.5)"
              mt="20px"
              pb="10px"
            >
              An toàn cho sức khỏe: Nhựa PLA không chứa BPA (Bisphenol A) hay
              các chất độc hại khác, do đó an toàn cho sức khỏe con người.
            </Text>
            <Text
              fontSize="18px"
              borderBottom="1px solid"
              borderBottomColor="rgba(255,255,255,0.5)"
              mt="20px"
              pb="10px"
            >
              Dễ dàng tái chế: Nhựa PLA có thể tái chế hoặc phân huỷ để sản xuất
              ra các sản phẩm mới hoặc tạo thành phân bón hữu cơ.
            </Text>
            <Text fontSize="18px" mt="20px" pb="10px">
              Khả năng in 3D: Nhựa PLA là một trong những loại nhựa được ưa
              chuộng để sử dụng trong công nghệ in 3D, do độ dẻo và độ bền tương
              đối tốt.
            </Text>
          </GridItem>

          <GridItem
            px="100px"
            pb="40px"
            borderLeft="1px solid"
            borderLeftColor="app_white.0"
          >
            <Text
              pl="16px"
              borderBottomLeftRadius="10px"
              borderBottomRightRadius="10px"
              py="12px"
              fontWeight="bold"
              fontSize="18px"
              fontFamily="Montserrat"
              width="250px"
              bgColor="white"
              color="app_white.0"
            >
              Nhựa Resin
            </Text>
            <Image
              mt="40px"
              borderRadius="10px"
              src={resin}
              height="175px"
              objectFit="cover"
              objectPosition="center"
            />
            <Text
              fontSize="18px"
              borderBottom="1px solid"
              borderBottomColor="rgba(255,255,255,0.5)"
              mt="40px"
              pb="10px"
            >
              Thường được sử dụng để in ấn các sản phẩm đòi hỏi độ chính xác cao
              và đảm bảo các chi tiết sắc nét.
            </Text>
            <Text
              fontSize="18px"
              borderBottom="1px solid"
              borderBottomColor="rgba(255,255,255,0.5)"
              mt="20px"
              pb="10px"
            >
              Thường được sử dụng để in các sản phẩm có yêu cầu về độ bóng.
            </Text>
            <Text fontSize="18px" mt="20px" pb="10px">
              Được dùng để in các sản phẩm đòi hỏi tương đương giống với mẫu
              thật và có độ trong suốt.
            </Text>
          </GridItem>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default MaterialPage;
