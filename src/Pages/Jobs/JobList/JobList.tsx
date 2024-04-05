import {
  Tabs,
  TabPanels,
  TabPanel,
  Flex,
  HStack,
  Box,
  TableContainer,
  Button,
  Spinner,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Checkbox,
  Heading,
  Card,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { IconColumn } from "../../../assets/icons/IconColumn";
import { IconFilter } from "../../../assets/icons/IconFilter";
import AllJobsTable from "./AllJobsTable";
import ExportToExcel, { ExportToExcelProps } from "../../Excel/ExportToExcel";
import usePageTitleStore from "../../../hooks/NavBar/PageTitleStore";
import { FilterOption, filterOptions } from "../../../StaticData/StaticData";
import useAdminJobs from "../../../hooks/Jobs/useAdminJobs";
import moment from "moment";
import { Job } from "../../../models/Job";

const JobList = () => {
  //get jobs list
  const { data, isLoading, isError } = useAdminJobs(true);

  console.log("jobs:::", data);
  //zustand to show page title
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Jobs");
  }, []);

  //filteration
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([
    { label: "All jobs", value: "All jobs" },
  ]);

  const toggleFilter = (filter: FilterOption) => {
    if (filter.value === "All jobs") {
      // Selecting "All jobs" should unselect all other filters
      setSelectedFilters([filter]);
    } else {
      // Selecting any other filter should unselect "All jobs"
      setSelectedFilters((prevFilters) => {
        if (prevFilters.some((f) => f.value === "All jobs")) {
          return [filter];
        } else {
          const filterIndex = prevFilters.findIndex(
            (f) => f.value === filter.value
          );
          if (filterIndex !== -1) {
            // Filter is already in filters, so remove it
            return prevFilters.filter((f) => f.value !== filter.value);
          } else {
            // Filter is not in filters, so add it
            return [...prevFilters, filter];
          }
        }
      });
    }
  };

  const isAllJobsSelected = selectedFilters?.some(
    (filter) => filter.value === "All jobs"
  );

  const filterJobs = () => {
    if (isAllJobsSelected) {
      return data;
    } else {
      return data?.filter((job: Job) =>
        selectedFilters?.some(
          (filter) => filter.value === job?.jobStatus?.status
        )
      );
    }
  };

  //export to excel
  const [exportedData, setExportedData] = useState<ExportToExcelProps>(
    {} as ExportToExcelProps
  );
  const handleExport = (exportedData: ExportToExcelProps) => {
    setExportedData(exportedData);
  };
  if (!data)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
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

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
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
  }

  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <Heading ml={5} size={"md"}>
        Jobs
      </Heading>
      <Box h={"full"} w={"full"} borderColor="gray.200">
        <Flex direction={"column"} h={"full"} maxW="10xl" mx="auto" ml={5}>
          <HStack justify={"space-between"}>
            <HStack spacing={4}>
              <Menu>
                <MenuButton
                  fontSize={"sm"}
                  as={Button}
                  variant={"link"}
                  fontWeight={"bold"}
                  color={"Primary.700"}
                  // borderRight={"0.75px solid "}
                  borderColor={"Neutral.300"}
                  borderRadius={0}
                  rightIcon={<ChevronDownIcon />}
                >
                  {isAllJobsSelected
                    ? "All jobs"
                    : selectedFilters?.map((filter) => filter.label).join(", ")}
                </MenuButton>
                <MenuList>
                  {filterOptions.map((option) => (
                    <MenuItem key={option.value}>
                      <Checkbox
                        isChecked={selectedFilters.some(
                          (filter) => filter.value === option.value
                        )}
                        onChange={() => toggleFilter(option)}
                        colorScheme={
                          selectedFilters.some(
                            (filter) => filter.value === option.value
                          )
                            ? "Primary"
                            : "gray"
                        }
                        variant="outline"
                      >
                        {option.label}
                      </Checkbox>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              {/* <Button
                fontSize={"sm"}
                variant={"link"}
                fontWeight={"bold"}
                color={"black"}
                borderRight={"0.75px solid "}
                borderColor={"Neutral.300"}
                borderRadius={0}
                pr={4}
                leftIcon={<IconFilter />}
              >
                Hide Filter
              </Button>
              <Button
                fontSize={"sm"}
                variant={"link"}
                fontWeight={"bold"}
                color={"black"}
                leftIcon={<IconColumn />}
              >
                Columns
              </Button> */}
            </HStack>

            <HStack spacing={4} pr={8}>
              <ExportToExcel
                data={exportedData.data || []}
                headers={exportedData.headers || []}
                keys={exportedData.keys || []}
                sheetName={"Jobs_List"}
              />
              <Button
                borderRadius={10}
                as={NavLink}
                to="/jobs/addJob"
                variant={"outline"}
                onClick={() => {}}
                leftIcon={<AddIcon fontSize={"8"} />}
              >
                Log job
              </Button>
            </HStack>
          </HStack>

          <Tabs h={"full"} w={"full"} ml={-4}>
            <TabPanels height={"full"}>
              <TabPanel height={"full"}>
                <TableContainer height={"full"}>
                  {!isLoading && data && (
                    <AllJobsTable
                      data={
                        filterJobs()?.sort((a, b) => moment(b.id).diff(a.id)) ??
                        []
                      }
                      exportToExcel={handleExport}
                    />
                  )}
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Card>
  );
};

export default JobList;
