import EntityBase from "./EntityBase";
import Product from "./Product";

export class JobSession extends EntityBase {
  travelStart?: Date | null;
  travelEnd?: Date | null;
  workStart?: Date | null;
  workEnd?: Date | null;
  sessionStatus?: string | null;

  constructor() {
    super();
   this.travelStart = new Date();
    this.travelEnd = new Date();
    this.workStart = new Date();
    this.workEnd = new Date();
    this.sessionStatus = "";
    
  }
}

export default JobSession;
