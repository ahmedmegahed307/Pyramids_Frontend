import { EntityBase } from "./EntityBase";

export class AssetModel extends EntityBase {
    code?: string;
    name?: string;
    description?: string;
    companyId?: number;
  
    constructor(type = "") {
        super();
        this.code = "";
        this.name = "";
        this.description = "";
        this.companyId = 0;
       
    }
}

export default AssetModel;
