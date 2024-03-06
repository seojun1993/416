/** @jsxImportSource @emotion/react */
import "./vitals.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./root";
import GlobalLayout from "./global-layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AudioProvider from "./components/Audio-provider.tsx";
import { sendA11yEvent } from "./libs/utils.ts";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <GlobalLayout>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Root />} />
          </Routes>
        </BrowserRouter>
        <AudioProvider />
      </GlobalLayout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
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
        focusableElements[0].focus();
      }
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

          if (event.key === "ArrowDown" && elementCenterY <= currentCenterY)
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
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const horizontalMove = event.key === "ArrowLeft" ? -1 : 1;
        const nextIndex = currentIndex + horizontalMove;
        if (nextIndex >= 0 && nextIndex < focusableElements.length) {
          nextElement = focusableElements[nextIndex];
        }
      }

      if (nextElement) {
        nextElement.focus({
          preventScroll: !!nextElement?.dataset.preventScroll,
        });
        event.preventDefault();
      }
    });

    window.addEventListener(
      "focusin",
      (event) => {
        console.log(`[FOCUS-IN TRIGGERED]`);
        const a11yId = (event.target as HTMLElement)?.dataset?.a11yId;
        if (a11yId) {
          console.log(`[SEND A11Y ID] : ${a11yId}`);
          sendA11yEvent(a11yId);
        }
      },
      { passive: true }
    );
  };
};

injectKeyboardHandler()();
