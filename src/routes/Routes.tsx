import LayoutPage from "@components/layout/Layout";
import AdminsPage from "@pages/admins";
import CountryPage from "@pages/country";
import Login from "@pages/LoginPage";
import NotFoundPage from "@pages/NotFoundPage";
import PlacePage from "@pages/place";
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
    children: [
      {
        path: "/",
        element: <AdminsPage />,
      },
      {
        path: "/country",
        element: <CountryPage />,
      },
      {
        path: "/city",
        element: <PlacePage />,
      },
    ],
  },
]);
