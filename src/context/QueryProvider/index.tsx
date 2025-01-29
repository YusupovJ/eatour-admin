import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryContextProviderProps } from "./types";

const queryDevTools = import.meta.env.VITE__DEV_TOOLS_REACT_QUERY;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const QueryContextProvider: FC<QueryContextProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {!!queryDevTools && <ReactQueryDevtools initialIsOpen={false} />}
      {children}
    </QueryClientProvider>
  );
};

export default QueryContextProvider;
