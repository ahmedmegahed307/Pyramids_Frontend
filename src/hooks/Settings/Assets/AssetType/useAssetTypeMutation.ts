import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AssetType from "../../../../models/AssetType";
import { deleteAssetType, updateAssetType } from "../../../../services/AssetService/AssetTypeService/assetTypeService";


const useAssetTypeMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, AssetType | number>(
    async (assetType: AssetType | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (assetType as AssetType).id;
        return await updateAssetType(id ?? 0, assetType);
      } else {
        const id = assetType as number;
        return await deleteAssetType(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetTypeList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "AssetType has been updated successfully!"
            : "AssetType has been deleted successfully!",
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

export default useAssetTypeMutation;
