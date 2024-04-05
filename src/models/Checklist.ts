import Company from "./Company";
import { EntityBase } from "./EntityBase";

export class Checklist extends EntityBase {
    title?: string;
    required?: boolean = true;
    companyId?: number;
    description?: string;
    completed?: boolean = false;
    
    // Virtual relationships
    company?: Company;

    constructor(
    ) {
        super();
       this.title = "";
       this.required = true;
       this.companyId = 0;
        this.description = "";
         this.completed = false;

    }
}