export interface Scheduler {
    event?: SchedulerEvent;
    job?: SchedulerJob;
};
export interface SchedulerEvent {
    id?: number;
    companyId: number;
    eventType?: string;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    employees?: Employee[];

};
export interface Employee {
    id?: number;
    name?: string;
};

export interface SchedulerJob {
    id: number;
    eventType?: string;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    clientId?: number;
    clientName?: string;
    siteId?: number;
    siteName?: string;
    contactId?: number;
    contactName?: string;
    jobTypeId: number;
    jobTypeName?: string;
    jobSubTypeId?: number;
    jobSubTypeName?: string;
    engineerId?: number;
    engineerName?: string;
    jobStatusId?: number;
    jobStatusName?: string;
    scheduleDateEnd?: Date;
    estimatedDuration?: number;
};