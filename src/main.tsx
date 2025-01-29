import "./index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes/Routes";
import QueryContextProvider from "./context/QueryProvider";
import AntdProvider from "./context/AntdProvider";

createRoot(document.getElementById("root")!).render(
  <QueryContextProvider>
    <AntdProvider>
      <RouterProvider router={router} />
    </AntdProvider>
  </QueryContextProvider>,
);
