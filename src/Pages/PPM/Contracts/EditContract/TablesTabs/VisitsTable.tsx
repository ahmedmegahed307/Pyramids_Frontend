import {
  Card,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spacer,
  Box,
  Button,
  useDisclosure,
  Checkbox,
  Tooltip,
  Text,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import moment from "moment";

import { Link } from "react-router-dom";
import { IVisit } from "../../../../../models/Interfaces/IVisit";
import { IconSortArrow } from "../../../../../assets/icons/IconSortArrow";
import PaginationTable from "../../../../Settings/components/PaginationTable/PaginationTable";
import Swal from "sweetalert2";
import { RepeatClockIcon } from "@chakra-ui/icons";
import useGenerateVisit from "../../../../../hooks/PPM/useGenerateVisit";
import { tr } from "date-fns/locale";

const columnHelper = createColumnHelper<IVisit>();

const columns = [
  columnHelper.accessor("contractRef", {
    header: "Contract Reference",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jobId", {
    header: "Job ID",
    cell: (info) =>
      (
        <Link to={`/jobs/${info.getValue()}`} target="_blank">
          {info.getValue()}
        </Link>
      ) ?? "-",
  }),

  columnHelper.accessor("jobStatus", {
    header: () => "Job Status",
    cell: (info) => <>{info?.getValue() ?? "-"}</>,
  }),

  columnHelper.accessor("visitDate", {
    header: "Visit Date",
    cell: (info) => moment(info.getValue()).format("DD/MM/YYYY"),
  }),

  columnHelper.accessor((value) => value.engineerName, {
    header: "Assignee",
    cell: (info) => {
      return (
        <Text>
          <>
            <HStack spacing={1}>
              {info.getValue() != null ? (
                <Avatar size={"sm"} bg="teal.500" />
              ) : (
                ""
              )}
              <Text>{info?.getValue() ?? "-"} </Text>
            </HStack>
          </>
        </Text>
      );
    },
  }),

  columnHelper.accessor((value) => value.description ?? "-", {
    header: "Description",
    cell: (info) => {
      const description = info.getValue() ?? "-";
      const truncatedDescription = description.substring(0, 50);
      return (
        <Tooltip label={description} background={"gray.50"} color={"teal"}>
          <Text>
            {truncatedDescription} {description.length > 50 && "..."}
          </Text>
        </Tooltip>
      );
    },
  }),
];
interface props {
  visits: IVisit[];
  selectedJobsID?: (selectedJobsID: string[]) => void;
}

const VisitsTable = ({ visits, selectedJobsID }: props) => {
  const [selectedVisitIds, setSelectedVisitIds] = useState<number[]>([]);
  console.log("selectedVisitIds::", selectedVisitIds);
  const [isSelectedUpdated, setIsSelectedUpdated] = useState(false);

  const handleCheckboxChange = (VisitId: number) => {
    if (selectedVisitIds.includes(VisitId)) {
      setSelectedVisitIds(selectedVisitIds.filter((id) => id !== VisitId));
    } else {
      setSelectedVisitIds([...selectedVisitIds, VisitId]);
    }
    setIsSelectedUpdated(true);
  };

  const generateVisitQuery = useGenerateVisit();
  const handleGenerateVisitClick = () => {
    if (isSelectedUpdated) {
      generateVisitQuery.mutateAsync(selectedVisitIds);
      setIsSelectedUpdated(false);
      setSelectedVisitIds([]);
    }
  };
  const [sorting, setSorting] = useState<SortingState>([]);

  const [filtering, setFiltering] = useState<string>("");

  const table = useReactTable({
    data: visits || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), //3
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering, // *3

    debugTable: true,
  });
  const createModal = useDisclosure();

  return (
    <>
      <Flex w={"full"} direction={"row"} my={2}>
        <Spacer />

        <Button
          onClick={handleGenerateVisitClick}
          variant="outline"
          size="md"
          leftIcon={<RepeatClockIcon />}
        >
          Generate Visit
        </Button>
      </Flex>
      <Table
        size={{
          base: "sm",
          md: "sm",
          lg: "md",
        }}
        rounded={"xl"}
        borderRadius={"xl"}
      >
        <Thead
          p={0}
          m={0}
          borderRadius={"xl"}
          bg={"#F7F7FB"}
          shadow={"none"}
          w={"full"}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  border="none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <Flex
                    color={"Neutral.500"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                    alignItems="center"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <Box color={"Primary.500"} fontSize={"md"} ml={1}>
                      <IconSortArrow />
                    </Box>
                  </Flex>
                </Th>
              ))}
              <Th
                color={"Neutral.500"}
                fontSize={"sm"}
                fontWeight={"medium"}
                alignItems="center"
              >
                Actions
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, index) => (
            <Tr key={row.id} bg={index % 2 != 0 ? "Neutral.100" : "white"}>
              {row.getVisibleCells().map((cell) => (
                <>
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                </>
              ))}

              {!row.original.jobId ? (
                <Td key={row.id}>
                  <Checkbox
                    colorScheme="Primary"
                    ml={8}
                    mt={5}
                    isChecked={selectedVisitIds.includes(
                      parseInt(row.original.id)
                    )}
                    onChange={() =>
                      handleCheckboxChange(parseInt(row.original.id))
                    }
                  ></Checkbox>
                </Td>
              ) : (
                <Td></Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Spacer></Spacer>
      <PaginationTable data={visits} table={table} />
    </>
  );
};

export default VisitsTable;
