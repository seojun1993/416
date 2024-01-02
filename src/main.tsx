import "./vitals.ts";
import "@/assets/static/styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global, ThemeProvider } from "@emotion/react";
import style from "@/styles";
import Root from "./root";

const theme = {
  color: {
    text: {
      main: "#000000",
      sub: "#666666",
    },
    primary: {
      foreground: "#FFFBE2",
    },
    secondary: {
      foreground: "white",
    },
    accent: {
      foreground: "#65B741",
    },
    button: {
      active: "#FB950A",
      disable: "#DBD5AD",
    },
  },
};

export type ThemeType = typeof theme;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={style.reset} />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Root />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
