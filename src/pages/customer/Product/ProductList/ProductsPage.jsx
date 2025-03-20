import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import ProductList from "./ProductList.jsx";

export default function ProductsPage() {
  return (
    <>
      <Box mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Danh sách sản phẩm
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={6}>
        <Box>
          <FiltersComponent />
        </Box>
        <Box>
          <ProductList />
        </Box>
      </Grid>
    </>
  );
}
