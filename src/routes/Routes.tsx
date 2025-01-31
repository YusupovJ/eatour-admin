import LayoutPage from "@components/layout/Layout";
import Login from "@pages/LoginPage";
import NotFoundPage from "@pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <NotFoundPage />,
    loader: () => null,
    children: [],
  },
]);
