import { SetState, create } from "zustand";
interface AICheckCreateJobInfoStore {
  isConfirmCreateJobPopUp: boolean;
  jobInfoFromBackend:any;
  setIsConfirmCreateJobPopUp: (value: boolean) => void;
  setJobInfoResult: (job: any) => void;
}

export const AICheckCreateJobInfoStore = create<AICheckCreateJobInfoStore>(
  (set: SetState<AICheckCreateJobInfoStore>) => ({
    isConfirmCreateJobPopUp: false,
    jobInfoFromBackend: null,
    setIsConfirmCreateJobPopUp: (value) => set({ isConfirmCreateJobPopUp: value }),
    setJobInfoResult: (endpointResult) => set({ jobInfoFromBackend: endpointResult }),
  })
);
