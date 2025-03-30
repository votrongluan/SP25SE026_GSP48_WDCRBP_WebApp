import { Box, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import DesignList from "./DesignList.jsx";

export default function WoodworkerDesignsTab() {
  return (
    <>
      <Grid mt={6} templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={5}>
        <Box>
          <FiltersComponent />
        </Box>
        <Box>
          <DesignList />
        </Box>
      </Grid>
    </>
  );
}
