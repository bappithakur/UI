import React, { useState } from "react";
import { Option } from "antd/lib/mentions";
import { Button, Col, Form, Input, Row, Space, Select, Checkbox } from "antd";
import TextArea from "antd/lib/input/TextArea";

const FormQuestion = ({ onClose }) => {
  const [questionType, setQuestionType] = useState("TA");

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleChange = (value) => {
    setQuestionType(value);
    console.log(`selected ${value}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const options = [
    {
      name: "optionA",
      label: "Option A",
      value: "a",
    },
    {
      name: "optionB",
      label: "Option B",
      value: "b",
    },
    {
      name: "optionC",
      label: "Option C",
      value: "c",
    },
    {
      name: "optionD",
      label: "Option D",
      value: "d",
    },
  ];

  const showQuestionChoice = () => {
    switch (questionType) {
      case "MS":
        return (
          <>
            {options.map((ele, i) => (
              <Row gutter={16} key={i}>
                <Col span={16}>
                  <Form.Item
                    name={ele.name}
                    label={ele.label}
                    className="mb-3"
                    rules={[
                      { required: true, message: `Please enter ${ele.label}` },
                    ]}
                  >
                    <Input placeholder={`Please enter ${ele.label}`} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={ele.value} className="mb-3" label=" ">
                    <Checkbox>
                      Is
                      <b> {ele.label} </b>
                      correct
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            ))}
          </>
        );
      case "MC":
        return (
          <>
            <Row gutter={16}>
              {options.map((ele, i) => (
                <Col span={12} key={i}>
                  <Form.Item
                    name={ele.name}
                    label={ele.label}
                    className="mb-3"
                    rules={[
                      {
                        required: true,
                        message: `Please enter ${ele.label}`,
                      },
                    ]}
                  >
                    <Input placeholder={`Please enter ${ele.label}`} />
                  </Form.Item>
                </Col>
              ))}
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="answer"
                  label="Answer"
                  rules={[
                    {
                      required: true,
                      message: "Please correct answer",
                    },
                  ]}
                >
                  <Select placeholder="Please correct answer">
                    {options.map((ele, i) => (
                      <Option value={ele.value} key={i}>
                        {ele.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        );
      default:
        break;
    }
  };

  return (
    <Form
      layout="vertical"
      hideRequiredMark
      name="frmQuestions"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="questionType"
            label="Question Type"
            rules={[
              { required: true, message: "Please select an question type" },
            ]}
          >
            <Select
              placeholder="Please select an question type"
              onChange={handleChange}
            >
              <Option value="TA">Multiline TextArea</Option>
              <Option value="MC">Multi Choice</Option>
              <Option value="MS">Multi Select</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isActive" label="Is Active">
            <Select defaultValue="yes">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
        </Col>
      </Row>
      {showQuestionChoice()}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} placeholder="Please enter description" />
          </Form.Item>
        </Col>
      </Row>
      <Space className="mt-3 float-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Space>
    </Form>
  );
};

export default FormQuestion;
