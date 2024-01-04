import { shallow } from "zustand/shallow";
import { Theme, useSettingStore } from "@/contexts/setting.store";
import { useStoreWithEqualityFn } from "zustand/traditional";
export const useThemeMode = () => {
  return useStoreWithEqualityFn(
    useSettingStore,
    (state) => [state.theme, state.toggleTheme] as [Theme, () => void],
    shallow
  );
};
