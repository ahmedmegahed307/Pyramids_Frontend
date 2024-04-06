import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Text,
  Spacer,
  HStack,
  Tooltip,
  TableContainer,
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

import { NavLink } from "react-router-dom";
import { IconSortArrow } from "../../../../../assets/icons/IconSortArrow";
import PaginationTable from "../../../../Settings/components/PaginationTable/PaginationTable";
import JobIssue from "../../../../../models/JobIssue";

const columnHelper = createColumnHelper<JobIssue>();

const columns = [
  columnHelper.accessor("asset", {
    header: "Asset",

    cell: (info) => info.getValue()?.serialNo || "None",
  }),

  columnHelper.accessor((value) => value.description ?? "-", {
    header: "Description",
    cell: (info) => {
      const description = info.getValue() ?? "-";
      const truncatedDescription = description.substring(0, 50);
      return (
        <Tooltip label={description} background={"gray.50"} color="Primary.700">
          <Text>
            {truncatedDescription} {description.length > 50 && "..."}
          </Text>
        </Tooltip>
      );
    },
  }),
  columnHelper.accessor("jobIssuePriority", {
    header: " Priority",

    cell: (info) => info.getValue(),
  }),
];
interface IssueTableProps {
  issues: JobIssue[];
  setDeleteIssueId: (id: number) => void;
  deleteModal: any;
  setUpdateIssue: (model: JobIssue) => void;
  updateModal: any;
}

const IssueList = ({
  issues,
  setDeleteIssueId,
  deleteModal,
  setUpdateIssue,
  updateModal,
}: IssueTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: issues,
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

  return (
    <TableContainer>
      <Table
        size={{
          base: "sm",
          md: "sm",
          lg: "md",
        }}
      >
        <Thead borderBottom={"1px solid #E5E5E5"}>
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
                    fontSize={"md"}
                    fontWeight={"medium"}
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
              <Th
                color={"Neutral.500"}
                fontSize={"md"}
                fontWeight={"medium"}
                alignItems="center"
                textTransform={"capitalize"}
              >
                <Flex
                  color={"Neutral.500"}
                  fontSize={"md"}
                  fontWeight={"medium"}
                  alignItems="center"
                >
                  Actions
                </Flex>
              </Th>
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row, index) => (
            <Tr key={row.id} bg={index % 2 != 0 ? "Neutral.100" : "white"}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} px={4}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}

              <Td>
                <HStack spacing={0}>
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<EditIcon />}
                    variant={"outline"}
                    onClick={() => {
                      setUpdateIssue(row.original);
                      updateModal.onOpen();
                    }}
                    size={"sm"}
                    m={1}
                  />
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setDeleteIssueId(row.original.id || 0);
                      deleteModal.onOpen();
                    }}
                    variant={"outline"}
                    size={"sm"}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PaginationTable data={issues} table={table} />
    </TableContainer>
  );
};

export default IssueList;
