import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Asset } from "../../../../models/Asset";
import { deleteAsset, updateAsset } from "../../../../services/AssetService/MainAssetService/mainAssetService";


const useAssetMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Asset | number>(
    async (asset: Asset | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (asset as Asset).id;
        return await updateAsset(id ?? 0, asset);
      } else {
        const id = asset as number;
        return await deleteAsset(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["clientById"],
        });
        queryClient.invalidateQueries({
          queryKey: ["assetsBySiteId"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Asset has been updated successfully!"
            : "Asset has been deleted successfully!",
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

export default useAssetMutation;
