import { create } from "zustand";

import type { StateCreator } from "zustand";
export type Theme = "light" | "dark";

export interface ZoomSlice {
  zoom: number;
  setZoom: (zoom: number) => void;
}
interface ThemeSlice {
  theme: Theme;
  toggleTheme: () => void;
}

const createZoomSlice: StateCreator<ZoomSlice> = (set) => ({
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
});

const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: "light",
  toggleTheme: () =>
    set((prev) => ({ theme: prev.theme === "light" ? "dark" : "light" })),
});

export const useSettingStore = create<ZoomSlice & ThemeSlice>()((...a) => ({
  ...createThemeSlice(...a),
  ...createZoomSlice(...a),
}));
