import { FC } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import Sider from "antd/es/layout/Sider";
import { Icons } from "@constants/icons";
import { menuData } from "@constants/menuData";

const Navbar: FC = () => {
  return (
    <div className="fixed top-0 bottom-0 h-screen z-10">
      <Sider width={255} style={{ height: "100vh", paddingTop: "12px" }}>
        <div className="flex justify-center mb-5">
          <Icons.menuLogoIcon />
        </div>
        <Menu
          mode="inline"
          items={menuData.map((item) => {
            return {
              key: item.id,
              label: item.path ? <Link to={item.path}>{item.title}</Link> : <p>{item.title}</p>,
              icon: item.icon,
              children: item?.children?.map((el) => ({
                type: "group",
                key: el.id,
                label: <Link to={el.path}>{el.title}</Link>,
              })),
            };
          })}
        />
      </Sider>
    </div>
  );
};
export default Navbar;
