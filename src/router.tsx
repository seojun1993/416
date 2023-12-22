import { lazy } from "react";
import Loadable from "@/components/common/loadable";
import { createBrowserRouter } from "react-router-dom";

const App = Loadable(lazy(() => import("./pages/root")));
const Board = Loadable(lazy(() => import("./pages/board")));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "board",
        element: <Board />,
      },
    ],
  },
]);
