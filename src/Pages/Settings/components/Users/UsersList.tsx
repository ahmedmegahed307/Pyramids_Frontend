import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Button,
  Thead,
  Tr,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  useDisclosure,
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
import ExportToExcel from "../../../Excel/ExportToExcel";
import { Link, NavLink } from "react-router-dom";
import PaginationTable from "../PaginationTable/PaginationTable";
import { IconSortArrow } from "../../../../assets/icons/IconSortArrow";
import usePageTitleStore from "../../../../hooks/NavBar/PageTitleStore";
import User from "../../../../models/User";
import MainSearchIcon from "../../../../assets/icons/MainSearchIcon";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",

    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("phone", {
    header: "Phone Number",

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("userRoleId", {
    header: "Role",

    cell: (info) => (info.getValue() === 1 ? "Admin" : "Engineer"),
  }),
];
interface UsersListProps {
  data: User[];
  setDeleteUserId: (id: number) => void;
  deleteModal: any;
  createModal: any;
}

const UsersList = ({
  data,
  setDeleteUserId,
  deleteModal,
  createModal,
}: UsersListProps) => {
  const pageTitleStore = usePageTitleStore();

  useEffect(() => {
    pageTitleStore.setPageTitle("Users ");
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
  const headers = ["Name", "Email", "Contact Name", "Phone", "Role"];
  const keys = ["name", "email", "contactName", "phone", "type"];

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
            <Tr key={row.id} bg={index % 2 != 0 ? "Neutral.100" : "white"}>
              {row.getVisibleCells().map((cell) => (
                <>
                  <Td key={cell.id}>
                    <Link to={`/settings/users/${row.original.id}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Link>
                  </Td>
                </>
              ))}
              <Td>
                <IconButton
                  aria-label="Search database"
                  as={NavLink}
                  icon={<DeleteIcon />}
                  onClick={() => {
                    setDeleteUserId(row.original.id || 0);
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
      <Spacer></Spacer>
      <PaginationTable data={data} table={table} />
    </>
  );
};

export default UsersList;
