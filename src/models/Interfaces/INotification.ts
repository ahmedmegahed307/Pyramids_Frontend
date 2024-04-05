export interface INotification {
  id?: number;
  message?: string;
  userFullName?: string;
  createdByUserId?: number;
  companyId?: number;
  isActive?: boolean;
  createdAt?: Date;
}
