import {create} from 'zustand';

interface JobSubTypeStore {
  updateJobSubTypeId: number;
  setUpdateJobSubType: (id: number) => void;
  updateJobSubTypeInput: string;
  setUpdateJobSubTypeInput: (input: string) => void;


}

const useJobSubTypeStore = create<JobSubTypeStore>((set) => ({
    updateJobSubTypeId: 0,
    updateJobSubTypeInput:"",
    setUpdateJobSubType: (id) => set({ updateJobSubTypeId: id }),
    setUpdateJobSubTypeInput: (input) => set({ updateJobSubTypeInput: input }),

}));

export default useJobSubTypeStore;