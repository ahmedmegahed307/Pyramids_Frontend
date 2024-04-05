import Client from "../../models/Client";
import Api from "../api-fetch";

const ClientApi = new Api<any>("/Client");

// Fetch all Clients
export const getAllClients = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const Clients = await ClientApi.getAll(isActive, companyId);
  return Clients.data;
};
export const getClientById = async (id: number): Promise<Client> => {
  const GetByIdApi = await new Api<any>('/Client/'+id).getAll(); 
  return GetByIdApi.data;
};
// Updatet
export const updateClient = async (ClientId: number, updatedData: any) => {
  const updatedClient = await ClientApi.update(ClientId, updatedData);
  return updatedClient;
};

// Delete
export const deleteClient = async (ClientId: number): Promise<ResponseData> => {
  const responseData = await ClientApi.delete(ClientId);
  return responseData;
};
//Create
export const createClient = async (ClientData: Client) => {
  const newClient = await ClientApi.post(ClientData);
  return newClient;
};
