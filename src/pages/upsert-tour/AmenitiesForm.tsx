import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";

interface Props {
  form: FormInstance;
}

const AmenitiesForm = ({ form }: Props) => {
  const [includes, setIncludes] = useState<string[]>([""]);
  const [excludes, setExcludes] = useState<string[]>([""]);
  const [includesChange, setIncludesChange] = useState(false);
  const [excludesChange, setExcludesChange] = useState(false);

  const addIncludes = () => {
    setIncludes([...includes, ""]);
  };
  const addExcludes = () => {
    setExcludes([...excludes, ""]);
  };

  const onIncludesChange = (value: string, index: number) => {
    setIncludes(
      includes.map((include, i) => {
        if (index === i) return value;
        return include;
      }),
    );
  };

  const onExcludesChange = (value: string, index: number) => {
    setExcludes(
      excludes.map((exclude, i) => {
        if (index === i) return value;
        return exclude;
      }),
    );
  };

  useEffect(() => {
    form.setFieldValue("includes", includes.filter(Boolean));
  }, [includes]);

  useEffect(() => {
    form.setFieldValue("excludes", excludes.filter(Boolean));
  }, [excludes]);

  const defaultIncludes = useWatch("includes", form);

  useEffect(() => {
    if (!includesChange && defaultIncludes?.length > 0) {
      setIncludes(defaultIncludes);
      setIncludesChange(true);
    }
  }, [defaultIncludes]);

  const defaultExcludes = useWatch("excludes", form);

  useEffect(() => {
    if (!excludesChange && defaultExcludes?.length > 0) {
      setExcludes(defaultExcludes);
      setExcludesChange(true);
    }
  }, [defaultExcludes]);

  return (
    <Row gutter={24}>
      <Col span={12} className="space-y-5 flex flex-col items-center">
        {includes.map((content, index) => (
          <Input
            key={index}
            value={content}
            size="large"
            placeholder="Tur o'z ichiga oladi"
            onChange={(e) => onIncludesChange(e.target.value, index)}
          />
        ))}
        <Button onClick={addIncludes} htmlType="button" type="primary">
          Qoshish
        </Button>
      </Col>
      <Col span={12} className="space-y-5 flex flex-col items-center">
        {excludes.map((content, index) => (
          <Input
            key={index}
            value={content}
            size="large"
            placeholder="Tur o'z ichiga olmaydi"
            onChange={(e) => onExcludesChange(e.target.value, index)}
          />
        ))}
        <Button onClick={addExcludes} htmlType="button" type="primary">
          Qoshish
        </Button>
      </Col>
      <Form.Item name="includes" className="hidden">
        <div />
      </Form.Item>
      <Form.Item name="excludes" className="hidden">
        <div />
      </Form.Item>
    </Row>
  );
};

export default AmenitiesForm;
