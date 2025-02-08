import { useCreate, useUpdate } from "@api/index";
import FileUploader from "@components/common/FileUploder";
import TextEditor from "@components/common/TextEditor";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import { IEditData } from "@hooks/useEditData";
import { Button, Drawer, Form, Input, message, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { ICountry } from "src/types";

interface Props {
  onClose: () => void;
  open: boolean;
  editData: IEditData<ICountry>;
}

interface ICountryDto {
  name: string;
}

const CountryForm = ({ onClose, open, editData }: Props) => {
  const { mutate: create } = useCreate<ICountryDto, ICountry>(urls.country.create);
  const { mutate: update } = useUpdate<ICountryDto, ICountry>();
  const queryClient = useQueryClient();
  const [form] = useForm<ICountry>();

  const closeHandler = () => {
    onClose();
    form.resetFields(["name", "image", "description"]);
    editData.setEditData(null);
  };

  useEffect(() => {
    if (editData.data) {
      form.setFieldsValue(editData.data);
    }
  }, [editData]);

  const onSubmit = (values: ICountryDto) => {
    if (editData.data) {
      update(
        {
          url: urls.country.update(editData.data.id),
          item: values,
        },
        {
          onSuccess() {
            message.success("Mamlakat yangilandi!");
            queryClient.refetchQueries(KeysEnum.GET_ALL_COUNTRIES);
            closeHandler();
          },
        },
      );
      return;
    }
    create(values, {
      onSuccess: () => {
        message.success("Mamlakat yaratildi!");
        queryClient.refetchQueries(KeysEnum.GET_ALL_COUNTRIES);
        closeHandler();
      },
    });
  };

  return (
    <>
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
          <Form.Item name="name" label="Mamlakat nomi" rules={[{ required: true, message: "Nomini kiriting" }]}>
            <Input placeholder="Mamlakat nomi" />
          </Form.Item>
          <Form.Item name="description" label="Tavsif" rules={[{ required: true, message: "Tavsifni kiriting" }]}>
            <TextEditor form={form} name="description" initialValue={editData.data?.description} />
          </Form.Item>
          <Form.Item name="image" rules={[{ required: true, message: "Rasmni kiriting" }]}>
            <FileUploader
              form={form}
              name="image"
              defaultFiles={editData.data?.image ? [editData.data?.image] : undefined}
            />
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

export default CountryForm;
