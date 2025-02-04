import { Modal } from "antd";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onConfirm: () => void;
  isOpen: boolean;
  okayText?: string;
  onCancel: () => void;
}

const Confirmation = ({ isOpen, onConfirm, children, okayText, onCancel }: Props) => {
  return (
    <Modal
      centered
      open={isOpen}
      className="confirm"
      cancelText="Bekor qilish"
      onOk={onConfirm}
      okText={okayText || "Ha"}
      onCancel={onCancel}
    >
      <h3 className="text-xl font-bold mb-3">Tasdiqlash</h3>
      <p className="text-lg">{children}</p>
    </Modal>
  );
};

export default Confirmation;
