import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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

import PaginationTable from "../../../PaginationTable/PaginationTable";
import { IconSortArrow } from "../../../../../../assets/icons/IconSortArrow";
import Contact from "../../../../../../models/Contact";

const columnHelper = createColumnHelper<Contact>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("site", {
    header: "Site Name",

    cell: (info) => info.getValue()?.name,
  }),
  columnHelper.accessor("contactType", {
    header: "Contact Type",

    cell: (info) => info.getValue(),
  }),
];
interface contactListProps {
  data: Contact[];
  setDeleteContactId: (id: number) => void;
  setEditContact: (contact: Contact) => void;
  deleteModal: any;
  editModal: any;
}

const ContactsList = ({
  data,
  setDeleteContactId,
  deleteModal,
  editModal,
  setEditContact,
}: contactListProps) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2
  const table = useReactTable({
    data,
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

                    <Box color={"Primary.500"} fontSize={"md"} ml={1}>
                      <IconSortArrow />
                    </Box>
                  </Flex>
                </Th>
              ))}
              <Th>Actions</Th>
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

              <Td>
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Search database"
                  w={"auto"}
                  alignItems={"center"}
                  variant={"outline"}
                  size={"sm"}
                  m={1}
                  onClick={() => {
                    setEditContact(row.original);
                    editModal.onOpen();
                  }}
                />
                <IconButton
                  aria-label="Search database"
                  w={"auto"}
                  icon={<DeleteIcon />}
                  onClick={() => {
                    setDeleteContactId(row.original.id);
                    deleteModal.onOpen();
                  }}
                  variant={"outline"}
                  size={"sm"}
                  m={1}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PaginationTable data={data} table={table} />
    </TableContainer>
  );
};

export default ContactsList;
