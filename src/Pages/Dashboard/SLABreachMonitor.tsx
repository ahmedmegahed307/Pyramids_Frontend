import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
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
import { SLABreach } from "../../models/Interfaces/SLABreach";

const columnHelper = createColumnHelper<SLABreach>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <Text>{info.getValue() ?? ""}</Text>,
    header: () => "Job Id",
  }),

  columnHelper.accessor("client", {
    header: "Client",

    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("breachTime", {
    header: "SLA Breach",

    cell: (info) => {
      return info.getValue() != null ? (
        <Badge
          textTransform={"none"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          h={"6"}
          borderRadius={"xl"}
          w={"full"}
          bgColor={"rgba(249, 131, 88, 1)"}
          color={"white"}
          fontSize={"10px"}
          fontWeight={"normal"}
        >
          {info.getValue()}
        </Badge>
      ) : (
        "-"
      );
    },
  }),

  columnHelper.accessor("engineer", {
    header: "Engineer",

    cell: (info) => {
      return info.getValue();
    },
  }),

  columnHelper.accessor("contact", {
    header: "Contact Customer",
    cell: (info) => {
      return (
        <Button
          fontWeight={"normal"}
          borderColor={"Neutral.500"}
          variant={"outline"}
          color={"Neutral 500"}
          aria-label={"sdd"}
          borderRadius={10}
        >
          {" "}
          <Text color={"gray"}>{info?.getValue() ?? ""}</Text>{" "}
        </Button>
      );
    },
  }),
];
const SLABreachMonitor = () => {
  const mockUpData: SLABreach[] = [
    {
      id: "1",
      client: "John Client",
      engineer: "John Engineer",
      breachTime: "-692h 30m",
      contact: "Contact",
    },
    {
      id: "2",
      client: "John Client",
      engineer: "John Engineer",
      breachTime: "-692h 30m",
      contact: "Contact",
    },
    {
      id: "3",
      client: "John Client",
      engineer: "John Engineer",
      breachTime: "-692h 30m",
      contact: "Contact",
    },
    {
      id: "4",
      client: "John Client",
      engineer: "John Engineer",
      breachTime: "-692h 30m",
      contact: "Contact",
    },
    {
      id: "5",
      client: "John Client",
      engineer: "John Engineer",
      breachTime: "-692h 30m",
      contact: "Contact",
    },
  ];
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: mockUpData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getSortedRowModel: getSortedRowModel(), //3
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering, // *3

    // debugTable: true,
  });
  return (
    <Card p={5} borderRadius={10} boxShadow={"none"}>
      <Text fontWeight={"bold"} fontSize={16} size={"md"} p={2} pl={5}>
        SLA Breach Monitor
      </Text>

      <Box overflowX="auto">
        <Table
          size={{
            base: "sm",
            sm: "md",
          }}
          width="full"
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <Tr key={index}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <Th
                    key={headerIndex}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      color={"Neutral 700"}
                      fontSize={"sm"}
                      fontWeight={"bold"}
                      alignItems="center"
                      textTransform={"capitalize"}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <Tr
                key={rowIndex}
                bg={row.index % 2 !== 0 ? "#FAFAFA" : "white"}
                style={{ cursor: "pointer" }}
                _hover={{
                  color: "#4B4B4B",
                  textDecoration: "none",
                  background: "Neutral.200",
                }}
              >
                {row.getVisibleCells().map(
                  (
                    cell,
                    cellIndex // Modify this line
                  ) => (
                    <Td key={cellIndex}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
};

export default SLABreachMonitor;
