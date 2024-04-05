import EntityBase from "./EntityBase";

export class ChecklistFieldType extends EntityBase {
    name: string;
    typeCode: string;

    constructor(
        name = "",
        typeCode = ""
    ) {
        super();
        this.name = name;
        this.typeCode = typeCode;
    }
}
