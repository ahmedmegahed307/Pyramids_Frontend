import { EntityBase } from "./EntityBase";
import Site from "./Site";

export class Contact extends EntityBase {
  name?: string;
  email?: string;
  phone?: string;
  contactType?:string;
  clientId?: number;
  siteId?: number;
  site?:Site;



  constructor(
    name?: string,
    email?: string,
    phone?: string,
    contactType?:string,
    clientId?: number,
    siteId?: number,
  ) {
    super();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.contactType = contactType;
    this.clientId = clientId;
    this.siteId = siteId;
  }
}


export default Contact;
