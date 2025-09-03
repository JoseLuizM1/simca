import { create } from "zustand";

type NoticeState = {
  notice: any;
  setNotice: (newNotice: any) => void;
};

export const useNoticeStore = create<NoticeState>((set) => ({
  notice: null,
  setNotice: (newNotice) => set({ notice: newNotice }),
}));