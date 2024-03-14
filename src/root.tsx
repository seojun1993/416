import AppShell from "@/components/shell/app-shell";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getStudentsQuery } from "./queries/student";
import { lazy, useCallback, useEffect, useRef } from "react";
import Loadable from "./components/common/loadable";
import Stars from "./pages/stars";
import { sendA11yEvent } from "./libs/utils";

const ModeSelect = Loadable(lazy(() => import("@/pages/mode-select")));
const Birthday = Loadable(lazy(() => import("@/pages/birthday")));
const Board = Loadable(lazy(() => import("@/pages/board")));
const Menu = Loadable(lazy(() => import("@/pages/menu")));
const Search = Loadable(lazy(() => import("@/pages/search")));
const SearchResult = Loadable(lazy(() => import("@/pages/search-result")));
const MemoryClass = Loadable(lazy(() => import("@/pages/memory-class")));
const MemoryList = Loadable(lazy(() => import("@/pages/memory-list")));
const MemoryRoad = Loadable(lazy(() => import("@/pages/memory-road")));
const Timeline = Loadable(lazy(() => import("@/pages/timeline")));
const SpaceInfo = Loadable(lazy(() => import("@/pages/space-info")));
const Manual = Loadable(lazy(() => import("@/pages/manual")));

function Root() {
  const location = useLocation();
  useQuery(getStudentsQuery());
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const timeoutId = useRef<NodeJS.Timeout>();

  const keydownHandler: { [key: string]: (event: KeyboardEvent) => void } = {
    Space: (event) => {
      navigate("/");
    },
    Backspace: (event) => {
      navigate("/menu");
    },
    Digit0: () => {
      sendA11yEvent("", true);
    },
  };

  const handleGuideClick = useCallback(() => {
    navigate("/manual");
  }, []);

  const handleKioskButtonClick = (event: KeyboardEvent) => {
    if (Object.hasOwn(keydownHandler, event.code)) {
      event.stopPropagation();
      event.preventDefault();
      keydownHandler[event.code](event);
    }
  };

  useEffect(() => {
    window.addEventListener("manualClick", handleGuideClick);
    document.addEventListener("keydown", handleKioskButtonClick);
    return () => {
      window.removeEventListener("manualClick", handleGuideClick);

      document.removeEventListener("keydown", handleKioskButtonClick);
    };
  }, []);

  // useEffect(() => {
  //   const handleTimeout = () => {
  //     clearTimeout(timeoutId.current);
  //     timeoutId.current = setTimeout(() => {
  //       router("/", { replace: true });
  //     }, 1000 * 60 * 1.5);
  //   };
  //   window.addEventListener("click", handleTimeout);
  //   return () => {
  //     window.removeEventListener("click", handleTimeout);
  //   };
  // }, [pathname]);
  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname ?? "root"}>
          <Route path="" element={<ModeSelect />} />
          <Route path="birthday" element={<Birthday />} />
          <Route path="board" element={<Board />} />
          <Route path="menu" element={<Menu />} />
          <Route path="memory-class" element={<MemoryClass />} />
          <Route path="memory-list" element={<MemoryList />} />
          <Route path="search" element={<Search />} />
          <Route path="stars" element={<Stars />} />
          <Route path="memory-road" element={<MemoryRoad />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="space-info" element={<SpaceInfo />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="manual" element={<Manual />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}

export default Root;
