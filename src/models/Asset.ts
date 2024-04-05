import EntityBase from "./EntityBase";


export class Asset extends EntityBase {
  serialNo?: string;
  tagNo?: string;
  quantity?: number;
  description?: string;
  assetTypeId?: number;
  assetManufacturerId?: number;
  assetModelId?: number;
  companyId?: number;
  clientId?: number;
  siteId?: number;


  constructor(
    serialNo?: string,
    tagNo?: string,
    quantity?: number,
    description?: string,
    assetTypeId?: number,
    assetManufacturerId?: number,
    assetModelId?: number,
    companyId?: number,
    clientId?: number,
    siteId?: number,
    
   
  ) {
    super();
   
    this.serialNo = serialNo;
    this.tagNo = tagNo;
    this.quantity = quantity;
    this.description = description;
    this.assetTypeId = assetTypeId;
    this.assetManufacturerId = assetManufacturerId;
    this.assetModelId = assetModelId;
    this.companyId = companyId;
    this.clientId = clientId;
    this.siteId = siteId;
  }
}

