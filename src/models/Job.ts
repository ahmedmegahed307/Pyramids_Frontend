import { Checklist } from "./Checklist";
import Client from "./Client";
import Contact from "./Contact";
import { EntityBase } from "./EntityBase";
import JobAction from "./JobAction";
import JobAttachment from "./JobAttachment";
import JobIssue from "./JobIssue";
import JobPart from "./JobPart";
import JobSession from "./JobSession";
import JobStatus from "./JobStatus";
import JobSubType from "./JobSubType";
import JobType from "./JobType";
import Priority from "./Priority";
import Site from "./Site";
import User from "./User";

export class Job extends EntityBase {
  public companyId?: number;
  public clientId?: number | null;
  public siteId?: number | null;
  public contactId?: number | null;
  public addressId?: number | null;
  public jobTypeId?: number | null;
  public jobSubTypeId?: number | null;
  public description?: string | null;
  public cancelReason?: string | null;
  public instruction?: string | null;
  public engineerId?: number | null;
  public techComments?: string | null;
  public jobStatusId?: number | null;
  public jobPriorityId?: number | null;
  public jobDate?: Date | null;
  public scheduleDateEnd?: string | null;
  public assignedDate?: Date | null;
  public modifiedDate?: Date | null;
  public estimatedDuration?: number | null;
  public jobType?: JobType | null;
  public jobSubType?: JobSubType | null;
  public client?: Client | null;
  public contact?: Contact | null;
  public site?: Site | null;
  public engineer?: User | null;
  public jobPriority?: Priority | null;
  public jobParts?: JobPart[] | null;
  public checkists?: Checklist[] | null;
  public jobSessions?: JobSession[] | null;
  public jobStatus?: JobStatus | null;
  public jobIssueCreateDto?: any[] | null;
  filesToUpload?: File[] | null;
  public jobActions?: JobAction[] | null;
  public jobIssues?: JobIssue[] | null;
  public jobAttachments?: JobAttachment[] | null;

  constructor(
    companyId?: number,
    clientId?: number | null,

    siteId?: number | null,
    contactId?: number | null,
    addressId?: number | null,
    jobTypeId?: number | null,
    jobSubTypeId?: number | null,
    description?: string | null,
    cancelReason?: string | null,
    instruction?: string | null,
    engineerId?: number | null,
    techComments?: string | null,
    jobStatusId?: number | null,
    jobPriorityId?: number | null,
    jobDate?: Date | null,
    scheduleDateEnd?: string | null,
    assignedDate?: Date | null,
    modifiedDate?: Date | null,
    estimatedDuration?: number | null,
    jobType?: JobType | null,
    client?: Client | null,
    contact?: Contact | null,
    site?: Site | null,
    engineer?: User | null,
    jobPriority?: Priority | null,
    jobStatus?: JobStatus | null,
    id?: number,
    jobParts?: JobPart[] | null,
    jobIssues?: JobIssue[] | null,
    jobIssueCreateDto?: any[] | null,
    filesToUpload?: File[] | null,
    jobActions?: JobAction[] | null,
    jobAttachments?: JobAttachment[] | null
  ) {
    super();
    this.companyId = companyId;
    this.clientId = clientId;
    this.siteId = siteId;
    this.contactId = contactId;
    this.addressId = addressId;
    this.jobTypeId = jobTypeId;
    this.jobSubTypeId = jobSubTypeId;
    this.description = description;
    this.cancelReason = cancelReason;
    this.instruction = instruction;
    this.engineerId = engineerId;
    this.techComments = techComments;
    this.jobStatusId = jobStatusId;
    this.jobPriorityId = jobPriorityId;
    this.jobDate = jobDate;
    this.scheduleDateEnd = scheduleDateEnd;
    this.assignedDate = assignedDate;
    this.modifiedDate = modifiedDate;
    this.estimatedDuration = estimatedDuration;
    this.jobType = jobType;
    this.client = client;
    this.contact = contact;
    this.site = site;
    this.engineer = engineer;
    this.jobPriority = jobPriority;
    this.jobStatus = jobStatus;
    this.id = id;
    this.jobParts = jobParts;
    this.jobIssueCreateDto = jobIssueCreateDto;
    this.filesToUpload = filesToUpload;
    this.jobActions = jobActions;
    this.jobIssues = jobIssues;
    this.jobAttachments = jobAttachments;
  }
}
