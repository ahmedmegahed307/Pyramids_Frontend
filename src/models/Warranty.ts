import { EntityBase } from "./EntityBase";

export class Warranty extends EntityBase {
    warrantyStartDate: Date = new Date();
    warrantyEndDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 3));

    constructor(
        warrantyStartDate: Date = new Date(),
        warrantyEndDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 3))
    ) {
        super();
        this.warrantyStartDate = warrantyStartDate;
        this.warrantyEndDate = warrantyEndDate;
    }
}

export default Warranty;
