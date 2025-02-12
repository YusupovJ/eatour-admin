import useModalView from "@hooks/useModal";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialList from "./TestimonialList";
import TestimonialForm from "./TestimonialForm";
import useEditData from "@hooks/useEditData";
import { ITestimonial } from "src/types";

const TestimonialPage = () => {
  const [isFormOpen, openForm, closeForm] = useModalView();
  const editData = useEditData<ITestimonial>(openForm);

  return (
    <>
      <TestimonialHeader onOpen={openForm} />
      <TestimonialList onEdit={editData.onEdit} />
      <TestimonialForm onClose={closeForm} open={isFormOpen} editData={editData} />
    </>
  );
};

export default TestimonialPage;
