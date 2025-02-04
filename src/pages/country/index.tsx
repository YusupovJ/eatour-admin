import useModalView from "@hooks/useModal";
import CountryHeader from "./CountryHeader";
import CountryList from "./CountryList";
import CountryForm from "./CountryForm";
import useEditData from "@hooks/useEditData";
import { ICountry } from "src/types";

const CountryPage = () => {
  const [isFormOpen, openForm, closeForm] = useModalView();
  const editData = useEditData<ICountry>(openForm);

  return (
    <>
      <CountryHeader onOpen={openForm} />
      <CountryList onEdit={editData.onEdit} />
      <CountryForm onClose={closeForm} open={isFormOpen} editData={editData} />
    </>
  );
};

export default CountryPage;
