import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
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
  useDisclosure,
  Button,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import moment from "moment";
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
import { BsSearch } from "react-icons/bs";

import { Link, NavLink, useNavigate } from "react-router-dom";

import DeleteContract from "./DeleteContract";
import { IContract } from "../../../models/Interfaces/IContract";
import useContract from "../../../hooks/PPM/useContract";
import ExportToExcel from "../../Excel/ExportToExcel";
import { IconSortArrow } from "../../../assets/icons/IconSortArrow";
import PaginationTable from "../../Settings/components/PaginationTable/PaginationTable";
import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";
import MainSearchIcon from "../../../assets/icons/MainSearchIcon";

const columnHelper = createColumnHelper<IContract>();

const columns = [
  columnHelper.accessor("clientName", {
    header: "Client",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("contractRef", {
    header: "Contract Reference",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jobTypeName", {
    header: "Job Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor(
    (value) => moment(value.startDate).format("DD/MM/YYYY") ?? "-",
    {
      header: "Start Date",

      cell: (info) => {
        return info.getValue() ?? "-";
      },
    }
  ),
  columnHelper.accessor(
    (value) => moment(value.expiryDate).format("DD/MM/YYYY hh:mm") ?? "-",
    {
      header: "Expiry Date",

      cell: (info) => {
        return info.getValue() ?? "-";
      },
    }
  ),
  columnHelper.accessor("nextVisitDate", {
    header: "Next Visit Date",
    cell: (info) => {
      const nextVisitDate = info.getValue();
      return nextVisitDate
        ? moment(nextVisitDate).format("MMMM Do YYYY - mm:hh")
        : "";
    },
  }),
];

const ContractList = () => {
  //get contractList
  const { data: activeData, isLoading, isError } = useContract(true);
  const { data: inactiveData } = useContract(false);
  const [showInactive, setShowInactive] = useState(false);
  const toggleShowInactive = () => {
    setShowInactive(!showInactive);
  };
  const dataToShow = showInactive ? inactiveData : activeData;

  //update
  const navigate = useNavigate();

  //delete contract
  const deleteModal = useDisclosure();
  const [deleteContractId, setDeleteContractId] = useState(0);

  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState(""); //2

  const table = useReactTable({
    data: dataToShow || [],
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
  const headers = [
    "Client",
    "Job Type",
    "Status",
    "Expiry Date",
    "Next Visit Date",
  ];
  const keys = ["clientId", "type", "status", "expiryDate", "nextVisitDate"];
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) {
    return <IsError />;
  }
  return (
    <>
      <HStack w={"full"}>
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
        <Checkbox
          fontWeight={"bold"}
          color={"gray"}
          colorScheme="Primary"
          isChecked={showInactive}
          onChange={toggleShowInactive}
        >
          Inactive
        </Checkbox>
        <ExportToExcel
          data={[]}
          headers={headers || []}
          keys={keys || []}
          sheetName={"Contracts_List"}
        />

        <Button
          as={NavLink}
          to="/ppm/contracts/addContract"
          onClick={() => {}}
          variant="outline"
          size={{
            base: "sm",
            md: "md",
          }}
          leftIcon={<AddIcon />}
        >
          Add
        </Button>
      </HStack>

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
              <Th>Actions</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, index) => (
            <Tr key={row.id} bg={index % 2 != 0 ? "Neutral.100" : "white"}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
              <Td>
                <HStack>
                  <Link to={`/ppm/contracts/${row.original.id}/edit`}>
                    <IconButton
                      aria-label="Search database"
                      icon={<EditIcon />}
                      variant="outline"
                      size="sm"
                    />
                  </Link>

                  <IconButton
                    aria-label="Search database"
                    as={NavLink}
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setDeleteContractId(row.original.id);
                      deleteModal.onOpen();
                    }}
                    variant={"outline"}
                    size={"sm"}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Spacer></Spacer>

      <PaginationTable data={dataToShow} table={table} />

      {/* Delete Modal   */}
      <DeleteContract
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        contractId={deleteContractId}
      />
    </>
  );
};

export default ContractList;
