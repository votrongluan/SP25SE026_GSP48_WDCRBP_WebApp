import {
  Box,
  Container,
  Flex,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import pla from "/src/assets/images/pla.webp";
import { Link as RouterLink } from "react-router-dom";
import Post from "../../components/Post";
import ShareBar from "../../components/ShareBar";

export default function PostPage() {
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
            Diễn đàn
          </Heading>
        </Box>

        <Box py="100px" bgColor="app_grey.1">
          <Box px="20%">
            <Text fontSize="12px">12 tháng 7</Text>

            <Text
              fontSize="40px"
              fontWeight="semi-bold"
              fontFamily="Montserrat"
              mt="40px"
            >
              Thông báo thêm sản phẩm vào trang chủ của chúng tôi
            </Text>

            <Image mt="80px" src={pla} w="100%" />

            <Text fontSize="18px" mt="40px" textAlign="justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              vitae officiis odio, harum voluptate iure, esse expedita aliquam
              quia veritatis eveniet ea voluptates facilis id natus. Nulla sit
              deserunt ut? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Voluptatem repellendus dolor possimus, illum accusantium
              quis? Quia, in quod delectus aliquam debitis a nulla magni minima
              vitae voluptatem necessitatibus, sit neque. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Voluptate hic veritatis fugiat
              alias quasi magnam incidunt sed sapiente at, maxime animi soluta?
              Atque, libero. Provident eius reprehenderit nam libero facere.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus et
              dolor voluptatum expedita omnis. Officiis sunt repellat at
              laboriosam alias ad debitis nostrum culpa deleniti? Corrupti nemo
              consectetur incidunt quo. Quisquam cupiditate ab reiciendis dicta
              nihil error expedita asperiores ex ea doloribus consequatur,
              maxime dolorum voluptate earum, ullam veniam? Quis sapiente
              voluptates dolorum magni vel illo aut deleniti, sit nihil?
              Mollitia fugiat numquam tempore, nostrum recusandae tenetur.
              Aliquid nam officiis ex sint corporis autem in deserunt animi id
              reiciendis, exercitationem eum magni rem nihil blanditiis maxime
              ipsa laudantium culpa? Quis. Amet tempore totam id dicta corporis
              esse laborum consequatur illum itaque voluptatem dolores quis,
              adipisci vero, a, accusantium temporibus et in ut autem similique
              quasi aliquam quos repellat excepturi? Laudantium.
            </Text>

            <ShareBar />
          </Box>

          <Box px="15%" mt="80px">
            <Flex justifyContent="space-between">
              <Text fontSize="18px">Bài đăng gần đây</Text>
              <RouterLink to="/forum">
                <Text
                  transition="opacity 0.3s ease"
                  fontSize="14px"
                  _hover={{
                    opacity: ".5",
                  }}
                >
                  Xem tất cả
                </Text>
              </RouterLink>
            </Flex>

            <SimpleGrid
              mt="40px"
              spacing={5}
              columns={{
                base: 1,
                xl: 3,
              }}
            >
              <GridItem>
                <Post />
              </GridItem>
              <GridItem>
                <Post />
              </GridItem>
              <GridItem>
                <Post />
              </GridItem>
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
