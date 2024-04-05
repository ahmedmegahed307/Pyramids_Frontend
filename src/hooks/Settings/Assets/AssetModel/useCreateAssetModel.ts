import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AssetModel from "../../../../models/AssetModel";
import { createAssetModel } from "../../../../services/AssetService/AssetModelService/assetModelService";

const useCreateAssetModel = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, AssetModel>(
    async (assetModel: AssetModel): Promise<ResponseData> => {
      return await createAssetModel(assetModel);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assetModelList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "AssetModel has been Created successfully!",
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

export default useCreateAssetModel;
