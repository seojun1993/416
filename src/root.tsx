/** @jsxImportSource @emotion/react */
import AppShell from "@/components/shell/app-shell";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import OnBoard from "./pages/onboard";
import Board from "./pages/board";
import Cloud from "./pages/cloud";
import Menu from "./pages/menu";
import Search from "./pages/search";

// const OnBoard = Loadable(lazy(() => import("./pages/onboard")));
// const Board = Loadable(lazy(() => import("./pages/board")));
// const Cloud = Loadable(lazy(() => import("./pages/cloud")));
// const Menu = Loadable(lazy(() => import("./pages/menu")));

function Root() {
  const location = useLocation();
  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname ?? "root"}>
          <Route path="" element={<OnBoard />} />
          <Route path="board" element={<Board />} />
          <Route path="cloud" element={<Cloud />} />
          <Route path="menu" element={<Menu />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}

export default Root;
