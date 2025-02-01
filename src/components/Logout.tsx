import { Icons } from "@constants/icons";
import { useAuthStore } from "@context/AuthProvider/store";
import { Button } from "antd";
import Confirmation from "./common/Confirmation";
import useModalView from "@hooks/useModal";
import { useCreate } from "@api/index";
import { urls } from "@constants/urls";

const Logout = () => {
  const { mutate } = useCreate<null, string>(urls.admin.logout);
  const { logout } = useAuthStore();
  const [open, openModal, closeModal] = useModalView();

  const onLogout = () => {
    mutate(null, {
      onSettled() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        logout();
      },
    });
  };

  return (
    <>
      <Button onClick={openModal} type="primary">
        <Icons.logout fill="white" /> Log out
      </Button>
      <Confirmation onConfirm={onLogout} isOpen={open} onCancel={closeModal}>
        Are you sure that you want to log out your account?
      </Confirmation>
    </>
  );
};

export default Logout;
