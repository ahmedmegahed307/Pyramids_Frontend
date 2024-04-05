import { Asset } from "./Asset";
import { Checklist } from "./Checklist";
import { ChecklistFieldType } from "./ChecklistFieldType";
import EntityBase from "./EntityBase";
import { Job } from "./Job";
import User from "./User";

export class ChecklistData extends EntityBase {
    checklistId: number;
    checklistFieldTypeId: number;
    engineerId: number;
    assetId: number | null;
    jobId: number | null;
    value: string;

    // Virtual relationships
    checklistFieldType?: ChecklistFieldType;
    checklist?: Checklist;
    engineer?: User;
    asset?: Asset;
    job?: Job;

    constructor(
        checklistId = 0,
        checklistFieldTypeId = 0,
        engineerId = 0,
        value = "",
        assetId: number | null = null,
        jobId: number | null = null
    ) {
        super();
        this.checklistId = checklistId;
        this.checklistFieldTypeId = checklistFieldTypeId;
        this.engineerId = engineerId;
        this.value = value;
        this.assetId = assetId;
        this.jobId = jobId;
    }
}