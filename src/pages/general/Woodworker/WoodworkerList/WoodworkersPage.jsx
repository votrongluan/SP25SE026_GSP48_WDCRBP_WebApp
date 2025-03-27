import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import WoodworkerList from "./WoodworkerList.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";

export default function WoodworkersPage() {
  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          as="h2"
          fontSize="2xl"
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
