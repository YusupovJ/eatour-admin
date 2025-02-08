import { IData } from "src/types";
import { Globe2, MapPin, PlaneIcon, PlusCircle, UserIcon } from "lucide-react";

export const menuData: IData[] = [
  {
    id: 1,
    title: "Adminlar",
    path: "/",
    icon: <UserIcon />,
  },
  {
    id: 2,
    icon: <Globe2 />,
    title: "Mamlakatlar",
    path: "/country",
  },
  {
    id: 3,
    icon: <MapPin />,
    title: "Shaharlar",
    path: "/city",
  },
  {
    id: 4,
    icon: <PlaneIcon />,
    title: "Turlar",
    path: "/tours",
  },
  {
    id: 5,
    icon: <PlusCircle />,
    title: "Tur yaratish",
    path: "/upsert-tour",
  },
];
