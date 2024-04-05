import { EntityBase } from "./EntityBase";
import WareHouse from "./WareHouse";

export class Product extends EntityBase {
    code?: string;
    name?: string;
    description?: string;
    standardPrice?:number;
    jobPrice?:number;
    serialControlled?:boolean;
    categoryId?:number;
    brand?:string;
    companyId?: number;
    quantity?: number;
    warehouse?:WareHouse;

    constructor() {
        super();
        this.code = "";
        this.name = "";
        this.description = "";
        this.companyId = 0;
        this.standardPrice = 0;
        this.jobPrice = 0;
        this.serialControlled = false;
        this.categoryId = 0;
        this.brand = "";
        this.quantity = 0;
        this.warehouse = new WareHouse();
   
    }
}

export default Product;
