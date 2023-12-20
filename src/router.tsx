import {lazy} from 'react'
import Loadable from "@/components/loadable";
import { createBrowserRouter } from 'react-router-dom';
const App = Loadable(lazy(() => import("./App.tsx")));

export const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
  },
]);
