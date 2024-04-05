import { create } from "zustand";
import JobType from "../../../models/JobType";

interface JobTypeStore {
  updateJobTypeId: number;
  setUpdateJobType: (id: number) => void;
  updateJobTypeInput: JobType;
  setUpdateJobTypeInput: (input: JobType) => void;
}

const useJobTypeStore = create<JobTypeStore>((set) => ({
  updateJobTypeId: 0,
  updateJobTypeInput: { id: 0, isActive: true, name: "", jobSubTypeId: 0 },
  setUpdateJobType: (id) => set({ updateJobTypeId: id }),
  setUpdateJobTypeInput: (input) => set({ updateJobTypeInput: input }),
}));

export default useJobTypeStore;
