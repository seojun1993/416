import "./vitals.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./root";
import GlobalLayout from "./global-layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalLayout>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Root />} />
        </Routes>
      </BrowserRouter>
    </GlobalLayout>
  </React.StrictMode>
);
