import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Address from "../../../../models/Address";
import { deleteAddress, updateAddress } from "../../../../services/AddressService/addressService";


const useAddressMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Address | number>(
    async (Address: Address | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (Address as Address).id;
        return await updateAddress(id ?? 0, Address);
      } else {
        const id = Address as number;
        return await deleteAddress(id);
      }
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
          text: isUpdate
            ? "Address has been updated successfully!"
            : "Address has been deleted successfully!",
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

export default useAddressMutation;
