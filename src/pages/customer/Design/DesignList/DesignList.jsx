import { Box, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Pagination from "../../../../components/Utility/Pagination.jsx";
import { Link } from "react-router-dom";
export default function DesignList() {
  const products = [
    {
      id: 1,
      name: "Giường 2 tầng",
      design_code: "# AB8s4",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Giường 2 tầng",
      design_code: "#AB8s4",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Giường 2 tầng",
      design_code: "#AB8s4",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Giường 2 tầng",
      design_code: "#AB8s4",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Giường 2 tầng",
      design_code: "#AB8s4",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Giường 2 tầng",
      design_code: "#AB8s4",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Giường 2 tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng tầng",
      design_code: "#AB8s4",
      rating: 4,
      image:
        "https://product.hstatic.net/200000821277/product/1__2__ddeb0088f796420abf7ff54b29e64ac7_master.jpg",
    },
    {
      id: 1,
      name: "Giường 2 tầng",
      design_code: "#AB8s4",
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
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={5}
          >
            {data.map((product) => (
              <Link key={product.id} to="1">
                <Box boxShadow="md" overflow="hidden" bgColor="white">
                  <Image src={product.image} alt={product.name} />

                  <Stack gap={2} p={2}>
                    <Text height="50px" noOfLines={2} fontWeight="bold">
                      {product.name}
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
