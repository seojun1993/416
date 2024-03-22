import { create } from "zustand";

import type { StateCreator } from "zustand";
export type ThemeMode = "light" | "dark";
export type UserMode = "normal" | "sound" | "wheel" | "sign";
export const zooms = [
  { value: 1.1, text: "x1.5" },
  { value: 1.05, text: "x1.2" },
  { value: 1, text: "x1.0" },
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
    text: "x1.5",
    value: 10,
  },

  {
    text: "x1.2",
    value: 7,
  },
  {
    text: "x1.0",
    value: 5,
  },
];

export type tooltipMode =
  | "sign"
  | "text"
  | "sound"
  | "speed"
  | null
  | undefined;

export interface KioskSettingSlice {
  kioskCode: string;
  setKioskCode: (kioskCode: string) => void;
}

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
  volumeRange: number[];
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

interface CombineAllSlice {
  clear: () => void;
}

const createCombineAllSlice: StateCreator<
  KioskSettingSlice &
    ZoomSlice &
    ThemeSlice &
    SignSlice &
    UserModeSlice &
    SoundSlice &
    CombineUserModeSlice &
    TooltipSlice,
  [],
  [],
  CombineAllSlice
> = (set, get) => ({
  clear: () => {
    const { setSoundSpeed, setVolumnAction, setZoom, soundSpeed, changeMode } =
      get();
    changeMode("sound");
    setVolumnAction(get().volumeRange.length - 2);
    setZoom(() => 1);
    setSoundSpeed(() => soundSpeed.length - 1);
  },
});

const createKioskSettingSlice: StateCreator<KioskSettingSlice> = (set) => ({
  kioskCode: "K001",
  setKioskCode: (kioskCode) => kioskCode && set({ kioskCode }),
});
let timeoutId: NodeJS.Timeout;
const createTooltipSlice: StateCreator<TooltipSlice> = (set) => ({
  tooltipMode: undefined,
  setTooltipMode(mode) {
    set({ tooltipMode: mode });

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      set({ tooltipMode: null });
    }, 5000);
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
    if (mode === "sound") {
      if (get().selectedVolumeIndex === get().volumeRange.length - 1) {
        get().setVolumnAction(get().volumeRange.length - 2);
      }
    } else {
      get().setVolumnAction(get().volumeRange.length - 1);
    }
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

export const INITIAL_VOL_INDEX = 3;

const createSoundSlice: StateCreator<
  SoundSlice & TooltipSlice,
  [],
  [],
  SoundSlice
> = (set, get) => ({
  volumeRange: [100, 75, 50, 25, 0],
  selectedVolumeIndex: INITIAL_VOL_INDEX,
  selectedSoundSpeedIndex: SoundSpeed.length - 1,
  soundSpeed: SoundSpeed,
  soundActivate: true,
  setSoundActivate: (state) => set({ soundActivate: state }),
  setSoundSpeed: (fn) => {
    const soundIndex = fn(get().selectedSoundSpeedIndex);
    get().setTooltipMode("speed");
    if (get().soundSpeed[soundIndex]?.value) {
      set({ selectedSoundSpeedIndex: soundIndex });
      const jumja = window?.chrome?.webview?.hostObjects?.sync?.jumjaplay;

      if (jumja) {
        jumja.SetAudioSpeed(
          get().soundSpeed[soundIndex]?.value ?? get().soundSpeed[soundIndex]
        );
      }
    }
  },
  setVolumnAction: (vol) => {
    if (typeof get().volumeRange[vol] === "number") {
      set({ selectedVolumeIndex: vol });
      const audio = window?.chrome?.webview?.hostObjects?.sync?.audiocontrol;
      if (audio) {
        audio.SetVolume(get().volumeRange[vol]);
      }
      console.log("VOLUME ACTIONS");
    }
  },
});

export const useSettingStore = create<
  KioskSettingSlice &
    ZoomSlice &
    ThemeSlice &
    SignSlice &
    UserModeSlice &
    SoundSlice &
    CombineUserModeSlice &
    TooltipSlice &
    CombineAllSlice
>()((...a) => ({
  ...createKioskSettingSlice(...a),
  ...createThemeSlice(...a),
  ...createZoomSlice(...a),
  ...createSignLangSlice(...a),
  ...createUserModeSlice(...a),
  ...createSoundSlice(...a),
  ...createCombineUserModeSlice(...a),
  ...createTooltipSlice(...a),
  ...createCombineAllSlice(...a),
}));
