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
import JobIssue from "../../../../../models/JobIssue";
import UpdateIssue from "./UpdateIssue";
import { Asset } from "../../../../../models/Asset";

const columnHelper = createColumnHelper<JobIssue>();

const columns = [
  columnHelper.accessor("assetName", {
    header: " Asset ",

    cell: (info) => info?.getValue() || "None",
  }),

  columnHelper.accessor("issue", {
    header: " Issue",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("priority", {
    header: " Priority",

    cell: (info) => info.getValue(),
  }),
];
interface IssueTableProps {
  createIssueModal: any;
  issues: JobIssue[];
  updateIssues: (updatedIssues: JobIssue[]) => void;
  clientAssets: Asset[];
}

const IssueList = ({
  createIssueModal,
  issues,
  clientAssets,
  updateIssues,
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

  //edit
  const updateIssueModal = useDisclosure();
  const [editIssue, setEditIssue] = useState<JobIssue>();

  const handleUpdateIssue = (updatedIssue: JobIssue) => {
    const updatedIssues = issues.map((Issue) =>
      Issue.id === updatedIssue.id ? updatedIssue : Issue
    );

    updateIssues(updatedIssues);
    setEditIssue(undefined);
  };

  //delete
  const handleDeleteIssue = (IssueId: any) => {
    const updatedIssues = issues.filter((Issue) => Issue.id !== IssueId);
    updateIssues(updatedIssues);
  };
  console.log("edit Issue", editIssue);
  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <Button
          leftIcon={<AddIcon />}
          mb={4}
          variant="link"
          size="md"
          onClick={() => {
            createIssueModal.onOpen();
          }}
        >
          Add Issue
        </Button>
      </Flex>
      <TableContainer>
        <Table
          size={{
            base: "sm",
            md: "sm",
            lg: "md",
          }}
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
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<EditIcon />}
                    onClick={() => {
                      setEditIssue(row.original);
                      console.log("row", row.original);
                      updateIssueModal.onOpen();
                    }}
                    variant={"outline"}
                    size={"sm"}
                    m={1}
                  />
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteIssue(row.original.id)}
                    variant={"outline"}
                    size={"sm"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <UpdateIssue
        clientAssets={clientAssets}
        isOpen={updateIssueModal.isOpen}
        onClose={updateIssueModal.onClose}
        updateIssue={editIssue}
        onUpdate={handleUpdateIssue}
      />
    </>
  );
};

export default IssueList;
