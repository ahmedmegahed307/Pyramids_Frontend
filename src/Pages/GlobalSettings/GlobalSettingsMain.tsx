import { Box, Grid, GridItem, HStack, Spinner, VStack } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNav from "../NavBar/TopNav";
import GlobalSettingsSideBar from "./GlobalSettingsSideBar";
import useAuthStore from "../../hooks/Authentication/store";
import { getCurrentUser } from "../../services/UserService/userService";
import Login from "../Authentication/components/Login";

function GlobalSettingsMain() {
  const user = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      handleUserStore();
      setToken(token);
    } else {
      setLoading(false);
    }
  }, []);
  const handleUserStore = () => {
    setLoading(true);

    getCurrentUser().then((res) => {
      user.setUser(res);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="Neutral.300"
          color="Primary.700"
        />
      </Box>
    );
  } else if (token === "") {
    return <Login />;
  } else {
    return (
      <>
        <Grid
          templateColumns={{
            base: "10% 90%",
            md: "20% 80%",
            lg: "15% 85%",
          }}
          gap={5}
        >
          <GridItem>
            <GlobalSettingsSideBar />
          </GridItem>
          <GridItem>
            <VStack w={"full"}>
              <TopNav />

              <Box w={"full"} overflowX="hidden">
                <Outlet />
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </>
    );
  }
}

export default GlobalSettingsMain;
