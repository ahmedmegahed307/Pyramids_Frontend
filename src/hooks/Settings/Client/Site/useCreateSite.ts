import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Site from "../../../../models/Site";
import { createSite } from "../../../../services/SiteService/siteService";
import useAuthStore from "../../../Authentication/store";

const useCreateSite = (OnClose: () => void) => {
  const queryClient = useQueryClient();
  const{user}=useAuthStore();

  return useMutation<ResponseData, Error, Site>(
    async (site: Site): Promise<ResponseData> => {
      return await createSite(site);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["sitesByClientId"],
        });
        queryClient.invalidateQueries({
          queryKey: ["clientById"],
        });
        Swal.fire({
          title: "Success",
          text: "Site has been Created successfully!",
          icon: "success",
        });
        OnClose();
      },
      onError: (error: any) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useCreateSite;
