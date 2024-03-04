import { create } from "zustand";

import type { StateCreator } from "zustand";
export type ThemeMode = "light" | "dark";
export type UserMode = "normal" | "sound" | "sign";
export const zooms = [
  { value: 1, text: "x1" },
  { value: 1.2, text: "x1.2" },
  { value: 1.5, text: "x1.5" },
];

export const VideoSpeeds = [
  {
    text: "느리게",
    value: 1,
  },

  {
    text: "보통",
    value: 1.5,
  },
  {
    text: "빠르게",
    value: 2,
  },
];
export const SoundSpeed = [
  {
    text: "느리게",
    value: 1,
  },

  {
    text: "보통",
    value: 1.5,
  },
  {
    text: "빠르게",
    value: 2,
  },
];

export type tooltipMode =
  | "sign"
  | "text"
  | "sound"
  | "speed"
  | null
  | undefined;

export interface TooltipSlice {
  tooltipMode: tooltipMode;
  setTooltipMode: (mode: tooltipMode) => void;
}

export interface ZoomSlice {
  zoom: number;
  setZoom: (fn: (idx: number) => number) => void;
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
  soundSpeed: { text: string; value: number }[];
  selectedVolumeIndex: number;
  selectedSoundSpeedIndex: number;
  soundActivate: boolean;
  setSoundSpeed: (fn: (idx: number) => number) => void;
  setSoundActivate: (state: boolean) => void;
  setVolumnAction: (prevVol: number) => void;
}

interface SignSlice {
  signVideoUrl: string;
  setSignVideoUrl: (url: string) => void;
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

let timeoutId: NodeJS.Timeout;
const createTooltipSlice: StateCreator<TooltipSlice> = (set) => ({
  tooltipMode: undefined,
  setTooltipMode(mode) {
    set({ tooltipMode: mode });

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      set({ tooltipMode: null });
    }, 5000000);
  },
});

const createZoomSlice: StateCreator<
  ZoomSlice & TooltipSlice,
  [],
  [],
  ZoomSlice
> = (set, get) => ({
  zoom: 1,
  setZoom: (fn: (idx: number) => number) => {
    get().setTooltipMode("text");
    const zoomIndex = fn(zooms.findIndex((z) => z.value === get().zoom));
    if (zooms[zoomIndex]?.value) {
      set({ zoom: zooms[zoomIndex].value });
    }
  },
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
    get().changeMode(mode);
  },
});

const createSignLangSlice: StateCreator<SignSlice> = (set) => ({
  signVideoUrl: "",
  setSignVideoUrl: (url) => set({ signVideoUrl: url }),
  signActivate: false,
  setSignActivate: (state) => set({ signActivate: state }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  speed: 1.5,
  setSpeed: (speed) => set({ speed }),
});
const createSoundSlice: StateCreator<
  SoundSlice & TooltipSlice,
  [],
  [],
  SoundSlice
> = (set, get) => ({
  volumeRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  selectedVolumeIndex: 5,
  selectedSoundSpeedIndex: 0,
  soundSpeed: SoundSpeed,
  soundActivate: true,
  setSoundActivate: (state) => set({ soundActivate: state }),
  setSoundSpeed: (fn) => {
    const soundIndex = fn(get().selectedSoundSpeedIndex);
    get().setTooltipMode("speed");
    if (get().soundSpeed[soundIndex]?.value) {
      set({ selectedSoundSpeedIndex: soundIndex });
    }
  },
  setVolumnAction: (vol) => {
    get().setTooltipMode("sound");
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
    CombineUserModeSlice &
    TooltipSlice
>()((...a) => ({
  ...createThemeSlice(...a),
  ...createZoomSlice(...a),
  ...createSignLangSlice(...a),
  ...createUserModeSlice(...a),
  ...createSoundSlice(...a),
  ...createCombineUserModeSlice(...a),
  ...createTooltipSlice(...a),
}));
