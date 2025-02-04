import { Button } from "antd";
import { PlusIcon } from "lucide-react";

interface Props {
  onOpen: () => void;
}

const AdminsHeader = ({ onOpen }: Props) => {
  return (
    <div className="mb-4 p-5 flex justify-between items-center bg-white rounded">
      <h1 className="font-bold text-xl">Adminlar ro'yxati</h1>
      <Button type="primary" onClick={onOpen}>
        <PlusIcon /> Yaratish
      </Button>
    </div>
  );
};

export default AdminsHeader;
