import "@/assets/static/styles/index.css";
import { Global, ThemeProvider, useTheme } from "@emotion/react";
import { PropsWithChildren, useLayoutEffect, useRef } from "react";
import style from "@/styles";
import { useSettingStore } from "./contexts/setting.store";
import { useThemeMode } from "./hooks/use-theme-mode";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalLayout = ({ children }: PropsWithChildren) => {
  const [themeMode] = useThemeMode();
  const { zoom, setSignVideoUrl } = useSettingStore();
  const jumja = useRef(
    window.chrome.webview.hostObjects.sync.jumjaplay
  ).current;
  const theme =
    themeMode === "light"
      ? { ...lightTheme, themeMode }
      : { ...darkTheme, themeMode };

  useLayoutEffect(() => {
    const injectKeyboardHandler = () => {
      return function () {
        document.addEventListener("keydown", (event) => {
          const focusableElements = Array.from(
            document.querySelectorAll<HTMLElement>(
              'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            )
          ).filter(
            (el) =>
              el.offsetWidth > 0 &&
              el.offsetHeight > 0 &&
              getComputedStyle(el).visibility !== "hidden"
          );

          if (focusableElements.length === 0) return;
          let nextElement = null; // 다음에 포커스될 요소
          const focusedElement = document.activeElement as HTMLElement;
          if (!focusedElement) {
            nextElement = focusableElements[0];
          } else {
            const currentIndex = focusableElements.indexOf(focusedElement);

            const focusedRect = focusedElement.getBoundingClientRect();

            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
              const currentCenter = {
                x: focusedRect.left + focusedRect.width / 2,
                y: focusedRect.top + focusedRect.height / 2,
              };

              let closestDistance = Infinity;

              focusableElements.forEach((el) => {
                if (el === focusedElement) return;

                const rect = el.getBoundingClientRect();
                const currentCenterY = focusedRect.top + focusedRect.height / 2;
                const elementCenterY = rect.top + rect.height / 2;

                if (
                  event.key === "ArrowDown" &&
                  elementCenterY <= currentCenterY
                )
                  return;
                if (event.key === "ArrowUp" && elementCenterY >= currentCenterY)
                  return;

                const center = {
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                };

                const distance = Math.sqrt(
                  Math.pow(center.x - currentCenter.x, 2) +
                    Math.pow(center.y - currentCenter.y, 2)
                );

                if (distance < closestDistance) {
                  nextElement = el;
                  closestDistance = distance;
                }
              });
            } else if (
              event.key === "ArrowLeft" ||
              event.key === "ArrowRight"
            ) {
              const horizontalMove = event.key === "ArrowLeft" ? -1 : 1;
              const nextIndex = currentIndex + horizontalMove;
              if (nextIndex >= 0 && nextIndex < focusableElements.length) {
                nextElement = focusableElements[nextIndex];
              }
            }
          }

          if (nextElement) {
            if (nextElement.dataset.a11yId) {
              const url = jumja.Play(nextElement.dataset.a11yId);
              if (url) {
                setSignVideoUrl(url);
              }
            }
            nextElement.focus({
              preventScroll: !!nextElement?.dataset.preventScroll,
            });
            event.preventDefault();
          }
        });
      };
    };

    injectKeyboardHandler()();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={style.reset(theme, zoom)} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalLayout;
