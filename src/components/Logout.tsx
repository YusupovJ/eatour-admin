import { Icons } from "@constants/icons";
import { useAuthStore } from "@context/AuthProvider/store";
import { useLogout } from "@hooks/useAuth";
import { Button } from "antd";
import Confirmation from "./common/Confirmation";
import useModalView from "@hooks/useModal";

const Logout = () => {
  const { mutate } = useLogout();
  const { logout } = useAuthStore();
  const { open, openModal, closeModal } = useModalView();

  const onLogout = () => {
    mutate(undefined, {
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
