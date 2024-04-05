import CreatedByUser from "./CreatedByUser";
import EntityBase from "./EntityBase";
import JobActionType from "./JobActionType";

export class JobAction extends EntityBase {
  source?: string;
  actionDate?: Date;
  comments?: string;
  createdByUser?: CreatedByUser;
  jobActionType?: JobActionType;
  jobActionTypeId?: number;
  jobId: number;
  constructor() {
    super();
    this.source = "";
    this.actionDate = new Date();
    this.comments = "";
    this.createdByUser = new CreatedByUser();
    this.jobActionType = new JobActionType();
    this.jobActionTypeId = 0;
    this.jobId = 0;
  }
}

export default JobAction;
