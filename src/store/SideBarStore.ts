import { SetState, create } from "zustand";
interface SideBarStore {
  isSideBarCollapsed: boolean;
  setIsSideBarCollapsed: (value: boolean) => void;
}

export const SideBarStore = create<SideBarStore>(
  (set: SetState<SideBarStore>) => ({
    isSideBarCollapsed: false,
    setIsSideBarCollapsed: (value) => set({ isSideBarCollapsed: value }),
  })
);
