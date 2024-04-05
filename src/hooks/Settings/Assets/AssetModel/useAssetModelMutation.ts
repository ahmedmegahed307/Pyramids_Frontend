import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AssetModel from "../../../../models/AssetModel";
import { deleteAssetModel, updateAssetModel } from "../../../../services/AssetService/AssetModelService/assetModelService";


const useAssetModelMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, AssetModel | number>(
    async (assetModel: AssetModel | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (assetModel as AssetModel).id;
        return await updateAssetModel(id ?? 0, assetModel);
      } else {
        const id = assetModel as number;
        return await deleteAssetModel(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetModelList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "AssetModel has been updated successfully!"
            : "AssetModel has been deleted successfully!",
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

export default useAssetModelMutation;
