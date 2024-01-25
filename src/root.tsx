import AppShell from "@/components/shell/app-shell";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import OnBoard from "./pages/onboard";
import Board from "./pages/board";
import Cloud from "./pages/cloud";
import Menu from "./pages/menu";
import Search from "./pages/search";
import { useQuery } from "@tanstack/react-query";
import { getStudentsQuery } from "./queries/student";

function Root() {
  const location = useLocation();
  useQuery(getStudentsQuery());

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
