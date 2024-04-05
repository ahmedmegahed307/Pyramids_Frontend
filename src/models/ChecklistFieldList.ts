import { Checklist } from "./Checklist";
import { ChecklistFieldType } from "./ChecklistFieldType";
import EntityBase from "./EntityBase";

export class ChecklistFieldList extends EntityBase {
    name: string;
    order: number;
    checklistId: number;
    checklistFieldTypeId: number;
    required: boolean = false;
    initialValue: string | null;
    
    // Virtual relationships
    checklist?: Checklist;
    checklistFieldType?: ChecklistFieldType;

    constructor(
        name = "",
        order = 0,
        checklistId = 0,
        checklistFieldTypeId = 0,
        required: boolean = false,
        initialValue: string | null = null
    ) {
        super();
        this.name = name;
        this.order = order;
        this.checklistId = checklistId;
        this.checklistFieldTypeId = checklistFieldTypeId;
        this.required = required;
        this.initialValue = initialValue;
    }
}