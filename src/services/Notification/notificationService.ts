import { INotification } from "../../models/Interfaces/INotification";
import Api from "../api-fetch";

const notificationApi = new Api<any>("/Notification");

export const getAllNotificationes = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const response = await notificationApi.getAll(isActive, companyId);
  return response.data;
};

export const updateNotification = async (
  notificationId: number,
  updatedData: any
) => {
  const updatedNotification = await notificationApi.update(
    notificationId,
    updatedData
  );
  return updatedNotification;
};


export const deleteNotification = async (
  notificationId: number
): Promise<ResponseData> => {
  const responseData = await notificationApi.delete(notificationId);
  return responseData;
};

export const createNotification = async (notificationData: INotification) => {
  const newNotification = await notificationApi.post(notificationData);
  return newNotification;
};
