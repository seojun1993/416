import { lazy } from "react";
import Loadable from "@/components/common/loadable";
import { createBrowserRouter } from "react-router-dom";
import OnBoard from "./pages/onboard";
import App from "./root";

const Board = Loadable(lazy(() => import("./pages/board")));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <OnBoard />,
      },
      {
        path: "board",
        element: <Board />,
      },
    ],
  },
]);
