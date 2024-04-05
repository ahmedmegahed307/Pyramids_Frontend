import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AssetType from "../../../../models/AssetType";
import { createAssetType } from "../../../../services/AssetService/AssetTypeService/assetTypeService";

const useCreateAssetType = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, AssetType>(
    async (assetType: AssetType): Promise<ResponseData> => {
      return await createAssetType(assetType);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetTypeList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "AssetType has been Created successfully!",
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

export default useCreateAssetType;
