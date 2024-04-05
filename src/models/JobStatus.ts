import EntityBase from "./EntityBase";

export class JobStatus  extends EntityBase {
    statusCode?: string;
    status?: string;

    constructor(
        statusCode = "",
        status = "",
    ) {
        super();
        this.statusCode = statusCode;
        this.status = status;
    }
}

export default JobStatus;
