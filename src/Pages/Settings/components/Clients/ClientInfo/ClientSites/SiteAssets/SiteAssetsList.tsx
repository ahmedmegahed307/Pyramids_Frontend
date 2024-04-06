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
import { Asset } from "../../../../../../../models/Asset";
import { IconSortArrow } from "../../../../../../../assets/icons/IconSortArrow";
import PaginationTable from "../../../../PaginationTable/PaginationTable";

const columnHelper = createColumnHelper<Asset>();

const columns = [
  columnHelper.accessor("serialNo", {
    header: "Serial No",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tagNo", {
    header: " Tag No",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",

    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("description", {
    header: "Description",

    cell: (info) => info.getValue(),
  }),
];
interface contactListProps {
  data: Asset[];
  setDeleteAssetId: (id: number) => void;
  setEditAsset: (asset: Asset) => void;
  deleteModal: any;
  editModal: any;
}

const SiteAssetsList = ({
  data,
  setDeleteAssetId,
  setEditAsset,
  deleteModal,
  editModal,
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
                    setEditAsset(row.original);
                    editModal.onOpen();
                  }}
                />
                <IconButton
                  aria-label="Search database"
                  w={"auto"}
                  icon={<DeleteIcon />}
                  onClick={() => {
                    setDeleteAssetId(row.original.id);
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

export default SiteAssetsList;
