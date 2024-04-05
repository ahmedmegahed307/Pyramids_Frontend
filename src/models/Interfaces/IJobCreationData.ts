import Client from "../Client";
import Contact from "../Contact";
import JobSubType from "../JobSubType";
import JobType from "../JobType";
import Priority from "../Priority";
import Site from "../Site";
import User from "../User";

export interface JobCreationData {
  clients: Client[];
  sites: Site[];
  engineers: User[];
  jobTypes: JobType[];
  jobSubTypes: JobSubType[];
  priorities: Priority[];
  contacts:Contact[];
}
