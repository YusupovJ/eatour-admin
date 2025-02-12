import { useCreate, useUpdate } from "@api/index";
import FileUploader from "@components/common/FileUploder";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import { IEditData } from "@hooks/useEditData";
import { Button, Drawer, Form, Input, message, Space, Rate } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { ITestimonial } from "src/types";

interface Props {
  onClose: () => void;
  open: boolean;
  editData: IEditData<ITestimonial>;
}

const TestimonialForm = ({ onClose, open, editData }: Props) => {
  const { mutate: create } = useCreate<ITestimonial, ITestimonial>(urls.testimonial.create);
  const { mutate: update } = useUpdate<ITestimonial, ITestimonial>();
  const queryClient = useQueryClient();
  const [form] = useForm<ITestimonial>();

  const closeHandler = () => {
    onClose();
    form.resetFields();
    editData.setEditData(null);
  };

  useEffect(() => {
    if (editData.data) {
      form.setFieldsValue(editData.data);
    }
  }, [editData]);

  const onSubmit = (values: ITestimonial) => {
    if (editData.data) {
      update(
        {
          url: urls.testimonial.update(editData.data.id),
          item: values,
        },
        {
          onSuccess() {
            message.success("Sharh yangilandi!");
            queryClient.refetchQueries(KeysEnum.GET_ALL_TESTIMONIALS);
            closeHandler();
          },
        },
      );
      return;
    }
    create(values, {
      onSuccess: () => {
        message.success("Sharh yaratildi!");
        queryClient.refetchQueries(KeysEnum.GET_ALL_TESTIMONIALS);
        closeHandler();
      },
    });
  };

  return (
    <Drawer
      title={editData.data ? "Yangilash" : "Yaratish"}
      width={600}
      onClose={closeHandler}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item name="fullName" label="To'liq ism" rules={[{ required: true, message: "To'liq ismni kiriting" }]}>
          <Input placeholder="To'liq ism" />
        </Form.Item>
        <Form.Item name="title" label="Sarlavha" rules={[{ required: true, message: "Sarlavhani kiriting" }]}>
          <Input placeholder="Sarlavha" />
        </Form.Item>
        <Form.Item name="content" label="Matn" rules={[{ required: true, message: "Matnni kiriting" }]}>
          <Input.TextArea rows={4} placeholder="Matn" />
        </Form.Item>
        <Form.Item name="rating" label="Reyting" rules={[{ required: true, message: "Reytingni tanlang" }]}>
          <Rate />
        </Form.Item>
        <Form.Item name="avatar" label="Rasm">
          <FileUploader
            form={form}
            name="avatar"
            defaultFiles={editData.data?.avatar ? [editData.data?.avatar] : undefined}
          />
        </Form.Item>
        <Space className="mt-5">
          <Button htmlType="reset" onClick={closeHandler}>
            Bekor qilish
          </Button>
          <Button htmlType="submit" type="primary">
            Yuborish
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default TestimonialForm;
