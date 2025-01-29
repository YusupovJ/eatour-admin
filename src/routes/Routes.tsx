import LayoutPage from "@components/layout/Layout";
import NotFoundPage from "@pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: "Eee login",
  },
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <NotFoundPage />,
    loader: () => null,
    children: [],
  },
]);
