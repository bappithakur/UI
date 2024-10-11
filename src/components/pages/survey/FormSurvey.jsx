import React from "react";
import { Button, Col, Form, Row, Checkbox, Space, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";

const FormSurvey = () => {
  const data = [
    {
      id: 1,
      question: "Question 1",
      type: "TA",
      options: [],
    },
    {
      id: 2,
      question: "Question 2",
      type: "MS",
      options: [
        { label: "Que 2 Option 1", value: "que2_option_1" },
        { label: "Que 2 Option 2", value: "que2_option_2" },
        { label: "Que 2 Option 3", value: "que2_option_3" },
        { label: "Que 2 Option 4", value: "que2_option_4" },
      ],
    },
    {
      id: 4,
      question: "Question 4",
      type: "TA",
      options: [],
    },
    {
      id: 3,
      question: "Question 3",
      type: "MC",
      options: [
        { label: "Que 3 Option 1", value: "que3_option_1" },
        { label: "Que 3 Option 2", value: "que3_option_2" },
        { label: "Que 3 Option 3", value: "que3_option_3" },
        { label: "Que 3 Option 4", value: "que3_option_4" },
      ],
    },
    {
      id: 6,
      question: "Question 6",
      type: "MC",
      options: [
        { label: "Que 6 Option 1", value: "que6_option_1" },
        { label: "Que 6 Option 2", value: "que6_option_2" },
        { label: "Que 6 Option 3", value: "que6_option_3" },
        { label: "Que 6 Option 4", value: "que6_option_4" },
      ],
    },
    {
      id: 5,
      question: "Question 5",
      type: "MS",
      options: [
        { label: "Que 5 Option 1", value: "que5_option_1" },
        { label: "Que 5 Option 2", value: "que5_option_2" },
        { label: "Que 5 Option 3", value: "que5_option_3" },
        { label: "Que 5 Option 4", value: "que5_option_4" },
      ],
    },
  ];

  const showOptions = (type, options) => {
    switch (type) {
      case "MS":
        return <Checkbox.Group options={options} />;
      case "MC":
        return <Radio.Group options={options} />;
      default:
        return <TextArea rows={4} />;
    }
  };

  return (
    <Form layout="vertical" hideRequiredMark>
      {data.map((ele, i) => (
        <Row gutter={16} key={i}>
          <Col span={16}>
            <Form.Item label={ele.question} name={`question_${ele.id}`}>
              {showOptions(ele.type, ele.options)}
            </Form.Item>
          </Col>
        </Row>
      ))}
      <Space className="mt-3 float-end">
        <Button type="primary">Submit</Button>
      </Space>
    </Form>
  );
};

export default FormSurvey;
