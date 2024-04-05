import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteContact, updateContact } from "../../../../services/ContactService/contactService";
import Contact from "../../../../models/Contact";

const useContactMutation = (onUpdateOrDelete: () => void, isUpdate: boolean) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Contact | number>(
    async (contact: Contact | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (contact as Contact).id;
        return await updateContact(id ?? 0, contact);
      } else {
        const id = contact as number;
        return await deleteContact(id);
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
            ? "Contact has been updated successfully!"
            : "Contact has been deleted successfully!",
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

export default useContactMutation;
