import { IData } from "src/types";
import { MapPin, UserIcon } from "lucide-react";

export const menuData: IData[] = [
  {
    id: 1,
    title: "Administrators",
    path: "/",
    icon: <UserIcon />,
  },
  {
    id: 2,
    title: "Places",
    icon: <MapPin />,
    path: "",
    children: [
      {
        id: 2.1,
        title: "Countries",
        path: "/country",
      },
      {
        id: 2.2,
        title: "Cities",
        path: "/city",
      },
    ],
  },
];
