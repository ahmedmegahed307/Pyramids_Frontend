import {
  ArrowDownIcon,
  ArrowUpIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
} from "@chakra-ui/icons";
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
  Button,
  useDisclosure,
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
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import PaginationTable from "../../../PaginationTable/PaginationTable";
import CreateField, { CreateFieldValidation } from "./CreateField";
import { v4 as uuidv4 } from "uuid";
import { de } from "date-fns/locale";
import UpdateField, { UpdateFieldValidation } from "./UpdateField";
import { useQueries, useQueryClient } from "@tanstack/react-query";

import { IconSortArrow } from "../../../../../../assets/icons/IconSortArrow";
import DeleteField from "./DeleteField";
import { MSField } from "../../../../../../models/Interfaces/MSField";

const columnHelper = createColumnHelper<MSField>();

const columns = [
  columnHelper.accessor("name", {
    header: "Field",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: " Type",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("isRequired", {
    header: () => "Required",
    cell: (info) => (
      <>{info.getValue()?.toString() === "true" ? "Yes" : "No"}</>
    ),
  }),
  columnHelper.accessor("initialValues", {
    header: "Initial Value",
    cell: (info) => {
      const initValueList = info.getValue() || [];
      const lastElementIndex = initValueList.length - 1;
      return initValueList.map((initValue, index) => {
        const isLastElement = index === lastElementIndex;
        return (
          <React.Fragment key={index}>
            {initValue}
            {!isLastElement && ", "}
          </React.Fragment>
        );
      });
    },
  }),
];
interface FieldTableProps {
  data: MSField[];
  createModal: any;
  updateModal: any;
  deleteModal: any;
}

const FieldList = ({
  data,
  updateModal,
  deleteModal,
  createModal,
}: FieldTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [filtering, setFiltering] = useState<string>("");

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

  //create
  // const createFieldQuery = useCreateField({
  //   onCreate: () => {
  //     createModal.onClose();
  //   },
  //   checklist: checklist,
  // });
  const handleCreateForm = async (data: CreateFieldValidation) => {
    console.log("Field Data", data);
    // createFieldQuery.mutate(data);
  };

  //update
  const [updateField, setUpdateField] = useState<any>();
  // const updateFieldQuery = useFieldMutation({
  //   onUpdateOrDelete: () => {
  //     updateModal.onClose();
  //   },
  //   checklist: checklist,
  //   isUpdate: true,
  //   editFieldId: updateField?.id ?? "",
  // });

  const handleUpdateForm = async (data: UpdateFieldValidation) => {
    //updateFieldQuery.mutate(data);
  };

  //delete
  const [deleteFieldId, setDeleteFieldId] = useState("");
  // const deleteFieldQuery = useFieldMutation({
  //   onUpdateOrDelete: () => {
  //     deleteModal.onClose();
  //   },
  //   checklist: checklist,
  //   isUpdate: false,
  // });
  const handleDeleteField = () => {
    console.log("deleteFieldId", deleteFieldId);
    //  deleteFieldQuery.mutate(deleteFieldId);
  };

  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          my={4}
          variant="solid"
          size="md"
          onClick={() => {
            createModal.onOpen();
          }}
        >
          Add Field
        </Button>
      </Flex>
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

                      <Box color={"#1396ab"} fontSize={"md"} ml={1}>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  </>
                ))}
                <Td display={"flex"}>
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<EditIcon />}
                    onClick={() => {
                      setUpdateField(row.original);
                      updateModal.onOpen();
                    }}
                    variant={"outline"}
                    size={"sm"}
                    mx={1}
                  />
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<DeleteIcon />}
                    onClick={() => {
                      deleteModal.onOpen();
                      setDeleteFieldId(row.original!.id.toString() ?? "");
                    }}
                    variant={"outline"}
                    size={"sm"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <PaginationTable data={data} table={table} />
      </TableContainer>
      {/* create modal */}
      <CreateField createModal={createModal} onSubmit={handleCreateForm} />

      {/* update modal */}
      <UpdateField
        originalField={updateField as any}
        updateModal={updateModal}
        onSubmit={handleUpdateForm}
      />

      {/* delete modal */}
      <DeleteField
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        deleteFieldId={deleteFieldId}
        onDeleteField={handleDeleteField}
      />
    </>
  );
};

export default FieldList;
