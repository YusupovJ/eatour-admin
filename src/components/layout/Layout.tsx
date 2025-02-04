import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import HeaderSide from "../Header";
import { useAuthStore } from "@context/AuthProvider/store";

const { Header, Content } = Layout;

const LayoutPage: React.FC = () => {
  const { isAuth } = useAuthStore();

  return (
    <div>
      <Layout>
        <Navbar />
        <Layout>
          <Header
            style={{
              padding: 0,
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <HeaderSide />
          </Header>
          <Content
            style={{
              margin: "16px 16px 0 270px",
              height: "calc(100vh - 85px)",
            }}
          >
            {isAuth ? <Outlet /> : <Navigate to="/login" />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutPage;
