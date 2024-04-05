import { useQuery } from "@tanstack/react-query";
import Site from "../../../../models/Site";
import { getAllSitesByClientId } from "../../../../services/SiteService/siteService";
import useAuthStore from "../../../Authentication/store";

const useGetSitesByClientId = (clientId: number) => {
  console.log("clientId::", clientId);
  return useQuery<Site[], Error>(["sitesByClientId", { clientId }], () =>
    getAllSitesByClientId(clientId)
  );
};

export default useGetSitesByClientId;
