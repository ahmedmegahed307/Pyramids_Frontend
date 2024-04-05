import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
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
  Button,
  useDisclosure,
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
import UpdatePart from "./UpdatePart";
import { IconSortArrow } from "../../../../../assets/icons/IconSortArrow";
import JobPart from "../../../../../models/JobPart";

const columnHelper = createColumnHelper<JobPart>();

const columns = [
  columnHelper.accessor("name", {
    header: " Name",

    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("cost", {
    header: " Cost",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: " Quantity",

    cell: (info) => info.getValue(),
  }),
];
interface PartTableProps {
  createPartModal: any;
  parts: JobPart[];
  updateParts: (updatedParts: JobPart[]) => void;
}

const PartList = ({ createPartModal, parts, updateParts }: PartTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: parts,
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

  //edit
  const updatePartModal = useDisclosure();
  const [editPart, setEditPart] = useState<JobPart>();

  const handleUpdatePart = (updatedPart: JobPart) => {
    console.log("updated", updatedPart);
    const updatedParts = parts.map((part) =>
      part.id === updatedPart.id ? updatedPart : part
    );

    updateParts(updatedParts);
    setEditPart(undefined);
  };

  //delete
  const handleDeletePart = (partId: any) => {
    const updatedParts = parts.filter((part) => part.id !== partId);
    updateParts(updatedParts);
  };
  console.log("edit part", editPart);
  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <Button
          leftIcon={<AddIcon />}
          mb={4}
          mx={2}
          variant="link"
          size="md"
          onClick={() => {
            createPartModal.onOpen();
          }}
        >
          Add Part
        </Button>
      </Flex>
      <Card
        height={"full"}
        p={0}
        borderRadius={"xl"}
        width={"full"}
        overflow={"auto"}
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
                    icon={<EditIcon />}
                    onClick={() => {
                      setEditPart(row.original);
                      console.log("row", row.original);
                      updatePartModal.onOpen();
                    }}
                    variant={"outline"}
                    size={"sm"}
                    m={1}
                  />
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<DeleteIcon />}
                    onClick={() => handleDeletePart(row.original.id)}
                    variant={"outline"}
                    size={"sm"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Spacer></Spacer>
      </Card>
      <UpdatePart
        isOpen={updatePartModal.isOpen}
        onClose={updatePartModal.onClose}
        updatePart={editPart}
        onUpdate={handleUpdatePart}
      />
    </>
  );
};

export default PartList;
