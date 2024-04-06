import {
  ArrowDownIcon,
  ArrowUpIcon,
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
  Box,
  Button,
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
import PaginationTable from "../../../../Settings/components/PaginationTable/PaginationTable";
import { IconSortArrow } from "../../../../../assets/icons/IconSortArrow";
import JobAttachment from "../../../../../models/JobAttachment";

const columnHelper = createColumnHelper<File>();

const columns = [
  columnHelper.accessor("name", {
    header: " Name",

    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
];
interface AttachmentTableProps {
  createAttachmentModal: any;
  Attachments: File[];
  updateAttachments: (updatedAttachments: File[]) => void;
}

const AttachmentList = ({
  createAttachmentModal,
  Attachments,
  updateAttachments,
}: AttachmentTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: Attachments ?? [],
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

  //delete
  const handleDeleteAttachment = (deletedAttachment: File) => {
    console.log("attachment::", deletedAttachment);
    console.log("Attachments::", Attachments);

    const updatedAttachments = Attachments.filter(
      (attachment) => attachment !== deletedAttachment
    );
    console.log("updatedAttachments::", updatedAttachments);
    updateAttachments(updatedAttachments);
  };
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
            createAttachmentModal.onOpen();
          }}
        >
          Add Attachment
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
                    onClick={() => handleDeleteAttachment(row.original)}
                    variant={"outline"}
                    size={"sm"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </>
  );
};

export default AttachmentList;
