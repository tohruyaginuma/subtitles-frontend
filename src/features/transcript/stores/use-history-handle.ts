import { create } from "zustand";

type HistoryHandleStore = {
  historySetId: string | null;
  setHistorySetId: (id: string) => void;
  resetHistorySetId: () => void;
};

export const useHistoryHandleStore = create<HistoryHandleStore>((set) => ({
  historySetId: null,
  setHistorySetId: (id) => set({ historySetId: id }),
  resetHistorySetId: () => set({ historySetId: null }),
}));
