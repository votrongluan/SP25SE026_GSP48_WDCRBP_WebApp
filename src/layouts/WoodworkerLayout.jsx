import { useEffect, useState } from "react";
import { Box, Center, Icon, Spinner, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import WoodworkerSideBar from "../components/Sidebar/WoodworkerSideBar.jsx";
import { appColorTheme } from "../config/appconfig.js";
import { FiMenu } from "react-icons/fi";
import Header from "../components/Header/Header.jsx";
import RequireAuth from "../components/Utility/RequireAuth.jsx";
import { useGetWoodworkerByUserIdQuery } from "../services/woodworkerApi.js";
import useAuth from "../hooks/useAuth.js";

export default function WoodworkerLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { auth, setAuth } = useAuth();
  const {
    data: response,
    isLoading,
    error,
  } = useGetWoodworkerByUserIdQuery(auth?.userId);

  const woodworker = response?.data;

  useEffect(() => {
    if (woodworker?.woodworkerId) {
      setAuth((prev) => ({
        ...prev,
        wwId: woodworker.woodworkerId,
        woodworker: woodworker,
      }));
    }
  }, [woodworker, setAuth]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Error: {error.message}</Text>
      </Center>
    );
  }

  return (
    <RequireAuth allowedRoles={["Woodworker"]}>
      <Box fontFamily="Nunito Sans" position="relative" pb="50px">
        <Header />
        <Box>
          <Box
            as="aside"
            position="fixed"
            bg="white"
            color="black"
            minHeight="100vh"
            px={5}
            width={isCollapsed ? "80px" : "300px"}
            transition="width 0.3s"
          >
            <Text
              color={appColorTheme.green_3}
              mt={2}
              mb={2}
              fontWeight="bold"
              textAlign="center"
              borderBottom="2px solid"
              borderColor={appColorTheme.green_2}
            >
              {!isCollapsed ? "Menu xưởng mộc" : <Icon as={FiMenu} />}
            </Text>

            <WoodworkerSideBar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </Box>

          <Box
            as="main"
            bgColor="app_grey.1"
            color="black"
            minH="100svh"
            p={10}
            ml={isCollapsed ? "80px" : "300px"}
            transition="margin-left 0.3s"
          >
            <Outlet />
          </Box>

          {/* Fixed Footer */}
          <Box
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            height="50px"
            bg="white"
            borderTop="1px solid"
            borderColor={appColorTheme.green_1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 -2px 10px rgba(0,0,0,0.05)"
            zIndex={10}
          >
            <Text fontSize="xl" fontWeight="bold" color={appColorTheme.green_3}>
              Xưởng mộc {auth?.woodworker?.brandName || woodworker?.brandName}
            </Text>
          </Box>
        </Box>
      </Box>
    </RequireAuth>
  );
}
