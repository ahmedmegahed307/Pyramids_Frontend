import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuthStore from "../../../Authentication/store";
import Contact from "../../../../models/Contact";
import { createContact } from "../../../../services/ContactService/contactService";

const useCreateContact = (OnClose: () => void) => {
  const queryClient = useQueryClient();
  const{user}=useAuthStore();

  return useMutation<ResponseData, Error, Contact>(
    async (contact: Contact): Promise<ResponseData> => {
      return await createContact(contact);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["contactssByClientId"],
        });
        queryClient.invalidateQueries({
          queryKey: ["clientById"],
        });
        queryClient.invalidateQueries({
          queryKey: ["jobCreationData"],
        });
        Swal.fire({
          title: "Success",
          text: "Contact has been Created successfully!",
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

export default useCreateContact;
