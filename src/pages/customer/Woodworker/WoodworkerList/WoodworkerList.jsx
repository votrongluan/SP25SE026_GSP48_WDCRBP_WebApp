import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination.jsx";
export function WoodworkerList() {
  const products = [
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1.000.000 VND",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
  ];

  return (
    <Box>
      <Text>Tìm thấy 4 sản phẩm</Text>
      <Pagination
        itemsPerPage={100}
        totalPages={100}
        currentPage={1}
        data={products}
        DisplayData={({ data }) => (
          <Grid
            mt={4}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={4}
          >
            {data.map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={5}
                bgColor="white"
              >
                <Image src={product.image} alt={product.name} mb={4} />
                <Text height="50px" noOfLines={2} fontWeight="bold" mb={2}>
                  {product.name}
                </Text>

                <Flex justifyContent="space-between">
                  <Text color="gray.500">{product.price}</Text>
                  <Text>⭐ {product.rating}</Text>
                </Flex>
              </Box>
            ))}
          </Grid>
        )}
      />
    </Box>
  );
}
