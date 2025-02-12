import Block from "@components/Block";
import { Button, Flex, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { IExtraPrice, IRoute, ITour } from "src/types";
import MetaForm from "./MetaForm";
import PriceForm from "./PriceForm";
import AmenitiesForm from "./AmenitiesForm";
import RouteForm from "./RouteForm";
import { useCreate, useUpdate } from "@api/index";
import { urls } from "@constants/urls";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTourStore } from "@context/store/tour";

interface ITourDto {
  title: string;
  description: string;
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
  const { mutate: create } = useCreate<ITourDto, ITour>(urls.tour.create);
  const { mutate: update } = useUpdate<ITourDto, ITour>();
  const [searchParams] = useSearchParams();
  const { tour, setTour } = useTourStore();

  useEffect(() => {
    const tourId = searchParams.get("tourId");

    if (tourId && tour) {
      form.setFieldsValue(tour);
    } else {
      setTour(null);
      form.resetFields();
    }
  }, [searchParams, tour]);

  const onSubmit = (values: ITourDto) => {
    const tourId = searchParams.get("tourId");
    if (tourId) {
      update(
        { url: urls.tour.update(+tourId), item: values },
        {
          onSuccess() {
            message.success("Tur tahrirlandi!");
            setTour(values);
          },
        },
      );
      return;
    }
    create(values, {
      onSuccess() {
        message.success("Tur yaratildi!");
        setTour(values);
      },
    });
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
          routes: [
            {
              title: "",
              description: "",
            },
          ],
          extraPrices: [
            {
              title: "",
              value: null,
            },
          ],
          images: [],
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
        <Block title="Marshrut">
          <RouteForm form={form} />
        </Block>
        <Flex className="justify-end mb-10">
          <Button htmlType="submit" type="primary">
            Yuborish
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default UpsertTourPage;
