import {
  FormControl,
  FormLabel,
  // Select,
  useDisclosure,
  HStack,
  Button,
  Drawer,
} from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import { MdAdd } from "react-icons/md";
import Site from "../../../models/Site";
import CreateSite from "./CreateSite";
import Swal from "sweetalert2";
import { useState } from "react";
import { Select } from "chakra-react-select";

type SiteSelectProps = FormValidation & {
  sites: Site[];
  selectedClientId: string;
  setSelectedSite: (site: number) => void;
};

const SiteSelect = ({
  register,
  sites,
  setSelectedSite,
  selectedClientId,
}: SiteSelectProps) => {
  const createSiteModal = useDisclosure();
  const handleSiteChange = (selectedSite) => {
    setSelectedSite(selectedSite.value);
  };
  console.log("selectedClientId::", selectedClientId);
  return (
    <>
      <FormControl w={"full"}>
        <HStack justify={"space-between"} w={"full"} m={0} p={0}>
          <FormLabel>Sites</FormLabel>
          {/* <Button
            onClick={() => {
              if (selectedClientId == "") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "You must select a client first!",
                });
                return;
              }
              createSiteModal.onOpen();
            }}
            variant={"link"}
            leftIcon={<MdAdd />}
          >
            Add new site
          </Button> */}
        </HStack>

        <Select
          placeholder="Select Site"
          selectedOptionColorScheme="Primary"
          {...register("siteId")}
          options={
            sites?.map((client) => {
              return {
                label: client.name,
                value: client.id,
              };
            }) || []
          }
          onChange={handleSiteChange}
        />
      </FormControl>

      {/* create client modal */}
      {/* <Drawer
        onClose={createSiteModal.onClose}
        isOpen={createSiteModal.isOpen}
        size={"lg"}
      >
        <CreateSite
          createSiteModal={createSiteModal}
          selectedClientId={parseInt(selectedClientId)}
        />
      </Drawer> */}
    </>
  );
};

export default SiteSelect;
