import { EntityBase } from "./EntityBase";
import JobSubType from "./JobSubType";

export class JobType extends EntityBase {
  name?: string;
  companyId?: number;
  jobSubTypes?: JobSubType[];
  constructor(
    id: number = 0,
    createdAt: Date = new Date(),
    isDeleted: boolean = false,
    isActive: boolean = true,
    createdByUserId: number,
    name?: string
  ) {
    super(id, createdAt, isDeleted, isActive, createdByUserId);

    this.name = name;
    this.companyId = 0;
  }
}

export default JobType;
