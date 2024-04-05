import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import {
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
  InputGroup,
  InputLeftElement,
  Input,
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

import { Link, NavLink, useNavigate } from "react-router-dom";

import PaginationTable from "../PaginationTable/PaginationTable";
import { IconSortArrow } from "../../../../assets/icons/IconSortArrow";
import { MaintenanceSheet } from "../../../../models/Interfaces/MaintenanceSheet";
import MainSearchIcon from "../../../../assets/icons/MainSearchIcon";
import ExportToExcel from "../../../Excel/ExportToExcel";

const columnHelper = createColumnHelper<MaintenanceSheet>();

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("visibleOn", {
    header: "Visible On",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("subtypes", {
    header: "Associated SubTypes",
    cell: (info) =>
      info
        .getValue()
        .map((subtype: any) => subtype.name)
        .join(", "),
  }),

  columnHelper.accessor("mandatory", {
    header: "Mandatory",
    cell: (info) => (info.getValue() === true ? "Yes" : "No"),
  }),
];

interface MaintenanceSheetProps {
  maintenanceSheetList: MaintenanceSheet[];
  setDeleteMaintenanceSheetId: (id: number) => void;
  createModal: any;
  deleteModal: any;
  updateModal: any;
}
const MaintenanceSheetList = ({
  maintenanceSheetList,
  setDeleteMaintenanceSheetId,
  createModal,
  deleteModal,
  updateModal,
}: MaintenanceSheetProps) => {
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2

  const table = useReactTable({
    data: maintenanceSheetList || [],
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
  const navigate = useNavigate();
  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <InputGroup width={{ base: "100%", md: "50%", lg: "30%" }} mb={4}>
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

        <ExportToExcel
          data={[]}
          headers={headers || []}
          keys={keys || []}
          sheetName={"Users_List"}
        />
        <Button
          leftIcon={<AddIcon />}
          m={2}
          variant="outline"
          size="md"
          onClick={() => {
            createModal.onOpen();
          }}
        >
          Add
        </Button>
      </Flex>
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
                    textTransform={"capitalize"}
                    color={"Neutral.500"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                    alignItems="center"
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
                fontSize={"sm"}
                fontWeight={"medium"}
                alignItems="center"
              >
                <Flex
                  textTransform={"capitalize"}
                  color={"Neutral.500"}
                  fontSize={"sm"}
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
            <Tr
              key={index}
              bg={row.index % 2 !== 0 ? "#FAFAFA" : "white"}
              style={{ cursor: "pointer" }}
            >
              {row.getVisibleCells().map((cell, cellIndex) => (
                <Td key={cellIndex}>
                  <Link
                    to={`/globalSettings/maintenanceSheet/${row.original.id}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </Td>
              ))}
              <Td display={"flex"}>
                <Link
                  to={`/globalSettings/maintenanceSheet/${row.original.id}`}
                >
                  <Button size={"sm"} variant={"outline"} mr={2}>
                    View
                  </Button>
                </Link>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  mr={2}
                  onClick={() => {
                    setDeleteMaintenanceSheetId(row.original.id || 0);
                    deleteModal.onOpen();
                  }}
                >
                  Archive
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PaginationTable data={maintenanceSheetList} table={table} />
    </>
  );
};

export default MaintenanceSheetList;
