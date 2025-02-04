import { useCreate } from "@api/index";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import { Button, Drawer, Form, Input, message, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useQueryClient } from "react-query";
import { IAdmin, ILogin } from "src/types";

interface Props {
  onClose: () => void;
  open: boolean;
}

const AdminsForm = ({ onClose, open }: Props) => {
  const { mutate: create } = useCreate<ILogin, IAdmin>(urls.admin.create);
  const queryClient = useQueryClient();
  const [form] = useForm();

  const onSubmit = (values: ILogin) => {
    create(values, {
      onSuccess: () => {
        message.success("Admin yaratildi!");
        queryClient.refetchQueries(KeysEnum.GET_ALL_ADMINS);
        onClose();
        form.resetFields(["login", "password"]);
      },
    });
  };

  return (
    <>
      <Drawer
        title="Admin yaratish"
        width={600}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item name="login" label="Login" rules={[{ required: true, message: "Login majburiy" }]}>
            <Input placeholder="Login" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Parol"
            rules={[
              { required: true, message: "Parol majburiy" },
              { min: 6, message: "Parol kamida 6 ta harfdan iborat bo'lishi kerak" },
            ]}
          >
            <Input.Password placeholder="Parolni kiriting" />
          </Form.Item>
          <Space className="mt-5">
            <Button htmlType="reset" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button htmlType="submit" type="primary">
              Yuborish
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default AdminsForm;
