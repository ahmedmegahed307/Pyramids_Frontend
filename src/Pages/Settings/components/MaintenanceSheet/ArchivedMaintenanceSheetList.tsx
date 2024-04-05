import { EditIcon, DeleteIcon, AddIcon, RepeatIcon } from "@chakra-ui/icons";
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

import { NavLink } from "react-router-dom";

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

  columnHelper.accessor("mandatory", {
    header: "Mandatory",
    cell: (info) => (info.getValue() === true ? "Yes" : "No"),
  }),
];

interface MaintenanceSheetProps {
  maintenanceSheetList: any[];
  setRestoreMaintenanceSheetId: (id: number) => void;
  restoreModal: any;
}
const ArchivedMaintenanceSheetList = ({
  maintenanceSheetList,
  setRestoreMaintenanceSheetId,
  restoreModal,
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
  return (
    <>
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
          {table.getHeaderGroups().map((headerGroup, index) => (
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
          {table.getRowModel().rows.map((row, rowIndex) => (
            <Tr key={rowIndex} bg={row.index % 2 !== 0 ? "#FAFAFA" : "white"}>
              {row.getVisibleCells().map(
                (
                  cell,
                  cellIndex // Modify this line
                ) => (
                  <Td key={cellIndex}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                )
              )}
              <Td>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  mr={2}
                  onClick={() => {
                    setRestoreMaintenanceSheetId(row.original.id ?? 0);
                    restoreModal.onOpen();
                  }}
                >
                  Restore
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Spacer></Spacer>
      <PaginationTable data={maintenanceSheetList} table={table} />
    </>
  );
};

export default ArchivedMaintenanceSheetList;
