import {
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Card,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Text,
  Tooltip,
  IconButton,
  Spacer,
  Button,
  useDisclosure,
  Drawer,
  HStack,
  Heading,
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
import PaginationTable from "../../../PaginationTable/PaginationTable";
import { Link, NavLink, useParams } from "react-router-dom";
import CreateSite, { CreateClientSiteValidation } from "./CreateSite";
import DeleteSite from "./DeleteSite";
import { IconSortArrow } from "../../../../../../assets/icons/IconSortArrow";
import Site from "../../../../../../models/Site";
import useCreateSite from "../../../../../../hooks/Settings/Client/Site/useCreateSite";
import Client from "../../../../../../models/Client";
import { clientProps } from "../../../../../../StaticData/StaticData";
import useGetClientById from "../../../../../../hooks/Settings/Client/useGetClientById";
import IsLoading from "../../../../../GeneralComponents/IsLoading";
import IsError from "../../../../../GeneralComponents/IsError";
import usePageTitleStore from "../../../../../../hooks/NavBar/PageTitleStore";
import { FaHandHoldingUsd } from "react-icons/fa";
import useAuthStore from "../../../../../../hooks/Authentication/store";

const columnHelper = createColumnHelper<Site>();

const columns = [
  columnHelper.accessor("name", {
    header: () => <span>Name</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor(
    (value) => value.addressLine1 + " , " + value.addressLine2 ?? "-",
    {
      header: "Address",
      cell: (info) => {
        const address = info.getValue() ?? "-";
        const truncatedAddress = address.substring(0, 50);

        return (
          <Tooltip label={address} background={"gray.50"} color={"teal"}>
            <Text>
              {truncatedAddress} {address.length > 50 && "..."}
            </Text>
          </Tooltip>
        );
      },
    }
  ),
  columnHelper.accessor("contactEmail", {
    header: () => <span>Email</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor("contactName", {
    header: () => <span>Contact Name</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor("contactPhone", {
    header: () => <span>Contact Phone</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  }),
];

const ClientSiteList = () => {
  const { user } = useAuthStore();
  const { id } = useParams();
  const { data: client, isLoading, isError } = useGetClientById(parseInt(id));
  console.log("sitesAdmin", client?.sites);
  const pageTitleStore = usePageTitleStore();
  useEffect(() => {
    pageTitleStore.setPageTitle("Client Sites");
  }, []);
  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState(""); //2

  const table = useReactTable({
    data: client?.sites ?? [],
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

  //create site
  const createSiteModal = useDisclosure();
  const createSiteQuery = useCreateSite(() => {
    createSiteModal.onClose();
  });
  const handleCreateForm = (data: CreateClientSiteValidation) => {
    console.log("my site data", data);
    createSiteQuery.mutate({
      companyId: user?.companyId,
      name: data?.name,
      contactEmail: data?.email,
      contactName: data?.contactName,
      contactPhone: data?.phoneNumber,
      addressLine1: data?.address1,
      addressLine2: data?.address2,
      city: data?.city,
      clientId: client?.id ?? 0,
      postCode: data?.postcode,
    });
  };
  //delete site
  const deleteSiteModal = useDisclosure();
  const [deleteSiteId, setDeleteSiteId] = useState(0);
  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) return <IsError />;
  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <HStack w={"full"}>
        <Heading size={"md"}>Client Sites</Heading>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          variant="solid"
          size="md"
          onClick={() => {
            createSiteModal.onOpen();
          }}
        >
          Add
        </Button>
      </HStack>
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
                <Th>actions</Th>
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
                  <Flex wrap={"nowrap"}>
                    <Link to={`/settings/sites/${row.original.id}/assets`}>
                      <IconButton
                        aria-label="Search database"
                        icon={<FaHandHoldingUsd />}
                        variant={"outline"}
                        size={"sm"}
                        title="Assets"
                        m={1}
                      />
                    </Link>
                    <IconButton
                      aria-label="Search database"
                      as={NavLink}
                      icon={<DeleteIcon />}
                      onClick={() => {
                        setDeleteSiteId(row.original.id ?? 0);
                        deleteSiteModal.onOpen();
                      }}
                      variant={"outline"}
                      size={"sm"}
                      m={1}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <PaginationTable data={client?.sites ?? []} table={table} />

      <Drawer
        onClose={createSiteModal.onClose}
        isOpen={createSiteModal.isOpen}
        size={{
          base: "sm",
          lg: "lg",
        }}
      >
        <CreateSite
          createSiteModal={createSiteModal}
          onSubmit={handleCreateForm}
        />
      </Drawer>

      {/* Delete Modal   */}
      <DeleteSite
        isOpen={deleteSiteModal.isOpen}
        onClose={deleteSiteModal.onClose}
        siteId={deleteSiteId}
      />
    </Card>
  );
};

export default ClientSiteList;
