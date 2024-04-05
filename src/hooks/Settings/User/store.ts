import  {create, SetState } from 'zustand';

interface UserStore {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
}

export const useUserStore = create<UserStore>((set: SetState<UserStore>) => ({
  isCreateModalOpen: false,
  setIsCreateModalOpen: (value) => set({ isCreateModalOpen: value }),
}));
