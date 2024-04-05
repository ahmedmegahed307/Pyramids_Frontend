import { create } from "zustand";
interface PageTitleStore {
  pageTitle: string | null;
  setPageTitle: (pageTitle: string) => void;
  updatePageTitle: (pageTitle: string) => void;

}

const usePageTitleStore = create<PageTitleStore>((set) => ({
    pageTitle: null,
  
    setPageTitle: (pageTitle) => set({ pageTitle }),
    updatePageTitle: (pageTitle) => set(state => ({ pageTitle: pageTitle })),
}));

export default usePageTitleStore;
