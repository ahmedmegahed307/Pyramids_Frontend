import { Asset } from "./Asset";
import EntityBase from "./EntityBase";

export class JobIssue extends EntityBase {
  //for local data
  issue?: string;
  asset?:Asset;
  assetId?: number;
  assetName?:string;
  priority?: string;
  jobId?: number;
  //for server data
  description?: string;
  jobIssuePriority?: string;

  constructor() {
    super();
     
    this.issue = "";
    this.assetId = 0;
    this.assetName = "";
    this.priority = "";
    this.jobId = 0;

 
  }
}

export default JobIssue;
