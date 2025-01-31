import { PropsWithChildren, useEffect } from "react";
import { useAuthStore } from "./store";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { auth } = useAuthStore();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      auth();
    }
  }, []);

  return children;
};

export default AuthProvider;
