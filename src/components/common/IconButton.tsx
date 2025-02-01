import { Button, ButtonProps } from "antd";

const IconButton = ({ children, ...props }: ButtonProps) => {
  return <Button icon={children} className="!w-10 !h-10" {...props} />;
};

export default IconButton;
