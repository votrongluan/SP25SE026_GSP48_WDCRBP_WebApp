import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent  from "./FiltersComponent.jsx";
import  DesignList  from "./DesignList.jsx";

export default function DesignsPage() {
  return (
    <>
      <Box mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Danh sách thiết kế
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={6}>
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
