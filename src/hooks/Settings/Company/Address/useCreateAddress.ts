import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Address from "../../../../models/Address";
import { createAddress } from "../../../../services/AddressService/addressService";

const useCreateAddress = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Address>(
    async (address: Address): Promise<ResponseData> => {
      return await createAddress(address);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["addressList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["companyById"],
        });
        Swal.fire({
          title: "Success",
          text: "Address has been Created successfully!",
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

export default useCreateAddress;
