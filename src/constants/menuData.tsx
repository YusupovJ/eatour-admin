import { IData } from "src/types";
import { Icons } from "./icons";
import { ShopOutlined } from "@ant-design/icons";

export const menuData: IData[] = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: <Icons.dashboardIcon />,
  },
  {
    id: 2,
    title: "Kategoryalar",
    path: "/categories",
    icon: <Icons.categoryIcon />,
    children: [
      {
        id: 21,
        title: "Subcategory",
        path: "/subcategory",
      },
    ],
  },
  {
    id: 3,
    title: "Variantlar",
    path: "/variants",
    icon: <Icons.testIcon />,
  },
  {
    id: 4,
    title: "Faydalanuvchilar",
    path: "/users",
    icon: <Icons.usersIcon />,
  },
  {
    id: 6,
    title: "Do'kon",
    path: "",
    icon: <ShopOutlined />,
    children: [
      {
        id: 61,
        title: "Mahsulotlar",
        path: "/shop/products",
      },
      {
        id: 62,
        title: "Buyurtmalar",
        path: "/shop/orders",
      },
    ],
  },
  {
    id: 5,
    title: "Sozlamalar",
    path: "/setting",
    icon: <Icons.setting />,
  },
];
