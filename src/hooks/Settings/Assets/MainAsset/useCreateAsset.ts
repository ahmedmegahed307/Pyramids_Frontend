import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Asset } from "../../../../models/Asset";
import { createAsset } from "../../../../services/AssetService/MainAssetService/mainAssetService";

const useCreateAsset = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Asset>(
    async (asset: Asset): Promise<ResponseData> => {
      return await createAsset(asset);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["assetsBySiteId"],
        });
        queryClient.invalidateQueries({
          queryKey: ["clientById"],
        });
       
        // handle success
        Swal.fire({
          title: "Success",
          text: "Asset has been Created successfully!",
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

export default useCreateAsset;
