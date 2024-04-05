import { create, SetState } from "zustand";

interface ClientStore {
  isClientCreateModalOpen: boolean;
  setIsClientCreateModalOpen: (value: boolean) => void;
}

export const useClientStore = create<ClientStore>(
  (set: SetState<ClientStore>) => ({
    isClientCreateModalOpen: false,
    setIsClientCreateModalOpen: (value) =>
      set({ isClientCreateModalOpen: value }),
  })
);
