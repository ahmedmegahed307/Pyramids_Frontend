import { FieldErrors } from "react-hook-form";
import { JobValidation } from "./CreateJobMain";

export interface FormValidation {
    register: any;
    errors: FieldErrors<JobValidation>;
}