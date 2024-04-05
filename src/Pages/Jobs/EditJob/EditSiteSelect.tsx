import { FormControl, FormLabel, Select, Spinner } from "@chakra-ui/react";
import { FormValidation } from "./FormValidation";
import Site from "../../../models/Site";
import { useEffect, useState } from "react";

type SiteSelectProps = FormValidation & {
  defaultValue: number;
  sites: Site[];
  selectedClientId: number;
};

const EditSiteSelect = ({
  register,
  sites,
  defaultValue,
  selectedClientId,
}: SiteSelectProps) => {
  const [selectedSiteId, setSelectedSiteId] = useState<number>(defaultValue);
  useEffect(() => {
    setSelectedSiteId(defaultValue);
  }, [defaultValue]);

  if (!sites) {
    return (
      <FormControl width={"400px"}>
        <FormLabel>Sites</FormLabel>
        <Spinner
          size="md"
          thickness="4px"
          speed="0.65s"
          emptyColor="Neutral.300"
          color="Primary.700"
        />
      </FormControl>
    );
  }

  return (
    <>
      <FormControl w={"full"}>
        <FormLabel>Sites</FormLabel>

        <Select
          value={selectedSiteId}
          size={"md"}
          {...register("siteId")}
          variant="outline"
          placeholder="Select Client Site"
          onChange={(e) => setSelectedSiteId(parseInt(e.target.value))}
        >
          {sites?.map((address, index) => {
            return (
              <option value={address.id} key={index}>
                {address.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default EditSiteSelect;
