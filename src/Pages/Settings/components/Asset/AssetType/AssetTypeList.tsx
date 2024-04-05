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
import { Link, NavLink } from "react-router-dom";
import PaginationTable from "../../PaginationTable/PaginationTable";
import AssetType from "../../../../../models/AssetType";
import MainSearchIcon from "../../../../../assets/icons/MainSearchIcon";

const columnHelper = createColumnHelper<AssetType>();

const columns = [
  columnHelper.accessor("code", {
    header: "Code",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: " Name",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",

    cell: (info) => info.getValue(),
  }),
];
interface AssetTypeListProps {
  data: AssetType[];
  setDeleteAssetTypeId: (id: number) => void;
  setUpdateAssetType: (model: AssetType) => void;
  deleteModal: any;
  updateModal: any;
  createModal: any;
}

const AssetTypeList = ({
  data,
  setDeleteAssetTypeId,
  setUpdateAssetType,
  updateModal,
  deleteModal,

  createModal,
}: AssetTypeListProps) => {
  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("Asset Types");
  }, []);
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2
  console.log("data", data);
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
          ml={2}
          leftIcon={<AddIcon />}
          variant="outline"
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
                      setUpdateAssetType(row.original);
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
                      setDeleteAssetTypeId(row.original.id || 0);
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

export default AssetTypeList;
