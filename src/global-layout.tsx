import "@/assets/static/styles/index.css";
import { Global, ThemeProvider, useTheme } from "@emotion/react";
import { PropsWithChildren } from "react";
import style from "@/styles";
import { useSettingStore } from "./contexts/setting.store";
import { useThemeMode } from "./hooks/use-theme-mode";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalLayout = ({ children }: PropsWithChildren) => {
  const [themeMode] = useThemeMode();
  const theme = useTheme();
  const { zoom } = useSettingStore();
  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <Global styles={style.reset(zoom)} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
