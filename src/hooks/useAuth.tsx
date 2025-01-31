import { KeysEnum } from "@constants/keys";
import { fetchLogin, fetchLogout } from "@services/auth";
import { useMutation } from "react-query";

export const useLogin = () => {
  return useMutation(KeysEnum.LOGIN, fetchLogin);
};

export const useLogout = () => {
  return useMutation(KeysEnum.LOGOUT, fetchLogout);
};
