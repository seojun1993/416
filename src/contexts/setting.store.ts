import { create } from "zustand";

import type { StateCreator } from "zustand";
export type ThemeMode = "light" | "dark";
export type UserMode = "normal" | "sound" | "sign";

export interface ZoomSlice {
  zoom: number;
  setZoom: (zoom: number) => void;
}
interface ThemeSlice {
  theme: ThemeMode;
  toggleTheme: () => void;
}
interface UserModeSlice {
  mode: UserMode;
  changeMode: (mode: UserMode) => void;
}

interface SoundSlice {
  volumeRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  selectedVolumeIndex: number;
  soundActivate: boolean;
  setSoundActivate: (state: boolean) => void;
  setVolumnAction: (prevVol: number) => void;
}

interface SignSlice {
  signActivate: boolean;
  setSignActivate: (state: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
}

interface CombineUserModeSlice {
  onChangeMode: (mode: UserMode) => void;
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
const createUserModeSlice: StateCreator<UserModeSlice> = (set, get) => ({
  mode: "normal",
  changeMode: (mode) => set({ mode }),
});

const createCombineUserModeSlice: StateCreator<
  UserModeSlice & SignSlice & SoundSlice,
  [],
  [],
  CombineUserModeSlice
> = (set, get) => ({
  onChangeMode(mode) {
    switch (mode) {
      case "sign":
        get().setSignActivate(true);
        break;
      case "sound":
        get().setSignActivate(false);
        get().setSoundActivate(true);
        break;
      case "normal":
      default:
        get().setSignActivate(false);
    }

    get().changeMode(mode);
  },
});

const createSignLangSlice: StateCreator<SignSlice> = (set) => ({
  signActivate: false,
  setSignActivate: (state) => set({ signActivate: state }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  speed: 1.5,
  setSpeed: (speed) => set({ speed }),
});
const createSoundSlice: StateCreator<SoundSlice> = (set, get) => ({
  volumeRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  selectedVolumeIndex: 5,
  soundActivate: true,
  setSoundActivate: (state) => set({ soundActivate: state }),
  setVolumnAction: (vol) => {
    if (typeof get().volumeRange[vol] === "number") {
      set({ selectedVolumeIndex: vol });
    }
  },
});

export const useSettingStore = create<
  ZoomSlice &
    ThemeSlice &
    SignSlice &
    UserModeSlice &
    SoundSlice &
    CombineUserModeSlice
>()((...a) => ({
  ...createThemeSlice(...a),
  ...createZoomSlice(...a),
  ...createSignLangSlice(...a),
  ...createUserModeSlice(...a),
  ...createSoundSlice(...a),
  ...createCombineUserModeSlice(...a),
}));
