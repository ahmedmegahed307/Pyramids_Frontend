import { Box, Divider, HStack, VStack } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientNav from "./PortalNav/ClientPortalNav";
import ClientSideBar from "./PortalSideBar/ClientPortalSideBar";

function ClientPortalApp() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (search: string) => {
    setSearchText(search);
  };

  useEffect(() => {
    console.log("Search text:", searchText);
  }, [searchText]);

  return (
    <>
      <HStack align="start" spacing={0}>
        <ClientSideBar />
        <VStack w={"full"}>
          <ClientNav onSearch={handleSearch} />

          <Box w="84vw" overflowX="hidden">
            <Outlet />
          </Box>
        </VStack>
      </HStack>
    </>
  );
}

export default ClientPortalApp;
