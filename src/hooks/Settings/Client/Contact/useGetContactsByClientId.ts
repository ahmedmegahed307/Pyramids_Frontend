import { useQuery } from "@tanstack/react-query";
import { getAllContactsByClientId } from "../../../../services/ContactService/contactService";
import Contact from "../../../../models/Contact";

const useGetContactsByClientId = (clientId: number) => {
  return useQuery<Contact[], Error>(
    ["contactsByClientId", { clientId }],
    () => getAllContactsByClientId(clientId)
  );
};

export default useGetContactsByClientId;
