import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import ProductList from "./ProductList.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";

export default function ProductsPage() {
  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Danh sách sản phẩm
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={5}>
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
