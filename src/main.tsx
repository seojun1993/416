import "./vitals.ts";
import "@/assets/static/styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Global, ThemeProvider } from "@emotion/react";
import { router } from "./router.tsx";
import style from "@/styles";

const theme = {
  color: {
    primary: {
      foreground: "#FFFBE2",
    },
    secondary: {
      foreground: "#DBD5AD",
    },
    button: {
      active: "#FB950A",
    },
  },
};

export type ThemeType = typeof theme;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={style.reset} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
