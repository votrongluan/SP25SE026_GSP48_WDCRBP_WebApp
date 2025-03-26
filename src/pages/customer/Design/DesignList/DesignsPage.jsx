import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import FiltersComponent from "./FiltersComponent.jsx";
import DesignList from "./DesignList.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";

export default function DesignsPage() {
  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
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
