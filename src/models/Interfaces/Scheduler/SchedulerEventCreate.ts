export interface SchedulerEventCreate {
  companyId: number;
  eventType?: string;
  title?: string;
  startDate: string;
  endDate: string;
  description?: string;
  employeesId?: string;
  createdByUserId?: number;
}
