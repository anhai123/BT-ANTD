import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Result,
  Upload,
} from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHero } from "../../feature/heroSlice";
import UploadC from "../Upload";
const key = "updatable";
const AddHeroForm = () => {
  const [form] = Form.useForm();
  const dispatcher = useDispatch();
  const { heroList } = useSelector((state) => state.hero);
  const [state, setState] = useState({
    selectedFile: null,
    selectedFileList: [],
  });
  const dummyRequest = ({ file, onSuccess }) => {
    console.log(file);
    // const url = URL.createObjectURL(file);
    // setFile(url);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const onChange = (value) => {
    console.log("changed", value);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    values.key = values.heroname;
    setTimeout(() => {
      message.success({
        content: "Successfully create a new hero ",
        key,
        duration: 2,
      });
    }, 1000);
    dispatcher(addHero(values));
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setTimeout(() => {
      message.error({
        content: `${errorInfo}`,
        key,
        duration: 2,
      });
    }, 1000);
  };

  const props = {
    name: "file",
    onChange(info) {
      const nextState = {};
      switch (info.file.status) {
        case "uploading":
          nextState.selectedFileList = [info.file];
          console.log(info.file, info.fileList);
          break;
        case "done":
          nextState.selectedFile = info.file;
          nextState.selectedFileList = [info.file];
          break;

        default:
          // error or removed
          nextState.selectedFile = null;
          nextState.selectedFileList = [];
      }
      setState(nextState);
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <Form
      form={form}
      style={{ paddingTop: 40 }}
      name="basic"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 6,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Hero name"
        name="heroname"
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => {
              heroList.findIndex((hero) => hero.key === value) === -1
                ? cb()
                : cb("name have existed");
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Avatar"
        name="avatar"
        rules={[
          {
            required: true,
            message: "Please insert a picture!",
          },
        ]}
      >
        <Upload
          {...props}
          fileList={state.selectedFileList}
          customRequest={dummyRequest}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Short description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input short description",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Attack point"
        name="attackP"
        rules={[
          {
            required: true,
            message: "Please input Attack point",
          },
        ]}
      >
        <InputNumber min={0} max={100} defaultValue={0} onChange={onChange} />
      </Form.Item>

      <Form.Item
        label="Defend point"
        name="defendP"
        rules={[
          {
            required: true,
            message: "Please input Defend point",
          },
        ]}
      >
        <InputNumber min={0} max={100} defaultValue={0} onChange={onChange} />
      </Form.Item>

      <Form.Item
        label="Percentage of critical damage"
        name="crit_damage"
        rules={[
          {
            required: true,
            message: "Please input valid percentage ",
          },
        ]}
      >
        <InputNumber
          defaultValue={100}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          onChange={onChange}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          style={{ left: "13%", width: "41%", marginTop: "30px" }}
          type=""
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
      {/* <img alt="uploadImage" src={file} /> */}
    </Form>
  );
};
export default AddHeroForm;
