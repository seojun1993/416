import "@/assets/static/styles/index.css";
import { Global, ThemeProvider } from "@emotion/react";
import { PropsWithChildren, useEffect, useRef } from "react";
import style from "@/styles";
import { useSettingStore } from "./contexts/setting.store";
import { useThemeMode } from "./hooks/use-theme-mode";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalLayout = ({ children }: PropsWithChildren) => {
  const [themeMode] = useThemeMode();
  const { zoom, setSignVideoUrl, setKioskCode } = useSettingStore();
  const jumja = useRef(
    window?.chrome?.webview?.hostObjects?.sync?.jumjaplay
  ).current;
  const theme =
    themeMode === "light"
      ? { ...lightTheme, themeMode }
      : { ...darkTheme, themeMode };

  function isCustomEvent(event: Event): event is CustomEvent {
    return "detail" in event;
  }
  const handleA11y = (event: Event) => {
    if (isCustomEvent(event)) {
      const url = jumja?.Play(event.detail);
      setSignVideoUrl(url ?? "");
    }
  };
  useEffect(() => {
    window.addEventListener("a11y", handleA11y);
    if (jumja) {
      {
        setKioskCode(jumja.GetKioskCode());
      }
    }
    return () => {
      window.removeEventListener("a11y", handleA11y);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={style.reset(theme, zoom)} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
