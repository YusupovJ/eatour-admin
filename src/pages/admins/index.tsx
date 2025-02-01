import useModalView from "@hooks/useModal";
import AdminsHeader from "./AdminsHeader";
import AdminsList from "./AdminsList";
import AdminsForm from "./AdminsForm";

const AdminsPage = () => {
  const [isFormOpen, openForm, closeForm] = useModalView();

  return (
    <>
      <AdminsHeader onOpen={openForm} />
      <AdminsList />
      <AdminsForm onClose={closeForm} open={isFormOpen} />
    </>
  );
};

export default AdminsPage;
