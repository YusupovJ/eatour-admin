import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import HeaderSide from "../Header";

const { Header, Content } = Layout;

const LayoutPage: React.FC = () => {
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
              height: "calc(100vh - 64px)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutPage;
