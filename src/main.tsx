import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loadable from "./components/loadable.tsx";

const App = Loadable(React.lazy(() => import("./App.tsx")));

const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
