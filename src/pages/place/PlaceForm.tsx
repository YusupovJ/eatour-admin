import { useCreate, useGetList, useUpdate } from "@api/index";
import FileUploader from "@components/common/FileUploder";
import TextEditor from "@components/common/TextEditor";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import { IEditData } from "@hooks/useEditData";
import { Button, Drawer, Form, Input, message, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { ICountry, IPlace } from "src/types";

interface Props {
  onClose: () => void;
  open: boolean;
  editData: IEditData<IPlace>;
}

interface IPlaceDto {
  name: string;
  description: string;
  image: string;
  countryId: number;
}

const PlaceForm = ({ onClose, open, editData }: Props) => {
  const { mutate: create } = useCreate<IPlaceDto, IPlace>(urls.place.create);
  const { mutate: update } = useUpdate<IPlaceDto, IPlace>();
  const { data: countries } = useGetList<ICountry[]>(KeysEnum.GET_ALL_COUNTRIES, urls.country.getAll);

  const queryClient = useQueryClient();
  const [form] = useForm<IPlaceDto>();

  const closeHandler = () => {
    onClose();
    form.resetFields(["name", "image", "description", "countryId"]);
    editData.setEditData(null);
  };

  useEffect(() => {
    if (editData.data) {
      form.setFieldsValue({
        ...editData.data,
        countryId: editData.data.country.id,
      });
    }
  }, [editData]);

  const onSubmit = (values: IPlaceDto) => {
    if (editData.data) {
      update(
        {
          url: urls.place.update(editData.data.id),
          item: values,
        },
        {
          onSuccess() {
            message.success("Shahar yangilandi!");
            queryClient.refetchQueries(KeysEnum.GET_ALL_CITIES);
            closeHandler();
          },
        },
      );
      return;
    }
    create(values, {
      onSuccess: () => {
        message.success("Shahar yaratildi!");
        queryClient.refetchQueries(KeysEnum.GET_ALL_CITIES);
        closeHandler();
      },
    });
  };

  const options = useMemo(
    () =>
      countries?.data.map((country) => ({
        value: country.id,
        label: country.name,
      })),
    [countries],
  );

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
          <Form.Item name="name" label="Shahar nomi" rules={[{ required: true, message: "Nomini kiriting" }]}>
            <Input placeholder="Shahar nomi" />
          </Form.Item>
          <Form.Item name="countryId" label="Mamlakat" rules={[{ required: true, message: "Mamlakatni kiriting" }]}>
            <Select options={options} placeholder="Mamlakat" />
          </Form.Item>
          <Form.Item name="description" label="Tavsif" rules={[{ required: true, message: "Tavsifni kiriting" }]}>
            <TextEditor form={form} name="description" initialValue={editData.data?.description} />
          </Form.Item>
          <Form.Item name="image" rules={[{ required: true, message: "Rasmni kiriting" }]}>
            <FileUploader form={form} name="image" />
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

export default PlaceForm;
