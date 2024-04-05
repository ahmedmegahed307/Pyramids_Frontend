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
  Spacer,
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
import JobAttachment from "../../../../../models/JobAttachment";

const columnHelper = createColumnHelper<JobAttachment>();

const columns = [
  columnHelper.accessor("fileName", {
    header: "Name",

    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("fileType", {
    header: " Type",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fileURL", {
    header: " URL",

    cell: (info) => info.getValue(),
  }),
];
interface props {
  attachments: JobAttachment[];
  setDeleteAttachmentId: (id: number) => void;
  deleteModal: any;
}

const AttachmentsList = ({
  attachments,
  setDeleteAttachmentId,
  deleteModal,
}: props) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: attachments,
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
    <>
      <Card
        height={"full"}
        p={0}
        borderRadius={"xl"}
        width={"full"}
        overflowX={"hidden"}
        overflowY={"auto"}
      >
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
            bg={"#F2F3F3"}
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
                  <Td key={cell.id} px={4}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
                <Td>
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setDeleteAttachmentId(row.original.id || 0);
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
        <PaginationTable data={attachments} table={table} />
      </Card>
    </>
  );
};

export default AttachmentsList;
