import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import WoodworkerList from "./WoodworkerList.jsx";

export default function WoodworkersPage() {
  return (
    <>
      <Box mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Danh sách xưởng mộc
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "2fr 8fr" }} gap={6}>
        <Box>
          <FiltersComponent />
        </Box>
        <Box>
          <WoodworkerList />
        </Box>
      </Grid>
    </>
  );
}
