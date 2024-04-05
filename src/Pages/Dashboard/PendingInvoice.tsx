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
import { PendingInvoices } from "../../models/Interfaces/PendingInvoices";

const columnHelper = createColumnHelper<PendingInvoices>();

const columns = [
  columnHelper.accessor("client", {
    header: "Client",

    cell: (info) => {
      return info.getValue();
    },
  }),

  columnHelper.accessor("amount", {
    header: "Amount",

    cell: (info) => {
      return info.getValue();
    },
  }),

  columnHelper.accessor("dueDate", {
    header: "Due Date",

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
const PendingInvoice = () => {
  const mockUpData: PendingInvoices[] = [
    {
      client: "Ahmed Client",
      amount: "$200",
      dueDate: "2024-01-04",
      contact: "Contact",
    },
    {
      client: "Ahmed Client",
      amount: "$300",
      dueDate: "2024-01-30",
      contact: "Contact",
    },
    {
      client: "Ahmed Client",
      amount: "$100",
      dueDate: "2024-01-31",
      contact: "Contact",
    },
    {
      client: "Ahmed Client",
      amount: "$500",
      dueDate: "2024-02-15",
      contact: "Contact",
    },
    {
      client: "Ahmed Client",
      amount: "$600",
      dueDate: "2024-03-25",
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
        Pending Invoices
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

export default PendingInvoice;
