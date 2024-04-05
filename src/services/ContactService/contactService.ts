import Contact from "../../models/Contact";
import Api from "../api-fetch";


const contactApi = new Api<any>("/Contact");


export const getAllContacts = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const contacts = await contactApi.getAll(isActive, companyId);
  return contacts.data;
};


export const getAllContactsByClientId = async (clientId: number): Promise<Contact[]> => {
  const queryParams = {
    clientId: clientId
   
  };
  const contactsApi = new Api<any>("/Contact/GetAllContactsByClientId");
  const contacts = await contactsApi.get(queryParams);
  return contacts.data;
};



export const createContact = async (contactData: Contact) => {
  const newContact = await contactApi.post(contactData);
  return newContact;
};

export const updateContact = async (contactId: number, updatedData: any) => {
  const updatedContact = await contactApi.update(contactId, updatedData);
  return updatedContact;
};

export const deleteContact = async (contactId: number): Promise<ResponseData> => {
  const responseData = await contactApi.delete(contactId);
  return responseData;
};

