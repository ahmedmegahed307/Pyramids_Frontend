import User from "../../models/User";
import Api from "../api-fetch";

const UserApi = new Api<any>("/User");

// Fetch all Users
export const getAllUsers = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;

  const Users = await UserApi.getAll(isActive, companyId);
  return Users.data;
};
export const getAllEngineers = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const getAllEngineers = new Api<any>("/User/GetEngineers");

  const Engineers = await getAllEngineers.getAll(isActive, companyId);
  return Engineers.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const GetByIdApi = await new Api<any>('/User/'+id).getAll(); 
  return GetByIdApi.data;
};


export const getCurrentUser = async () => {
  const response = await new Api<any>("/User/GetCurrentUser/").getAll();
  return response.data;
};

// Fetch a specific User by ID
export const getUserByEmail = async (email: string) => {
  const GetByEmailApi = new Api<any>("/User/GetUserByEmail");
  const User = await GetByEmailApi.get({ email: email });
  return User;
};

// Update a User
export const updateUser = async (UserId: number, updatedData: any) => {
  const updatedUser = await UserApi.update(UserId, updatedData);
  return updatedUser;
};
export const restoreUser = async (UserId: number) => {
  const restoreUser = new Api<any>("/User/restore");
  const restoredUser = await restoreUser.restore(UserId);
  return restoredUser;
};

// Delete a User

export const deleteUser = async (
  ResolutionId: number
): Promise<ResponseData> => {
  const responseData = await UserApi.delete(ResolutionId);
  return responseData;
};

export const createUser = async (userData: any) => {
  const newUser = await UserApi.post(userData);
  return newUser;
};

export const updateUserPhoto = async (userId:number,file: File) => {
  const formData = new FormData();
  formData.append("userPhoto", file);

  const userPhotoAPI = new Api<any>(`/User/${userId}/UploadPhoto`);
  const newPhoto = await userPhotoAPI.updateMultiForm(null,formData);
 return newPhoto;
};
