import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { IExtraPrice } from "src/types";

interface Props {
  form: FormInstance;
}

const PriceForm = ({ form }: Props) => {
  const [extraPrices, setExtraPrices] = useState<IExtraPrice[]>([
    {
      title: "",
      value: null,
    },
  ]);

  const addField = () => {
    setExtraPrices([...extraPrices, { title: "", value: null }]);
  };

  const onChange = (value: string | number, index: number, key: "title" | "value") => {
    setExtraPrices(
      extraPrices.map((extraPrice, i) => {
        if (i === index) {
          return {
            ...extraPrice,
            [key]: value,
          };
        }
        return extraPrice;
      }),
    );
  };

  useEffect(() => {
    form.setFieldValue(
      "extraPrices",
      extraPrices.filter(({ title, value }) => title && value),
    );
  }, [extraPrices]);

  return (
    <>
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item name="price" label="Tur narxi">
            <Input size="large" type="number" min={0} placeholder="Tur narxi" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="pricePerChild" label="Bir bola uchun narx">
            <Input size="large" type="number" min={0} placeholder="Bir bola uchun narx" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="pricePerAdult" label="Kattalar uchun narx">
            <Input size="large" type="number" min={0} placeholder="Kattalar uchun narx" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="extraPrices" className="hidden">
        <div />
      </Form.Item>
      <div className="space-y-5">
        <h3 className="text-xl font-bold">Qoshimcha servislar</h3>
        {extraPrices.map((_, index) => (
          <Row gutter={50} key={index}>
            <Col span={12}>
              <Input
                placeholder="Servis nomi"
                size="large"
                onChange={(e) => onChange(e.target.value, index, "title")}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder="Servis narxi"
                size="large"
                type="number"
                min={0}
                onChange={(e) => onChange(+e.target.value, index, "value")}
              />
            </Col>
          </Row>
        ))}
        <Button htmlType="button" type="primary" onClick={addField}>
          Servis qoshish
        </Button>
      </div>
    </>
  );
};

export default PriceForm;
