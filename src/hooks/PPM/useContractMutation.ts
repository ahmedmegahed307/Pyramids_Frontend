import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IContract } from "../../models/Interfaces/IContract";
import { deleteContract, updateContract } from "../../services/PPM/PPMService";

const useContractMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, IContract | number>(
    async (contract: IContract | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (contract as IContract).id;
        return await updateContract(id ?? 0, contract);
      } else {
        const id = contract as number;
        return await deleteContract(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["contractList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["contractById"],
        });

        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Contract has been updated successfully!"
            : "Contract has been deleted successfully!",
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

export default useContractMutation;
