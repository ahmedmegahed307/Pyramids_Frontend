import EntityBase from "./EntityBase";

export class AssetManufacturer extends EntityBase {
  name?: string;
  code?: string;
  description?: string;

  companyId: number;

  constructor() {
    super();
    this.name = "";
    this.code = "";
    this.description ="";
 
    this.companyId = 0;
  }
}

export default AssetManufacturer;
