import { EntityBase } from "./EntityBase";

export class Priority extends EntityBase {
  priority?: string;
  constructor(
  

    priority?: string
  ) {
    super();

    this.priority = priority;
 
  }
}

export default Priority;
