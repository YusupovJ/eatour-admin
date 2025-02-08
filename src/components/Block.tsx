import { DividerProps } from "antd";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & DividerProps & { title: string };

const Block = ({ children, title, ...props }: Props) => {
  return (
    <div {...props} className={`rounded-xl bg-white mb-10 p-5 ${props.className}`}>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

export default Block;
