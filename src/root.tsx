import AppShell from "@/components/shell/app-shell";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getStudentsQuery } from "./queries/student";
import { lazy } from "react";
import Loadable from "./components/common/loadable";
import Stars from "./pages/stars";

const ModeSelect = Loadable(lazy(() => import("@/pages/mode-select")));
const OnBoard = Loadable(lazy(() => import("@/pages/onboard")));
const Board = Loadable(lazy(() => import("@/pages/board")));
const Menu = Loadable(lazy(() => import("@/pages/menu")));
const Search = Loadable(lazy(() => import("@/pages/search")));
const SearchResult = Loadable(lazy(() => import("@/pages/search-result")));
const MemoryClass = Loadable(lazy(() => import("@/pages/memory-class")));
const MemoryList = Loadable(lazy(() => import("@/pages/memory-list")));

function Root() {
  const location = useLocation();
  useQuery(getStudentsQuery());

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname ?? "root"}>
          <Route path="" element={<ModeSelect />} />
          <Route path="birthday" element={<OnBoard />} />
          <Route path="board" element={<Board />} />
          <Route path="menu" element={<Menu />} />
          <Route path="memory-class" element={<MemoryClass />} />
          <Route path="memory-list" element={<MemoryList />} />
          <Route path="search" element={<Search />} />
          <Route path="stars" element={<Stars />} />
          <Route path="search-result" element={<SearchResult />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}

export default Root;
