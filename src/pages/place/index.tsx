import useModalView from "@hooks/useModal";
import PlaceHeader from "./PlaceHeader";
import PlaceList from "./PlaceList";
import PlaceForm from "./PlaceForm";
import useEditData from "@hooks/useEditData";
import { IPlace } from "src/types";

const PlacePage = () => {
  const [isFormOpen, openForm, closeForm] = useModalView();
  const editData = useEditData<IPlace>(openForm);

  return (
    <>
      <PlaceHeader onOpen={openForm} />
      <PlaceList onEdit={editData.onEdit} />
      <PlaceForm onClose={closeForm} open={isFormOpen} editData={editData} />
    </>
  );
};

export default PlacePage;
