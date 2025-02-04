import { Button } from "antd";
import { PlusIcon } from "lucide-react";

interface Props {
  onOpen: () => void;
}

const CountryHeader = ({ onOpen }: Props) => {
  return (
    <div className="mb-4 p-5 flex justify-between items-center bg-white rounded">
      <h1 className="font-bold text-xl">List of countries</h1>
      <Button type="primary" onClick={onOpen}>
        <PlusIcon /> Create
      </Button>
    </div>
  );
};

export default CountryHeader;
