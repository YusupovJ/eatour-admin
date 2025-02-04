import { useState } from "react";

export interface IEditData<T> {
  data: T | null;
  onEdit: (data: T) => void;
  setEditData: (data: T | null) => void;
}

const useEditData = <T,>(onOpen: () => void) => {
  const [data, setEditData] = useState<T | null>(null);

  const onEdit = (data: T) => {
    setEditData(data);
    onOpen();
  };

  return { data, onEdit, setEditData };
};

export default useEditData;
