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
import { resizeFile } from "..";
import heroService from "../../services/Hero.service";
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
  const onFinish = async (values) => {
    console.log("Success:", values);
    values.key = values.heroname;
    // await getBase64(values.avatar.file.originFileObj).then((base64) => {
    //   values.avatar = base64;
    // });
    let uri1;
    let hero = await resizeFile(values.avatar.file.originFileObj).then(
      (uri) => {
        uri1 = uri;
        let hero1 = { ...values, avatar: uri };
        return hero1;
      }
    );

    setTimeout(() => {
      message.success({
        content: "Tạo thành công nhân vật mới. Vào danh sách hero để xem thêm",
        key,
        duration: 2,
      });
    }, 1000);

    dispatcher(addHero(hero));
    const formm = new FormData();

    formm.append("heroname", values.heroname);
    formm.append("description", values.description);
    formm.append("attackP", values.attackP);
    formm.append("defendP", values.defendP);
    formm.append("key", values.key);
    formm.append("crit_damage", values.crit_damage);
    formm.append("avatar", uri1);
    await heroService.createNewHero(formm);
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
        attackP: 0,
        defendP: 0,
        crit_damage: 0,
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên nhân vật"
        name="heroname"
        rules={[
          {
            required: true,
            message: "Nhập tên nhân vật",
          },

          ({ getFieldValue }) => ({
            validator(_, value) {
              if (heroList.findIndex((hero) => hero.key === value) === -1) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Cái tên này đã tồn tại"));
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ảnh đại diện"
        name="avatar"
        rules={[
          {
            required: true,
            message: "Chọn 1 tấm ảnh đẹp nào!",
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
        label="Mô tả ngắn"
        name="description"
        rules={[
          {
            required: true,
            message: "Miêu tả nhân vật.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Điểm tấn công"
        name="attackP"
        rules={[
          {
            required: true,
            message: "Nhập điểm tấn công",
          },
        ]}
      >
        <InputNumber min={0} max={100} defaultValue={0} onChange={onChange} />
      </Form.Item>

      <Form.Item
        label="Điểm phòng thủ"
        name="defendP"
        rules={[
          {
            required: true,
            message: "Nhập điểm phòng thủ",
          },
        ]}
      >
        <InputNumber min={0} max={100} defaultValue={0} onChange={onChange} />
      </Form.Item>

      <Form.Item
        label="Tỉ lệ chí mạng"
        name="crit_damage"
        rules={[
          {
            required: true,
            message: "Chọn tỉ lệ chí mạng ",
          },
        ]}
      >
        <InputNumber
          defaultValue={0}
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
          Tạo mới nhận vật
        </Button>
      </Form.Item>
      {/* <img alt="uploadImage" src={file} /> */}
    </Form>
  );
};
export default AddHeroForm;
