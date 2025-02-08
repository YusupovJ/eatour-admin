import Block from "@components/Block";
import { Button, Flex, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { IExtraPrice, IRoute } from "src/types";
import MetaForm from "./MetaForm";
import PriceForm from "./PriceForm";
import AmenitiesForm from "./AmenitiesForm";

interface ITourDto {
  title: string;
  desciprtion: string;
  images: string[];
  includes: string[];
  excludes: string[];
  routes: IRoute[];
  placeId: number;
  price: number;
  pricePerChild: number;
  pricePerAdult: number;
  extraPrices: IExtraPrice[];
}

const UpsertTourPage = () => {
  const [form] = useForm<ITourDto>();

  const onSubmit = (values: ITourDto) => {
    console.log(values);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-10">Tur yaratish</h1>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        initialValues={{
          includes: [],
          excludes: [],
        }}
      >
        <Block title="Ma'lumotlar">
          <MetaForm form={form} />
        </Block>
        <Block title="Narx">
          <PriceForm form={form} />
        </Block>
        <Block title="O'z ichiga oladi / olmaydi">
          <AmenitiesForm form={form} />
        </Block>
        <Flex className="justify-end">
          <Button htmlType="submit" type="primary">
            Yuborish
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default UpsertTourPage;
