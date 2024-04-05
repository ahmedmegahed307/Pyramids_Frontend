import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AssetManufacturer from "../../../../models/AssetManufacturer";
import { deleteAssetManufacturer, updateAssetManufacturer } from "../../../../services/AssetService/AssetManufacturerService/assetManufacturerService";


const useAssetManufacturerMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, AssetManufacturer | number>(
    async (assetManufacturer: AssetManufacturer | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (assetManufacturer as AssetManufacturer).id;
        return await updateAssetManufacturer(id ?? 0, assetManufacturer);
      } else {
        const id = assetManufacturer as number;
        return await deleteAssetManufacturer(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetManufacturerList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "AssetManufacturer has been updated successfully!"
            : "AssetManufacturer has been deleted successfully!",
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

export default useAssetManufacturerMutation;
