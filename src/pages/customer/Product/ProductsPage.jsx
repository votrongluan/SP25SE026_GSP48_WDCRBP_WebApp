import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import { FiltersComponent } from "./FiltersComponent";
import { ProductList } from "./ProductList";

export default function ProductsPage() {
  return (
    <Container w="90%" maxW="1400px" pb="50px">
      {/* Tiêu đề */}
      <Box height="70px">
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="26px"
          fontFamily="Montserrat"
        >
          Danh sách sản phẩm
        </Heading>
      </Box>

      {/* Grid chia 2 cột: Bộ lọc (3 phần) - Sản phẩm (7 phần) */}
      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={6}>
        <Box>
          <FiltersComponent />
        </Box>
        <Box>
          <ProductList />
        </Box>
      </Grid>
    </Container>
  );
}
