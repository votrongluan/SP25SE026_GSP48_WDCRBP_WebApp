import { Box, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination";
import { Link } from "react-router-dom";
import { appColorTheme } from "../../../../config/appconfig";
import { formatPrice } from "../../../../utils/utils";

export default function ProductList() {
  const products = [
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1 1322222222222222222222222222222222222222222222",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Sản phẩm 1",
      price: "1000000",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
  ];

  return (
    <Box>
      <Pagination
        itemsPerPage={4}
        dataList={products}
        DisplayComponent={({ data }) => (
          <Grid
            mt={4}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={4}
          >
            {data.map((product) => (
              <Link key={product.id} to="1">
                <Box overflow="hidden" boxShadow="md" bgColor="white">
                  <Image src={product.image} alt={product.name} />
                  <Stack gap={2} p={2}>
                    <Text height="50px" noOfLines={2} fontWeight="bold">
                      {product.name}
                    </Text>

                    <Text fontWeight="bold" color={appColorTheme.brown_2}>
                      {formatPrice(product.price)}
                    </Text>

                    <Text>⭐ {product.rating.toFixed(1)} (10 đánh giá)</Text>
                  </Stack>
                </Box>
              </Link>
            ))}
          </Grid>
        )}
      />
    </Box>
  );
}
