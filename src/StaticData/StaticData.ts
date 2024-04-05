import { OptionBase } from "chakra-react-select";
import Client from "../models/Client";
import User from "../models/User";

//this file is for static data that rarely change and doesn't require backend configuration.
export const PMFrequencyList = [
  { name: "Daily", value: "1" },
  { name: "Weekly", value: "7" },
  { name: "Monthly", value: "30" },
  { name: "Quarterly", value: "120" },
  { name: "Semi-Annual", value: "180" },
  { name: "Annual", value: "360" },
];
export const EventType = [
  { label: "Annual Leave", value: "AL" },
  { label: "Meeting", value: "Meeting" },
  { label: "Job", value: "Job" },
];

export interface ColorOption extends OptionBase {
  label: string;
  value: string;
}
//#B3CCCE  , #80D5DB ,#E1F296
export const eventTypeOptions = [
  {
    label: "Annual Leave",
    value: "AL",
    colorScheme: "Primary",
  },
  {
    label: "Meeting",
    value: "Meeting",
    colorScheme: "Primary",
  },
  {
    label: "Job",
    value: "Job",
    colorScheme: "Primary",
  },
];

export enum FieldTypes {
  HEADER = "HEADER",
  SUBHEADER = "SUBHEADER",
  CHECKBOX = "CHECKBOX",
  TEXTBOX = "TEXTBOX",
  DROPBOX = "DROPBOX",
  IMAGE = "IMAGE",
}
export interface userProps {
  user: User | undefined;
}
export interface clientProps {
  client: Client | undefined;
}
export const workdayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// reports
interface Option {
  value: string;
  label: string;
}

export const filterOptions: FilterOption[] = [
  { label: "All jobs", value: "All jobs" },
  { label: "Open jobs", value: "Open" },
  { label: "Assigned jobs", value: "Assigned" },
  { label: "Resolved jobs", value: "Resolved" },
  { label: "Closed jobs", value: "Closed" },
  { label: "Cancelled jobs", value: "Cancelled" },
  { label: "Pending jobs", value: "Pending" },
];
export const Priority: Option[] = [
  { value: "1", label: "Low " },
  { value: "2", label: "Medium" },
  { value: "3", label: "High" },
];
export const DateType: Option[] = [
  { value: "NONE", label: "NONE " },
  { value: "LOGGED", label: "Logged Date " },
  { value: "SCHEDULED", label: "Scheduled Date" },
  { value: "RESOLVED", label: "Resolved Date" },
  { value: "ASSIGNED", label: "Assigned Date" },
  { value: "CLOSED", label: "Closed Date" },
  { value: "CANCELLED", label: "Cancelled Date" },
];

export const Status: Option[] = [
  { value: "1", label: "Open" },
  { value: "2", label: "Assigned" },
  { value: "3", label: "Pending" },
  { value: "4", label: "Resolved" },
  { value: "5", label: "Cancelled" },
  { value: "6", label: "Closed" },
];

//job
type JobStatusStatic =
  | "Open"
  | "Assigned"
  | "Pending"
  | "Resolved"
  | "Closed"
  | "Cancelled";
export type FilterOption = {
  label: string;
  value: JobStatusStatic | "All jobs";
};
