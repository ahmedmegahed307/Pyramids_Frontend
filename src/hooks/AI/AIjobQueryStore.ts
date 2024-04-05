import { create, SetState } from "zustand";
import { Job } from "../../models/Job";

interface AIjobQueryStore {
  isAISearch: boolean;
  jobsList: Job[];
  setIsAISearch: (value: boolean) => void;
  setJobQueryResult: (jobsList: Job[]) => void;
}

export const useJobQueryStore = create<AIjobQueryStore>(
  (set: SetState<AIjobQueryStore>) => ({
    isAISearch: false,
    jobsList: [],
    setIsAISearch: (value) => set({ isAISearch: value }),
    setJobQueryResult: (results) => set({ jobsList: results }),
  })
);
