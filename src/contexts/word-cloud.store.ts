import { create } from "zustand";

export interface UserStore {
  user: string[];
  setUser: (users: string[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: [],
  setUser: (users) => set((prev) => ({ ...prev, user: users })),
}));
