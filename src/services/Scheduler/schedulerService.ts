import { SchedulerEventCreate } from "../../models/Interfaces/Scheduler/SchedulerEventCreate";
import Api from "../api-fetch";

export const GetScheduler = async ({ queryKey }: any) => {
  const [, { isActive, companyId }] = queryKey;
  const SchedulerApi = new Api<any>("/Scheduler/GetScheduler");

  const response = await SchedulerApi.getAll(isActive, companyId);
  return response.data;
};

export const createEvent = async (eventData: SchedulerEventCreate) => {
  const eventCreateApi = new Api<any>("/Scheduler/CreateEvent");

  const newEvent = await eventCreateApi.post(eventData);
  return newEvent;
};

export const updateEvent = async (id: number, updatedData: any) => {
  const eventUpdateApi = new Api<any>("/Scheduler/UpdateEvent");

  const updatedEvent = await eventUpdateApi.update(id, updatedData);
  return updatedEvent;
};

export const deleteEvent = async (eventId: number): Promise<ResponseData> => {
  const eventDeleteApi = new Api<any>("/Scheduler/DeleteEvent");

  const responseData = await eventDeleteApi.delete(eventId);
  return responseData;
};
