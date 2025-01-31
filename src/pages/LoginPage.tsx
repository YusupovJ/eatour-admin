import { Icons } from "@constants/icons";
import { useAuthStore } from "@context/AuthProvider/store";
import { useLogin } from "@hooks/useAuth";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ILogin } from "src/types";

const Login = () => {
  const { mutate } = useLogin();
  const { auth } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values: ILogin) => {
    mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        auth();
        navigate("/");
      },
    });
  };

  return (
    <div className="h-screen flex justify-center flex-col items-center bg-slate-100">
      <div className="mb-10">
        <a href="#">
          <Icons.menuLogoIcon />
        </a>
      </div>
      <div className="p-[42px] rounded-[32px] max-w-[500px] w-full bg-white">
        <h1 className="font-bold text-4xl">Log in</h1>
        <p className="text-[#3d3d3d] my-4">Input your login and password</p>
        <Form onFinish={onFinish} layout="vertical" autoComplete="off">
          <Form.Item name="login" label="Login" rules={[{ required: true, message: "Login is required" }]}>
            <Input placeholder="Input the login" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must contain at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Input the password" size="large" />
          </Form.Item>
          <Button htmlType="submit" type="primary" className="w-full mt-7">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Login;
