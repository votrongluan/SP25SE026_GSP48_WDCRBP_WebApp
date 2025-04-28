import {
  Flex,
  Heading,
  Stack,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { appColorTheme } from "../../../../config/appconfig";

import WoodworkerListPage from "./WoodworkerListPage";

export default function WoodworkerPerformancePage() {
  return (
    <Stack spacing={6}>
      <Heading
        color={appColorTheme.brown_2}
        fontSize="2xl"
        fontFamily="Montserrat"
      >
        Danh sách xưởng mộc
      </Heading>

      <WoodworkerListPage />
    </Stack>
  );
}
