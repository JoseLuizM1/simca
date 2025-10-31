import { create } from "zustand";

type NoticeState = {
  notice: any;
  setNotice: (newNotice: any) => void;
};

export const useNoticeStore = create<NoticeState>((set) => ({
  notice: null,
  setNotice: (newNotice) => set({ notice: newNotice }),
}));

type MobileMenuState = {
  mobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
};

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  mobileOpen: false,
  setMobileOpen: (isOpen) => set({ mobileOpen: isOpen }),
}));