import "./index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import QueryContextProvider from "./context/QueryProvider";
import AntdProvider from "./context/AntdProvider";
import { router } from "@routes/Routes";
import AuthProvider from "@context/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryContextProvider>
      <AntdProvider>
        <RouterProvider router={router} />
      </AntdProvider>
    </QueryContextProvider>
  </AuthProvider>,
);
