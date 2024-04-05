import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IContract } from "../../models/Interfaces/IContract";
import { createContract } from "../../services/PPM/PPMService";
import { useNavigate } from "react-router-dom";

const useCreateContract = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<ResponseData, Error, IContract>(
    async (contract: IContract): Promise<ResponseData> => {
      return await createContract(contract);
    },
    {
      onSuccess: (response) => {
        console.log("createdContract::", response);
        queryClient.invalidateQueries({
          queryKey: ["contractList"],
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Contract created successfully!",
        });
        setTimeout(() => {
          navigate(`/ppm/contracts/${response.data.id}/edit`);
        }, 1000);
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

export default useCreateContract;
