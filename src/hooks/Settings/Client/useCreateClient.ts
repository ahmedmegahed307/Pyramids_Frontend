import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Client from "../../../models/Client";
import useAuthStore from "../../Authentication/store";
import { createClient } from "../../../services/ClientService/clientService";

const useCreateClient = (
  OnClose: () => void,
  setClientId: (id: number) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Client>(
    async (Client: Client): Promise<ResponseData> => {
      return await createClient(Client);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["clientList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["jobCreationData"],
        });
        setClientId(response.data.id);

        // Swal.fire({
        //   title: "Success",
        //   text: "Client has been Created successfully!",
        //   icon: "success",
        // });
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

export default useCreateClient;
