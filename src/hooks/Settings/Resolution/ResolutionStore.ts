import { create } from "zustand";

interface ResolutionStore {
  updateResolutionInput: string;
  updateResolutionId: number;
  deleteResolutionId: number;
  setUpdateResolutionInput: (input: string) => void;
  setUpdateResolutionId: (id: number) => void;
  setDeleteResolutionId: (id: number) => void;
}

const useResolutionStore = create<ResolutionStore>((set) => ({
  updateResolutionInput: "",
  updateResolutionId: 0,
  deleteResolutionId: 0,
  setUpdateResolutionInput: (input) => set({ updateResolutionInput: input }),
  setUpdateResolutionId: (id) => set({ updateResolutionId: id }),
  setDeleteResolutionId: (id) => set({ deleteResolutionId: id }),
}));

export default useResolutionStore;
