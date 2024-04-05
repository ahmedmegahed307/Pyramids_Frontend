import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
} from "@chakra-ui/icons";
import {
  Card,
  Flex,
  Text,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  Tag,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import {
  ColumnDef,
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

import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { IconSortArrow } from "../../../../assets/icons/IconSortArrow";
import ExportToExcel from "../../../Excel/ExportToExcel";
import PaginationTable from "../PaginationTable/PaginationTable";
import Resolution from "../../../../models/Resolution";
import useResolutionStore from "../../../../hooks/Settings/Resolution/ResolutionStore";

const columnHelper = createColumnHelper<Resolution>();

const columns = [
  columnHelper.accessor("name", {
    header: "Resolutions",

    cell: (info) => info.getValue(),
  }),
];
interface ResolutionTableProps {
  data: Resolution[];
  createModal: any;
  updateModal: any;
  deleteModal: any;
}

const ResolutionList = ({
  data,
  updateModal,
  deleteModal,
  createModal,
}: ResolutionTableProps) => {
  const {
    setDeleteResolutionId,
    setUpdateResolutionId,
    setUpdateResolutionInput,
  } = useResolutionStore();
  const rerender = React.useReducer(() => ({}), {})[1];
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
  const headers = ["Resolutions"];
  const keys = ["name"];
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Flex w={"full"} direction={"row"}>
        <InputGroup width={"35%"} m={5}>
          <InputLeftElement pointerEvents="none">
            <BsSearch />
          </InputLeftElement>
          <Input
            borderRadius={"xl"}
            placeholder="Enter filter"
            onChange={(e) => setFiltering(e.target.value)}
          />
        </InputGroup>
        <Spacer />

        <ExportToExcel
          data={data || []}
          headers={headers || []}
          keys={keys || []}
          sheetName={"Resolutions"}
        />
        <Button
          leftIcon={<AddIcon />}
          m={2}
          as={NavLink}
          onClick={() => {
            createModal.onOpen();
          }}
          variant={"solid"}
          size="md"
        >
          {"Add Resolution"}
        </Button>
      </Flex>
      <Card
        p={0}
        borderRadius={"xl"}
        width={"full"}
        variant={"outline"}
        borderRight={"hidden"}
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
                  <>
                    <Td
                      key={cell.id}
                      // _hover={{
                      //   background: "#1396ab",
                      //   color: "white",
                      //   cursor: "pointer",
                      // }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Search database"
                        as={NavLink}
                        icon={<EditIcon />}
                        onClick={() => {
                          setUpdateResolutionInput(row.original.name ?? "");
                          setUpdateResolutionId(row.original.id ?? 0);
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
                          setDeleteResolutionId(row.original.id ?? 0);
                          deleteModal.onOpen();
                        }}
                        variant={"outline"}
                        size={"sm"}
                      />
                    </Td>
                  </>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Spacer></Spacer>
        <PaginationTable data={data} table={table} />
      </Card>
    </>
  );
};

export default ResolutionList;
