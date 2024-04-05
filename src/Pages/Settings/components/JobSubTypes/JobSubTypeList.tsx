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
  Spacer,
  Box,
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

import PaginationTable from "../PaginationTable/PaginationTable";
import { IconSortArrow } from "../../../../assets/icons/IconSortArrow";
import JobSubType from "../../../../models/JobSubType";

const columnHelper = createColumnHelper<JobSubType>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jobType", {
    header: "Associated Job Type",
    cell: (info) => info.getValue()?.name,
  }),
];

interface JobTypeListProps {
  jobSubtypeList: JobSubType[];

  setDeleteSubTypeId: (id: number) => void;
  setUpdateJobSubType: (model: JobSubType) => void;

  deleteModal: any;
  updateModal: any;
}
const JobSubTypeList = ({
  jobSubtypeList,
  setDeleteSubTypeId,
  setUpdateJobSubType,
  deleteModal,
  updateModal,
}: JobTypeListProps) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: jobSubtypeList || [],
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
  const headers = ["Name", "Associated SubTypes"];
  const keys = ["name", "subTypeList"];
  return (
    <>
      <Table
        size={{
          base: "sm",
          md: "sm",
          lg: "md",
        }}
        rounded={"xl"}
        borderRadius={"xl"}
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
                    fontSize={"sm"}
                    fontWeight={"medium"}
                    alignItems="center"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <Box color={"#1396ab"} fontSize={"md"} ml={1}>
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
              <Td display={"flex"}>
                <IconButton
                  aria-label="Search database"
                  as={NavLink}
                  icon={<EditIcon />}
                  onClick={() => {
                    setUpdateJobSubType(row?.original), updateModal.onOpen();
                  }}
                  variant={"outline"}
                  size={"sm"}
                  mr={1}
                />

                <IconButton
                  aria-label="Search database"
                  as={NavLink}
                  icon={<DeleteIcon />}
                  onClick={() => {
                    setDeleteSubTypeId(row.original.id || 0);
                    deleteModal.onOpen();
                  }}
                  variant={"outline"}
                  size={"sm"}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Spacer></Spacer>
      <PaginationTable data={jobSubtypeList} table={table} />
    </>
  );
};

export default JobSubTypeList;
