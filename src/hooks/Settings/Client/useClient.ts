import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../Authentication/store";
import { getAllClients } from "../../../services/ClientService/clientService";
import Client from "../../../models/Client";

const useClient = () => {
  const { user } = useAuthStore();

  return useQuery<Client[], Error>({
    queryKey: ["clientList", { isActive: true, companyId: user?.companyId }],
    queryFn: getAllClients,
  });
};

export default useClient;
