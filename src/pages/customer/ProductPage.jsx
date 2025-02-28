import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Collapse,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import ShareBar from "../../components/ShareBar";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import useCart from "../../hooks/useCart";
import { categoryMap, stlModelLookup } from "../../data/globalData";
import CustomizeHelpGuide from "../../components/CustomizeHelpGuide";

export default function ProductPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded(true);
  const handleMinimize = () => setIsExpanded(false);
  const toast = useToast();
  const { id } = useParams();
  const { products } = useContext(GlobalContext);
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isModelOpen,
    onOpen: onModelOpen,
    onClose: onModelClose,
  } = useDisclosure();
  const product = products.find((item) => item.productId == id);
  const { addCartItem } = useCart();

  if (!product) return <Spinner />;

  return (
    <>
      <Container w="90%" maxW="1400px" pb="100px">
        <Breadcrumb fontSize="16px" separator=">">
          <BreadcrumbItem>
            <RouterLink to="/">
              <BreadcrumbLink>Trang chủ</BreadcrumbLink>
            </RouterLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouterLink to="/products">
              <BreadcrumbLink>Tất cả sản phẩm</BreadcrumbLink>
            </RouterLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <RouterLink to={`/products/${id}`}>
              <BreadcrumbLink>{product.productId}</BreadcrumbLink>
            </RouterLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Grid
          px="10%"
          columnGap="40px"
          rowGap="40px"
          mt="60px"
          templateColumns="repeat(2,1fr)"
        >
          <GridItem
            colSpan={{
              base: 2,
              xl: 1,
            }}
          >
            <Image
              title="Tùy chỉnh sản phẩm"
              border="1.5px solid"
              borderColor="rgba(255,255,255,.7)"
              w="100%"
              objectFit="contain"
              objectPosition="center"
              src={product.img}
              h="500px"
              cursor="zoom-in"
              onClick={() => {
                if (product?.modelUrl) {
                  onModelOpen();
                } else {
                  toast({
                    title: "Mô hình chưa hỗ trợ xem và chỉnh sửa 3D",
                    description: "File in 3D vẫn đang trong quá trình chuẩn bị",
                    status: "info",
                    duration: 1000,
                    isClosable: true,
                  });
                }
              }}
            />
          </GridItem>

          <GridItem
            colSpan={{
              base: 2,
              xl: 1,
            }}
          >
            <Text fontSize="26px">{product.name}</Text>

            <Text fontSize="20px" mt="30px">
              {product.price.toLocaleString()}
            </Text>

            <Text
              textAlign="justify"
              fontSize="16px"
              mt="40px"
              color="app_grey.1"
            >
              Mã sản phẩm: {product.productId}
            </Text>

            <Text
              textAlign="justify"
              fontSize="16px"
              mt="16px"
              color="app_grey.1"
            >
              Loại sản phẩm: {categoryMap[product.category]}
            </Text>

            <Text
              textAlign="justify"
              fontSize="16px"
              mt="16px"
              color="app_grey.1"
            >
              Mô tả: {product.description}
            </Text>

            <Text
              textAlign="justify"
              fontSize="16px"
              mt="16px"
              color="app_grey.1"
            >
              Nhà cung cấp: {product.employee.name}
            </Text>

            {/* <Box mt="20px">
              <Text color="app_black.0" fontSize="14px">
                Số lượng
              </Text>
              <NumberInput
                w="80px"
                bgColor="app_black.0"
                color="app_white.0"
                defaultValue={1}
                min={1}
                max={2}
                mt="5px"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box> */}

            <Button
              _hover={{
                opacity: ".7",
              }}
              w="100%"
              bgColor="app_brown.0"
              color="app_black.0"
              borderRadius="0"
              mt="30px"
              onClick={() => {
                addCartItem(product.employee.employeeId, product);
                toast({
                  title: `${product.name} đã được thêm vào giỏ hàng`,
                  status: "success",
                  duration: 1500,
                  isClosable: true,
                });
              }}
            >
              Thêm vào giỏ hàng
            </Button>

            <ShareBar />
          </GridItem>
        </Grid>

        <Box textAlign="center" mt="100px">
          <Text fontSize="26px" fontFamily="Montserrat">
            Chỉnh sửa mô hình từ sản phẩm
          </Text>
          <Flex justifyContent="center">
            <Text
              w={{
                base: "80%",
                xl: "40%",
              }}
              mt="40px"
              fontSize="16px"
            >
              Dùng file mô hình này của chúng tôi để chỉnh sửa theo ý của bạn và
              đặt in theo yêu cầu. Bạn có thể tìm hiểu cách làm việc với các
              loại file 3D qua đường dẫn sau
              <Text mt="20px" fontSize="18px" color={"app_brown.0"}>
                <RouterLink to="/personalized">
                  Hướng dẫn cá nhân hóa sản phẩm in ấn 3D
                </RouterLink>
              </Text>
            </Text>
          </Flex>
          <Box>
            <Button
              mt="40px"
              onClick={onToggle}
              _hover={{
                opacity: ".7",
              }}
              px="40px"
              py="8px"
              bgColor="app_black.0"
              color="app_white.0"
              borderRadius="20px"
            >
              Nhận file
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <Box
                p="20px"
                mt="20px"
                color="white"
                bg="app_grey.2"
                rounded="md"
                shadow="md"
              >
                File vẫn đang trong quá trình chuẩn bị mong quý khách hàng thông
                cảm
              </Box>
            </Collapse>
          </Box>
        </Box>

        <Modal
          isOpen={isModelOpen}
          onClose={onModelClose}
          size="full"
          isCentered
        >
          <ModalOverlay />
          <ModalContent bg="transparent" boxShadow="none">
            <ModalCloseButton zIndex="1" color="white" />
            <iframe
              style={{
                display: "block",
                position: "relative",
                top: 0,
                left: 0,
                right: 0,
                bottom: "-70px",
              }}
              src={product?.modelUrl}
              frameBorder="0"
              width={window.innerWidth}
              height={window.innerHeight}
            ></iframe>

            {/* Help section */}
            <Box
              position="absolute"
              bottom={0}
              width="100%"
              color={"app_black.0"}
              bg="app_grey.0"
              boxShadow="0 -4px 10px rgba(0, 0, 0, 0.1)"
              height={isExpanded ? "40%" : "70px"}
              transition="height 0.3s ease"
              overflow={isExpanded ? "auto" : "hidden"}
            >
              <Box padding="1rem">
                <CustomizeHelpGuide />
              </Box>

              <Button
                onClick={isExpanded ? handleMinimize : handleExpand}
                position="fixed"
                bottom="1rem"
                left="50%"
                transform="translateX(-50%)"
                color={"app_brown.0"}
              >
                {isExpanded ? "Thu nhỏ" : "Mở rộng"}
              </Button>
            </Box>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}
