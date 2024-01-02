/** @jsxImportSource @emotion/react */
import AppShell from "@/components/shell/app-shell";
import { Route, Routes, useLocation } from "react-router-dom";
import Loadable from "./components/common/loadable";
import { lazy } from "react";
import { AnimatePresence } from "framer-motion";

const OnBoard = Loadable(lazy(() => import("./pages/onboard")));
const Board = Loadable(lazy(() => import("./pages/board")));
const Cloud = Loadable(lazy(() => import("./pages/cloud")));
const Menu = Loadable(lazy(() => import("./pages/menu")));

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
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}

export default Root;
