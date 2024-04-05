import { useQuery } from "@tanstack/react-query";
import User from "../../../models/User";
import { getClientById } from "../../../services/ClientService/clientService";
import Client from "../../../models/Client";


const useGetClientById = (id: number) => {
  return useQuery<Client, Error>(
    ["clientById", { id }],
    () => getClientById(id)
  );
};

export default useGetClientById;
