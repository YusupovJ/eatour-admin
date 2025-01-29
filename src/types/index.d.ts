export interface IMenu {
  id: number;
  path: string;
  title: string;
  icon?: ReactElement;
}

export interface IData extends IMenu {
  children?: IMenu[];
}
