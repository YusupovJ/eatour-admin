import { PropsWithChildren, useEffect } from "react";
import { useAuthStore } from "./store";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      logout();
    }
  }, []);

  return children;
};

export default AuthProvider;
