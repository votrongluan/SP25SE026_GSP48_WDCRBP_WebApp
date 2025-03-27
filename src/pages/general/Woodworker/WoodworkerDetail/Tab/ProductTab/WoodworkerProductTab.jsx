import { Box, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import ProductList from "./ProductList.jsx";

export default function WoodworkerProductTab() {
  return (
    <>
      <Grid mt={6} templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={6}>
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
