import { FieldErrors } from "react-hook-form";
import { EditJobValidation } from "./EditJobMain";

export interface FormValidation {
    register: any;
    errors: FieldErrors<EditJobValidation>;
}