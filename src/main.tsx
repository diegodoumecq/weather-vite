import { StrictMode } from "react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createRoot } from "react-dom/client";

import "./index.css";

import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { z } from "zod";

import { env } from "./env";
import { Router } from "./router";

const errorSchema = z.object({ message: z.string() });

const queryCache =
  env.VITE_APP_ENV !== "local"
    ? new QueryCache()
    : new QueryCache({
        // here we set a generic error handler on dev mode
        onError: (e, query) => {
          const parsedError = errorSchema.safeParse(e);

          toast.error(
            `${query.queryKey[0]} error: ${
              !parsedError.success
                ? "generic message"
                : parsedError.data.message
            }`,
          );
        },
      });

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      // these options were set to minimize api usage to stay on the free tier
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "There's no #root div, something's wrong with our index.html",
  );
}

createRoot(root).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toaster />
      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </PersistQueryClientProvider>
  </StrictMode>,
);
