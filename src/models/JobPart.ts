import EntityBase from "./EntityBase";
import Product from "./Product";

export class JobPart extends EntityBase {
  quantity?: number;
  name?: string;
  cost?: string;
  product?: Product;
  productId?: number;
  jobId?: number;

  constructor() {
    super();
    this.name = "";
    this.cost = "";
    this.quantity = 0;
    this.productId = 0;
    this.jobId = 0;
  }
}

export default JobPart;
