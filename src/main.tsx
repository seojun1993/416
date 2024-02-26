/** @jsxImportSource @emotion/react */
import "./vitals.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./root";
import GlobalLayout from "./global-layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { css } from "@emotion/react";
import AudioProvider from "./components/Audio-provider.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <GlobalLayout>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Root />} />
          </Routes>
        </BrowserRouter>
        <AudioProvider />
      </GlobalLayout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
