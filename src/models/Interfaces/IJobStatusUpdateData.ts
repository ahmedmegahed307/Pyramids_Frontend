

export interface IJobStatusUpdateData {
  jobStatusId: number;
  jobId: number;
  engineerId?: number;
  cancelReason?: string;
}
