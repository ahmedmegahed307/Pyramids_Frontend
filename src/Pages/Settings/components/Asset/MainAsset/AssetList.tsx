import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
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
import { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import usePageTitleStore from "../../../../../hooks/NavBar/PageTitleStore";
import { IconSortArrow } from "../../../../../assets/icons/IconSortArrow";
import { NavLink } from "react-router-dom";
import PaginationTable from "../../PaginationTable/PaginationTable";
import { Asset } from "../../../../../models/Asset";
import MainSearchIcon from "../../../../../assets/icons/MainSearchIcon";

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
interface AssetListProps {
  data: Asset[];
  setDeleteAssetId: (id: number) => void;
  setUpdateAsset: (model: Asset) => void;
  deleteModal: any;
  updateModal: any;
  createModal: any;
}

const AssetList = ({
  data,
  setDeleteAssetId,
  setUpdateAsset,
  updateModal,
  deleteModal,
  createModal,
}: AssetListProps) => {
  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("Assets");
  }, []);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [filtering, setFiltering] = useState<string>("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,

    debugTable: true,
  });

  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <InputGroup width={{ base: "100%", md: "50%", lg: "30%" }} mb={2}>
          <InputLeftElement pointerEvents="none" pt={2} pl={5}>
            <MainSearchIcon />
          </InputLeftElement>
          <Input
            // bg={"white"}
            pl={12}
            h={"12"}
            borderRadius={"10"}
            // border={"none"}
            focusBorderColor="Primary.500"
            // borderWidth={0}
            placeholder="Enter filter"
            _placeholder={{
              color: "Neutral.500",
              opacity: "0.7",
            }}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </InputGroup>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          variant="outline"
          mt={2}
          ml={2}
          size="md"
          onClick={() => {
            createModal.onOpen();
          }}
        >
          Add
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  </>
                ))}
                <Td>
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<EditIcon />}
                    onClick={() => {
                      setUpdateAsset(row.original);
                      updateModal.onOpen();
                    }}
                    variant={"outline"}
                    size={"sm"}
                    m={1}
                  />
                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setDeleteAssetId(row.original.id || 0);
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
      </TableContainer>
      <Spacer></Spacer>
      <PaginationTable data={data} table={table} />
    </>
  );
};

export default AssetList;
