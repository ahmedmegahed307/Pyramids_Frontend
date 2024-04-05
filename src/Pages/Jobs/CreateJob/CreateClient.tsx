import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  AbsoluteCenter,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";
import Client from "../../../models/Client";
import useCreateClient from "../../../hooks/Settings/Client/useCreateClient";
import useAuthStore from "../../../hooks/Authentication/store";
interface ClientProps {
  createClientModal: any;
}
const CreateClient = ({ createClientModal }: ClientProps) => {
  const { user } = useAuthStore();
  const [validateCode, setValidateCode] = useState("");
  const [showError, setShowError] = useState(false);

  const [validateName, setValidateName] = useState("");
  const [validateCity, setValidateCity] = useState("");
  const [modelSection, setModelSection] = useState("NewClient");
  const [vatValue, setVatValue] = useState("");

  const [createClient, setCreateClient] = useState<Client>({});
  useEffect(() => {
    setCreateClient((prevClient) => ({
      ...prevClient,
      vatValue: vatValue,
    }));
  }, [vatValue]);
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
  const [createdClientId, setCreatedClientId] = useState<number>(0);

  const createClientQuery = useCreateClient(() => {
    createClientModal.onClose();
  }, setCreatedClientId);
  const handleCreate = () => {
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
  };
  return (
    <Drawer
      onClose={() => {
        createClientModal.onClose();
      }}
      isOpen={createClientModal.isOpen}
      size={"lg"}
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
          <AbsoluteCenter overflowY="auto" maxH="700px" px={2}>
            {modelSection == "NewClient" && (
              <>
                <Heading size={"md"}>Create New Client</Heading>

                <Divider my={5} />
                <FormControl pb={5} w={"md"}>
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

                <FormControl pb={5} w={"md"}>
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

                <FormControl pb={5} w={"md"}>
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
                <FormControl pb={5} w={"md"}>
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
                  <Text color="red">Please fill out the required fields.</Text>
                )}
              </>
            )}
            {modelSection == "financialDetails" && (
              <>
                <Heading my={5} size={"md"}>
                  Financial details
                </Heading>
                <FormControl pb={5} w={"md"}>
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
                <FormControl pb={5} w={"md"}>
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

                <FormControl pb={10} w={"md"}>
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
                <FormControl pb={10} w={"md"}>
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
                <FormControl pb={10} w={"md"}>
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

                <FormControl pb={5} w={"md"}>
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

                <FormControl pb={5} w={"md"}>
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
  );
};

export default CreateClient;
