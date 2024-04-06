import {
  ArrowDownIcon,
  ArrowUpIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
} from "@chakra-ui/icons";
import {
  Card,
  Flex,
  IconButton,
  Select,
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
  AbsoluteCenter,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  DrawerHeader,
  Text,
  HStack,
  Spinner,
  Tabs,
  TabPanels,
  TabPanel,
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
import ExportToExcel from "../../../Excel/ExportToExcel";
import { MdArrowBack } from "react-icons/md";
import DeleteClient from "./DeleteClient";
import PaginationTable from "../PaginationTable/PaginationTable";
import {
  FaChartPie,
  FaCity,
  FaHandHoldingUsd,
  FaUser,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Geocode from "react-geocode";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { set } from "date-fns";
import usePageTitleStore from "../../../../hooks/NavBar/PageTitleStore";
import useAuthStore from "../../../../hooks/Authentication/store";
import { IconSortArrow } from "../../../../assets/icons/IconSortArrow";
import RequiredFormLabel from "../../../RequiredFields/RequiredFormLabel";
import Client from "../../../../models/Client";
import Site from "../../../../models/Site";
import useClient from "../../../../hooks/Settings/Client/useClient";
import { useClientStore } from "../../../../hooks/Settings/Client/useClientStore";
import useCreateClient from "../../../../hooks/Settings/Client/useCreateClient";
import useClientMutation from "../../../../hooks/Settings/Client/useClientMutation";
import useCreateSite from "../../../../hooks/Settings/Client/Site/useCreateSite";
import MainSearchIcon from "../../../../assets/icons/MainSearchIcon";

const columnHelper = createColumnHelper<Client>();

const columns = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((value) => value.primaryContactEmail ?? "-", {
    header: "Primary  Email",

    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor((value) => value.primaryContactPhone ?? "-", {
    header: "Primary  Phone",

    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("siteType", {
    header: "Site Type",
    cell: (info) => info.getValue(),
  }),
];

const ClientList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    pageTitleStore?.setPageTitle("Clients");
  }, []);
  const { isClientCreateModalOpen, setIsClientCreateModalOpen } =
    useClientStore();

  const pageTitleStore = usePageTitleStore();

  const { user } = useAuthStore();

  const { isLoading, data, error } = useClient();

  const [sorting, setSorting] = useState<SortingState>([]); // 1

  const [filtering, setFiltering] = useState<string>(""); //2
  const table = useReactTable({
    data: (!isLoading && data && data) || [],
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
    "Code",
    "Name",
    "Address",
    "Primary Name",
    "Primary Email",
    "Primary Phone",
  ];
  const keys = [
    "code",
    "name",
    "addresses",
    "primaryContactName",
    "primaryContactEmail",
    "primaryContactPhone",
  ];

  //create
  const [createClient, setCreateClient] = useState<Client>({} as Client);
  const createModal = useDisclosure();

  //create client
  const [validateCode, setValidateCode] = useState("");

  const [validateName, setValidateName] = useState("");
  const [validateCity, setValidateCity] = useState("");
  const [createdClientId, setCreatedClientId] = useState<number>(0);

  const createClientQuery = useCreateClient(() => {
    createModal.onClose();
  }, setCreatedClientId);
  console.log("createdClientId", createdClientId);

  const handleCreate = async () => {
    createClientQuery.mutate({
      name: createClient.name,
      code: createClient.code,
      primaryContactEmail: createClient.primaryContactEmail,
      primaryContactPhone: createClient.primaryContactPhone,
      primaryFinancialName: createClient.primaryFinancialName,
      primaryFinancialEmail: createClient.primaryFinancialEmail,
      siteType: createClient.siteType,
      currency: createClient.currency,
      vatRate: createClient.vatRate,
      vatValue: createClient.vatValue,
      vatNumber: createClient.vatNumber,
      companyId: user?.companyId,
      createdByUserId: user?.id,
    });
    setCreateClient(undefined);
    createSiteModal.onOpen();
  };

  //create site
  const createSiteModal = useDisclosure();

  const [createSite, setCreateSite] = useState<Site>();
  const createSiteQuery = useCreateSite(() => {
    createSiteModal.onClose();
  });
  const handleSiteCreate = async () => {
    console.log("createSite", createSite);
    createSiteQuery.mutate({
      name: createSite?.name,
      contactEmail: createSite?.contactEmail,
      contactName: createSite?.contactName,
      contactPhone: createSite?.contactPhone,
      addressLine1: createSite?.addressLine1,
      addressLine2: createSite?.addressLine2,
      city: createSite?.city,
      companyId: user?.companyId,
      clientId: createdClientId,
      postCode: createSite?.postCode,
    });
    setCreatedClientId(undefined);
  };

  //delete
  const handleDelete = () => {
    deleteClient.mutate(deleteClientId);
  };
  const deleteModal = useDisclosure();
  const deleteClient = useClientMutation(() => {
    deleteModal.onClose();
  }, false);
  const [deleteClientId, setDeleteClientId] = useState(0);

  // new Client
  const [modelSection, setModelSection] = useState<string>("NewClient");

  const [activeDrower, setActiveDrower] = useState<string>("createClient");
  const [hovered, setHovered] = useState(false);
  const [vatValue, setVatValue] = useState("");

  const handleVatValue = (option: string) => {
    console.log(option);
    switch (option) {
      case "zeroRate":
        setVatValue("0");
        break;
      case "standardRate":
        setVatValue("20");
        break;
      case "lowRate":
        setVatValue("5");
        break;
      default:
        setVatValue("0");
        break;
    }
  };
  const [showError, setShowError] = useState(false);
  const [showSiteError, setShowSiteError] = useState(false);
  useEffect(() => {
    setCreateClient((prevClient) => ({
      ...prevClient,
      vatValue: vatValue,
    }));
  }, [vatValue]);
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="Neutral.300"
          color="Primary.700"
        />
      </Box>
    );
  }

  return (
    <Card mr={12} mb={5} p={10} boxShadow={"none"}>
      <Tabs w="full">
        <TabPanels>
          <TabPanel>
            <Heading size={"md"} mb={4}>
              Clients
            </Heading>
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
                sheetName={"Clients_List"}
              />

              <Button
                leftIcon={<AddIcon />}
                m={2}
                mr={-1}
                variant="solid"
                size="md"
                onClick={() => {
                  createModal.onOpen();
                  setActiveDrower("createClient");
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
                    <Tr
                      key={index}
                      bg={row.index % 2 !== 0 ? "#FAFAFA" : "white"}
                      style={{ cursor: "pointer" }}
                      _hover={{
                        color: "#4B4B4B",
                        textDecoration: "none",
                        background: "Neutral.200",
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <Td
                          key={cell.id}
                          onClick={() =>
                            navigate(`/settings/clients/${row.original.id}`)
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      ))}

                      <Td>
                        <HStack>
                          {/* <Link to={`/reports/jobQuery/${row.original.id}`}>
                      <IconButton
                        aria-label="Search database"
                        icon={<FaChartPie />}
                        variant={"outline"}
                        size={"sm"}
                        title="Job Queries"
                        m={1}
                      />
                    </Link>
                    <Link to={`/jobs/addjob/${row.original.id}`}>
                      <IconButton
                        aria-label="Search database"
                        icon={<AddIcon />}
                        variant={"outline"}
                        size={"sm"}
                        title="Log new Job"
                        m={1}
                      />
                    </Link> */}

                          <Link
                            to={`/settings/clients/${row.original.id}/assets`}
                          >
                            <IconButton
                              aria-label="Search database"
                              icon={<FaHandHoldingUsd />}
                              variant={"outline"}
                              size={"sm"}
                              title="Assets"
                              m={1}
                            />
                          </Link>

                          <Link
                            to={`/settings/clients/${row.original.id}/sites`}
                          >
                            <IconButton
                              aria-label="Search database"
                              icon={<FaCity />}
                              variant={"outline"}
                              size={"sm"}
                              title="Sites"
                              m={1}
                            />
                          </Link>

                          <Link
                            to={`/settings/clients/${row.original.id}/contacts`}
                          >
                            <IconButton
                              aria-label="Search database"
                              icon={<FaUsers />}
                              variant={"outline"}
                              size={"sm"}
                              title="Contacts"
                              m={1}
                            />
                          </Link>

                          <IconButton
                            aria-label="Search database"
                            onClick={() => {
                              setDeleteClientId(row.original.id ?? 0);
                              deleteModal.onOpen();
                            }}
                            icon={<DeleteIcon />}
                            variant={"outline"}
                            size={"sm"}
                            m={1}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <PaginationTable data={!isLoading && data && data} table={table} />{" "}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* create Modal */}
      <Drawer
        onClose={() => {
          setIsClientCreateModalOpen(false);
          createModal.onClose();
        }}
        isOpen={createModal.isOpen || isClientCreateModalOpen}
        size={{
          base: "sm",
          md: "lg",
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {modelSection == "financialDetails" && (
              <IconButton
                onClick={() => setModelSection("NewClient")}
                aria-label="Search database"
                icon={<MdArrowBack />}
              />
            )}
          </DrawerHeader>
          <DrawerBody>
            <AbsoluteCenter overflowY="auto" maxH="800px">
              {modelSection == "NewClient" && (
                <>
                  <Heading size={"md"} pb={5} color={"teal"}>
                    Create New Client
                  </Heading>
                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <RequiredFormLabel label="Client Code" />

                    <Input
                      value={createClient?.code || ""}
                      className="FormControl"
                      placeholder=""
                      onChange={(e) => {
                        setCreateClient({
                          ...createClient!,
                          code: e.target.value,
                        });
                        setValidateCode(e.target.value);
                      }}
                    />
                  </FormControl>

                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <RequiredFormLabel label="Client Name" />
                    <Input
                      onChange={(e) => {
                        setCreateClient({
                          ...createClient!,
                          name: e.target.value,
                        });
                        setValidateName(e.target.value);
                      }}
                      value={createClient?.name || ""}
                      className="FormControl"
                      placeholder=""
                    />
                  </FormControl>

                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel>Primary Contact Email</FormLabel>
                    <Input
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          primaryContactEmail: e.target.value,
                        })
                      }
                      value={createClient?.primaryContactEmail || ""}
                      className="FormControl"
                      placeholder=""
                    />
                  </FormControl>
                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel>Primary Contact Phone</FormLabel>
                    <Input
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          primaryContactPhone: e.target.value,
                        })
                      }
                      value={createClient?.primaryContactPhone || ""}
                      className="FormControl"
                      placeholder=""
                    />
                  </FormControl>

                  <Button
                    onClick={() => {
                      if (validateCode === "" || validateName === "") {
                        setShowError(true);
                      } else {
                        setShowError(false);
                        setModelSection("financialDetails");
                      }
                    }}
                    w={"full"}
                    my={10}
                  >
                    Next
                  </Button>
                  {showError && (
                    <Text color="red">
                      Please fill out the required fields.
                    </Text>
                  )}
                </>
              )}
              {modelSection == "financialDetails" && (
                <>
                  <Heading my={5} size={"md"} textAlign={"center"}>
                    Financial details
                  </Heading>
                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> Financial Contact Name </FormLabel>

                    <Input
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          primaryFinancialName: e.target.value,
                        })
                      }
                      value={createClient?.primaryFinancialName || ""}
                      className="FormControl"
                      placeholder=""
                    />
                  </FormControl>
                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> Financial Contact Email </FormLabel>
                    <Input
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          primaryFinancialEmail: e.target.value,
                        })
                      }
                      value={createClient?.primaryFinancialEmail || ""}
                      className="FormControl"
                      placeholder=""
                    />
                  </FormControl>

                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> Site Type </FormLabel>
                    <Select
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          siteType: e.target.value,
                        })
                      }
                      value={createClient?.siteType || ""}
                      variant="outline"
                      placeholder=" Select Site Type"
                    >
                      <option value="company">Company</option>
                      <option value="household">Household</option>
                    </Select>
                  </FormControl>
                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> Currency Code </FormLabel>
                    <Select
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          currency: e.target.value,
                        })
                      }
                      value={createClient?.currency || ""}
                      variant="outline"
                      placeholder=" Select currency code"
                    >
                      <option value="aud">AUD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                    </Select>
                  </FormControl>
                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> VAT Rate </FormLabel>
                    <Select
                      onChange={(e) => {
                        handleVatValue(e.target.value);
                        setCreateClient({
                          ...createClient!,
                          vatRate: e.target.value,
                        });
                      }}
                      value={createClient?.vatRate || ""}
                      variant="outline"
                      placeholder=" Select VAT rate"
                    >
                      <option value="zeroRate">Zero Rate</option>
                      <option value="standardRate">Standard Rate</option>
                      <option value="lowRate">Low Rate</option>
                    </Select>
                  </FormControl>

                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> VAT Value </FormLabel>
                    <Input
                      defaultValue={vatValue || ""}
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          vatValue: e.target.value,
                        })
                      }
                      value={createClient?.vatValue || vatValue}
                      className="FormControl"
                      placeholder=""
                    />
                  </FormControl>

                  <FormControl
                    mb={5}
                    w={{
                      base: "sm",
                      lg: "lg",
                    }}
                  >
                    <FormLabel> VAT Number </FormLabel>
                    <Input
                      onChange={(e) =>
                        setCreateClient({
                          ...createClient!,
                          vatNumber: e.target.value,
                        })
                      }
                      value={createClient?.vatNumber || ""}
                      className="FormControl"
                      placeholder=""
                    />
                  </FormControl>

                  <Button onClick={() => handleCreate()} w={"full"} my={10}>
                    Save
                  </Button>
                </>
              )}
            </AbsoluteCenter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Delete Modal  */}
      <DeleteClient
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onDelete={handleDelete}
      />

      {/* create site Modal  */}
      <Drawer
        onClose={createSiteModal.onClose}
        isOpen={createSiteModal.isOpen}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <AbsoluteCenter overflowY="auto" maxH={"calc(100vh - 50px)"}>
              <>
                <Heading my={5} size={"md"}>
                  Add Site Address
                </Heading>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel> Site Name </FormLabel>

                  <Input
                    onChange={(e) => {
                      return setCreateSite({
                        ...createSite,
                        name: e.target.value,
                      });
                    }}
                    value={createSite && createSite!.name!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel> Contact Name </FormLabel>

                  <Input
                    onChange={(e) => {
                      return setCreateSite({
                        ...createSite,
                        contactName: e.target.value,
                      });
                    }}
                    value={createSite && createSite!.contactName!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel> Site Email </FormLabel>
                  <Input
                    onChange={(e) => {
                      return setCreateSite({
                        ...createSite,
                        contactEmail: e.target.value,
                      });
                    }}
                    value={createSite && createSite!.contactEmail!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>

                <FormControl w={"lg"}>
                  <FormLabel> Phone </FormLabel>
                  <Input
                    onChange={(e) => {
                      return setCreateSite({
                        ...createSite,
                        contactPhone: e.target.value,
                      });
                    }}
                    value={createSite && createSite!.contactPhone!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel> Address Line 1 </FormLabel>
                  <Input
                    onChange={(e) => {
                      return setCreateSite({
                        ...createSite,
                        addressLine1: e.target.value,
                      });
                    }}
                    value={createSite && createSite!.addressLine1!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>

                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel> Address Line 2 </FormLabel>
                  <Input
                    onChange={(e) => {
                      return setCreateSite({
                        ...createSite,
                        addressLine2: e.target.value,
                      });
                    }}
                    value={createSite && createSite!.addressLine2!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <RequiredFormLabel label="City" />
                  <Input
                    onChange={(e) => {
                      setCreateSite({
                        ...createSite!,
                        city: e.target.value,
                      });
                      setValidateCity(e.target.value);
                    }}
                    value={createSite && createSite!.city!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>
                <FormControl
                  mb={5}
                  w={{
                    base: "sm",
                    lg: "lg",
                  }}
                >
                  <FormLabel> Postcode</FormLabel>
                  <Input
                    onChange={(e) => {
                      return setCreateSite({
                        ...createSite,
                        postCode: e.target.value,
                      });
                    }}
                    value={createSite && createSite!.postCode!}
                    className="FormControl"
                    placeholder=""
                  />
                </FormControl>
                {showSiteError && (
                  <Text color="red">Please fill out city field.</Text>
                )}
                <Button
                  onClick={() => {
                    if (validateCity === "") {
                      setShowSiteError(true);
                    } else {
                      setShowSiteError(false);
                      handleSiteCreate();
                    }
                  }}
                  w={"full"}
                  my={10}
                >
                  Save
                </Button>
              </>
            </AbsoluteCenter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Card>
  );
};

export default ClientList;
