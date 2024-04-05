import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Client from "../../../models/Client";

import {
  deleteClient,
  updateClient,
} from "../../../services/ClientService/clientService";

const useClientMutation = (onUpdateOrDelete: () => void, isUpdate: boolean) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Client | number>(
    async (Client: Client | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (Client as Client).id;
        return await updateClient(id ?? 0, Client);
      } else {
        const id = Client as number;
        return await deleteClient(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["clientList"],
        });

        queryClient.invalidateQueries({
          queryKey: ["clientById"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Client has been updated successfully!"
            : "Client has been deleted successfully!",
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

export default useClientMutation;
