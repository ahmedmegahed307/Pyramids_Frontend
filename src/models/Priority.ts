import { EntityBase } from "./EntityBase";

export class Priority extends EntityBase {
  name?: string;
  code?: string;

  constructor(name = "", code = "") {
    super();
    this.name = name;
    this.code = code;
  }
}

export default Priority;
