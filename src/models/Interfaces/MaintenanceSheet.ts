import JobSubType from "../JobSubType";

export interface MaintenanceSheet {
    id?: number;
    title?: string;
    visibleOn?: string;
    mandatory?: boolean;
    isActive?: boolean;
    subtypes?:JobSubType[];
    }