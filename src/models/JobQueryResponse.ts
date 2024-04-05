
export interface JobQueryResponse {
    jobId: number;
    jobDate: Date;
    scheduleDateEnd: Date;
    assignedDate: Date;
    estimatedDuration: number;
    description: string;
    clientId: number;
    clientName: string;
    jobTypeId: number;
    jobTypeName: string;
    jobSubTypeId: number;
    jobSubTypeName: string;
    engineerId: number;
    engineerName: string;
    priorityId: number;
    priorityName: string;
    statusId: number;
    statusName: string;
    site: JobQuerySiteResponse;
}
interface JobQuerySiteResponse {
    name: string;
    addressLine1: string;
    addressLine2: string;
}