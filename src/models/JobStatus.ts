import EntityBase from "./EntityBase";

export class JobStatus extends EntityBase {
  name?: string;
  code?: string;

  constructor(name = "", code = "") {
    super();
    this.name = name;
    this.code = code;
  }
}

export default JobStatus;
