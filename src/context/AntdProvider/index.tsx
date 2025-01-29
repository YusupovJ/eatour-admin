import { FC, PropsWithChildren } from "react";
import { ConfigProvider } from "antd";

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#d4380d",
          borderRadius: 6,
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
            siderBg: "#fff",
          },
          Button: {
            paddingBlock: 20,
            paddingInline: 24,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
