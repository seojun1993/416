/** @jsxImportSource @emotion/react */
import AppShell from "@/components/shell/app-shell";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export default Root;
