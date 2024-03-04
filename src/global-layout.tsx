import "@/assets/static/styles/index.css";
import { Global, ThemeProvider, useTheme } from "@emotion/react";
import { PropsWithChildren } from "react";
import style from "@/styles";
import { useSettingStore } from "./contexts/setting.store";
import { useThemeMode } from "./hooks/use-theme-mode";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalLayout = ({ children }: PropsWithChildren) => {
  const [themeMode] = useThemeMode();
  const { zoom } = useSettingStore();
  const theme =
    themeMode === "light"
      ? { ...lightTheme, themeMode }
      : { ...darkTheme, themeMode };
  return (
    <ThemeProvider theme={theme}>
      <Global styles={style.reset(theme, zoom)} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
