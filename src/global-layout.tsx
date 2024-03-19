import "@/assets/static/styles/index.css";
import { Global, ThemeProvider } from "@emotion/react";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import style from "@/styles";
import { useSettingStore } from "./contexts/setting.store";
import { useThemeMode } from "./hooks/use-theme-mode";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalLayout = ({ children }: PropsWithChildren) => {
  const [themeMode] = useThemeMode();
  const {
    zoom,
    setSignVideoUrl,
    setKioskCode,
    clear,
    setVolumnAction,
    volumeRange,
  } = useSettingStore();
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

  const handleClear = useCallback(() => {
    clear();
  }, []);

  const handleA11y = (event: Event) => {
    if (isCustomEvent(event)) {
      const url = jumja?.Play(event.detail);
      setSignVideoUrl(url ?? "");
    }
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    window.addEventListener("a11y", handleA11y);
    window.addEventListener("webClearEvent", handleClear);
    if (jumja) {
      const HARD_VOLUME: { [key: string]: number } = {
        K001: 50,
        K002: 25,
        K003: 25,
      };

      const kioskCode = jumja.GetKioskCode() ?? "K001";
      setKioskCode(kioskCode);

      let count = 0;
      setTimeout(() => {
        intervalId = setInterval(() => {
          if (count > 3) {
            clearInterval(intervalId);
          } else {
            const vol = volumeRange.findIndex(
              (item) => item === HARD_VOLUME[kioskCode]
            );
            if (vol >= -1) {
              count += 3;
              setVolumnAction(vol);
            }
          }
          count++;
        }, 1000);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("a11y", handleA11y);
      window.removeEventListener("webClearEvent", handleClear);
    };
  }, [jumja]);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={style.reset(theme, zoom)} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
