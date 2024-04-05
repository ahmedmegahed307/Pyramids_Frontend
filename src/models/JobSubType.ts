import { EntityBase } from "./EntityBase";
import JobType from "./JobType";

export class JobSubType extends EntityBase {
  name?: string;
  jobTypeId?: number;
  jobType?: JobType;
  companyId?: number;
  constructor(
    name?: string,
    jobTypeId?: number,
    jobType?: JobType,
    companyId?: number
  ) {
    super();

    this.name = name;
    this.jobTypeId = jobTypeId;
    this.jobType = jobType;
    this.companyId = companyId;
  }
}

export default JobSubType;
