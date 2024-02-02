import { useCallback } from "react";
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

interface SignSlice {
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
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

const signLangSlice: StateCreator<SignSlice> = (set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  speed: 1.5,
  setSpeed: (speed) => set({ speed }),
});

export const useSettingStore = create<ZoomSlice & ThemeSlice & SignSlice>()(
  (...a) => ({
    ...createThemeSlice(...a),
    ...createZoomSlice(...a),
    ...signLangSlice(...a),
  })
);
