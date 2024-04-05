import { EntityBase } from "./EntityBase";
import Site from "./Site";

export class Address extends EntityBase {
 addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?:string;
  postCode?: string;



  constructor(
   
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    country?:string,
    postCode?: string,
  ) {
    super();
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.city = city;
    this.country = country;
    this.postCode = postCode;
    
  }
}


export default Address;
