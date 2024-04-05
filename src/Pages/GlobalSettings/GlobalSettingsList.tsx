import { useEffect } from "react";
import usePageTitleStore from "../../hooks/NavBar/PageTitleStore";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const GlobalSettingsList = () => {
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Global Settings");
  }, []);

  const globalSettings = [
    {
      text: "JobType",
      url: "/settings/jobtype/list",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Job SubType",
      // url: "/settings/jobSubType/list",
      url: "#",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Checklists",
      //url: "/settings/checkLists",
      url: "#",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Products",
      url: "/settings/products/list",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Product Categories",
      url: "/settings/products/productCategory/list",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Assets",
      url: "/settings/assets/list",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Asset Models",
      url: "/settings/assets/assetModel/list",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Asset Types",
      url: "/settings/assets/assetType/list",
      src: "/src/assets/img/Settings-icon.png",
    },
    {
      text: "Asset Manufacturers",
      url: "/settings/assets/assetManufacturer/list",
      src: "/src/assets/img/Settings-icon.png",
    },
  ];

  return (
    <>
      <Divider />

      <Grid templateColumns="repeat(5, 1fr)" gap={3} mt={5}>
        {globalSettings.map((card, index) => {
          return (
            <>
              <Link to={card.url} key={index}>
                <Box
                  key={index}
                  position="relative"
                  borderRadius={"lg"}
                  borderWidth="1px"
                  p={2}
                  color="white"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  h={"150px"}
                >
                  <Image
                    src={card.src}
                    alt="setting"
                    maxH={"85%"}
                    maxW={"100%"}
                  />
                  <Flex
                    position="absolute"
                    textAlign={"center"}
                    bottom="5px"
                    color={"Primary.700"}
                  >
                    <Text fontWeight="bold" textAlign="center">
                      {card?.text}
                    </Text>
                  </Flex>
                </Box>
              </Link>
            </>
          );
        })}
      </Grid>
    </>
  );
};
export default GlobalSettingsList;
