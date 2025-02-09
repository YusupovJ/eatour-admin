import { Button, Divider, Form, FormInstance, Input } from "antd";
import { useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { IRoute } from "src/types";

interface Props {
  form: FormInstance;
}

const RouteForm = ({ form }: Props) => {
  const [change, setChange] = useState(false);
  const [routes, setRoutes] = useState<IRoute[]>([
    {
      title: "",
      description: "",
    },
  ]);

  const defaultRoutes = useWatch("routes", form);

  useEffect(() => {
    if (!change && defaultRoutes) {
      setRoutes(defaultRoutes);
      setChange(true);
    }
  }, [defaultRoutes]);

  const addField = () => {
    setRoutes([...routes, { title: "", description: "" }]);
  };

  const onChange = (value: string | number, index: number, key: "title" | "description") => {
    setRoutes(
      routes.map((route, i) => {
        if (i === index) {
          return {
            ...route,
            [key]: value,
          };
        }
        return route;
      }),
    );
  };

  useEffect(() => {
    form.setFieldValue(
      "routes",
      routes.filter(({ title, description }) => title && description),
    );
  }, [routes]);

  return (
    <div className="space-y-5">
      <Form.Item name="routes" className="hidden">
        <div />
      </Form.Item>
      {routes.map((_, index) => (
        <div key={index}>
          <Divider />
          <div className="space-y-3">
            <Input
              placeholder="Sarlavha"
              size="large"
              value={routes[index].title}
              onChange={(e) => onChange(e.target.value, index, "title")}
            />
            <Input.TextArea
              placeholder="Tavsif"
              size="large"
              value={routes[index].description}
              onChange={(e) => onChange(e.target.value, index, "description")}
            />
          </div>
        </div>
      ))}
      <Button htmlType="button" type="primary" onClick={addField}>
        Marshrut qoshish
      </Button>
    </div>
  );
};

export default RouteForm;
