import { IReminder } from "./IReminder";
import { IVisit } from "./IVisit";

export interface IContract {
  id?: number;
  contractRef?: string;
  companyId?: number;
  jobTypeId?: number;
  jobTypeName?: string;
  jobSubTypeId?: number;
  jobSubTypeName?: string;
  description?: string;
  clientId?: number;
  clientName?: string;
  status?: string;
  billingType?: string;
  startDate?: string;
  expiryDate?: string;
  modifiedDate?: string;
  nextVisitDate?: string;
  frequencyType?: number;
  estimatedDurationMinutes?: number;
  contractCharge?: number;
  isActive?: boolean;
  visits?:IVisit[];
  reminders?:IReminder[];
}
