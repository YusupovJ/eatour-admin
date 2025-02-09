import { useGetList } from "@api/index";
import FileUploader from "@components/common/FileUploder";
import TextEditor from "@components/common/TextEditor";
import { KeysEnum } from "@constants/keys";
import { urls } from "@constants/urls";
import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { IPlace } from "src/types";

interface Props {
  form: FormInstance;
}

const MetaForm = ({ form }: Props) => {
  const { data: places } = useGetList<IPlace[]>(KeysEnum.GET_ALL_CITIES, urls.place.getAll);
  const options = useMemo(
    () =>
      places?.data.map((place) => ({
        value: place.id,
        label: place.name,
      })),
    [places],
  );

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item name="title" rules={[{ required: true, message: "Sarlavhani kiriting" }]}>
            <Input placeholder="Sarlavha" size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="placeId" rules={[{ required: true, message: "Shaharni aanlang" }]}>
            <Select options={options} placeholder="Shahar" size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item name="description" rules={[{ required: true, message: "Tavsif kiriting" }]}>
            <TextEditor name="description" form={form} initialValue={form.getFieldValue("description")} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item name="images" rules={[{ required: true, message: "Hech bomasa bir rasm tanlang" }]}>
            <FileUploader name="images" form={form} multiple defaultFiles={form.getFieldValue("images")} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default MetaForm;
