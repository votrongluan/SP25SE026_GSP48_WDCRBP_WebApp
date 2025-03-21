import { Grid, Box, Heading } from "@chakra-ui/react";
import ProcessTab from "./ProcessTab.jsx";
import LogTab from "./LogTab.jsx";

export default function ProcessLogTab() {
  return (
    <>
      <Heading fontWeight="bold" fontSize="20px" mb={5} textAlign="center">
        Quá trình thực hiện và nhật ký
      </Heading>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={4}>
        <Box>
          <ProcessTab />
        </Box>
        <Box>
          <LogTab />
        </Box>
      </Grid>
    </>
  );
}
