import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AssetManufacturer from "../../../../models/AssetManufacturer";
import { createAssetManufacturer } from "../../../../services/AssetService/AssetManufacturerService/assetManufacturerService";

const useCreateAssetManufacturer = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, AssetManufacturer>(
    async (assetManufacturer: AssetManufacturer): Promise<ResponseData> => {
      return await createAssetManufacturer(assetManufacturer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetManufacturerList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "AssetManufacturer has been Created successfully!",
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

export default useCreateAssetManufacturer;
