import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Site from "../../../../models/Site";
import {
  deleteSite,
  updateSite,
} from "../../../../services/SiteService/siteService";

const useSiteMutation = (onUpdateOrDelete: () => void, isUpdate: boolean) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Site | number>(
    async (site: Site | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (site as Site).id;
        return await updateSite(id ?? 0, site);
      } else {
        const id = site as number;
        return await deleteSite(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["clientList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["clientById"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Site has been updated successfully!"
            : "Site has been deleted successfully!",
          icon: "success",
        });
        onUpdateOrDelete();
      },
      onError: (error: any) => {
        console.log("errorssss", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useSiteMutation;
