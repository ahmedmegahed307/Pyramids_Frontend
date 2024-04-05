export interface IVisit {

   id?: string;
    genVisitId?: string;
    clientName?: string;
    contractRef?: string;
    jobId?: number;
    engineerName?: string;
    jobStatus?: string;
    description?: string;
    companyId?: number;
    isGenerated?: boolean;
    visitDate?: string;
    generatedDate?: string;
    generatedByUserId?: number;
    invoiceRow?: boolean;
    isActive?: boolean;
}