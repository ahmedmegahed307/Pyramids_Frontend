import EntityBase from "./EntityBase";
import { Job } from "./Job";

export class JobAttachment extends EntityBase {

  //for local side
  url?: string;
  type?: string;
  name?: string;
  // for server side
  job?:Job;
  fileName?: string;
  fileURL?: string;
  fileType?: string;
  jobId?: number;
  fileToUpload?: File;


  constructor() {
    super();
    this.name = "";
    this.type = "";
    this.url = "";
    this.job = new Job();
    this.fileName = "";
    this.fileURL = "";
    this.fileType = "";
    this.jobId = 0;
  }
}

export default JobAttachment;
