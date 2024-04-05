import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useFormContext } from "react-hook-form";
import Client from "../../../models/Client";
import Site from "../../../models/Site";
import RequiredFormLabel from "../../RequiredFields/RequiredFormLabel";

interface CombinedSiteSelectProps {
  label: string;
  clients: Client[];
  sites: Site[];
  onSelect: (value: string) => void;
  register: any;
  errors: any;
}

const CombinedSiteSelect = ({
  label,
  clients,
  sites,
  onSelect,
  register,
  errors,
}: CombinedSiteSelectProps) => {
  const [selectedClient, setSelectedClient] = useState(0);
  const [selectedSite, setSelectedSite] = useState(0);

  const handleClientChange = (selectedClient) => {
    setSelectedClient(selectedClient.value);
    setSelectedSite(0);
    onSelect(`${selectedClient.value}/${0}`);
  };

  const handleSiteChange = (selectedSite) => {
    setSelectedSite(selectedSite.value);
    onSelect(`${selectedClient}/${selectedSite.value}`);
  };

  const options = clients.flatMap((client) => {
    const clientSites = sites.filter((site) => site.clientId === client.id);

    if (clientSites.length > 0) {
      return clientSites.map((site) => ({
        label: `${client.name}/${site.name}`,
        value: `${client.id}/${site.id}`,
      }));
    }

    // Include the client even if there are no sites
    return [{ label: client.name, value: `${client.id}/0` }];
  });

  return (
    <FormControl isInvalid={errors.clientId !== undefined}>
      <RequiredFormLabel label={label} />

      <Select
        size={{
          base: "md",
          md: "md",
          lg: "lg",
        }}
        useBasicStyles
        placeholder="Select Client/Site"
        selectedOptionColorScheme="Primary"
        {...register("clientId")}
        options={options}
        onChange={(selectedOption) => {
          if (selectedOption && (selectedOption as any).value !== undefined) {
            if ((selectedOption as any).value > 0) {
              handleClientChange(selectedOption);
            } else {
              handleSiteChange(selectedOption);
            }
          }
        }}
      />
      <FormErrorMessage>
        {errors.clientId && errors.clientId.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CombinedSiteSelect;
