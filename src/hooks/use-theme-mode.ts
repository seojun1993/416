import { shallow } from "zustand/shallow";
import { Theme, useSettingStore } from "@/contexts/setting.store";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
export const useThemeMode = () => {
  const theme = useTheme();
  return useStoreWithEqualityFn(
    useSettingStore,
    (state) => {
      document.body.style.backgroundColor = theme.color?.background?.secondary;

      return [state.theme, state.toggleTheme] as [Theme, () => void];
    },
    shallow
  );
};
