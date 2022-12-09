import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, redirect, useNavigate } from "react-router-dom";
import {
  Layout,
  Image,
  Card,
  Form,
  Button,
  List,
  Skeleton,
  Input,
  InputNumber,
  Typography,
  Popconfirm,
  Upload,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { UploadOutlined, PaperClipOutlined } from "@ant-design/icons";

import "./HeroDes.css";
import { updateHeroList, deleteHero } from "../../feature/heroSlice";
const { Header, Footer, Sider, Content } = Layout;
const HeroDes = () => {
  let { state } = useLocation();
  let navigate = useNavigate();
  const { heroList } = useSelector((state) => state.hero);
  const [form] = Form.useForm();
  const dispatcher = useDispatch();
  const [data, setData] = useState(
    heroList.find((hero) => hero.key === state.key)
  );
  const [editingKey, setEditingKey] = useState("");
  const [stateUpload, setState] = useState({
    selectedFile: null,
    selectedFileList: [],
  });
  const [HeroDeleteYet, setHeroDeleteYet] = useState(false);
  const dummyRequest = ({ file, onSuccess }) => {
    console.log(file);
    // const url = URL.createObjectURL(file);
    // setFile(url);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const props = {
    name: "file",
    onChange(info) {
      const nextState = {};
      switch (info.file.status) {
        case "uploading":
          nextState.selectedFileList = [info.file];
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

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handelClickEditButton = (values) => {
    console.log(values);
    form.setFieldsValue({
      heroname: "",
      description: "",
      attackP: "",
      defendP: "",
      crit_damage: "",
      avatar: "",
      [values]: data[values],
    });
    setEditingKey(values);
  };
  const handelClickDeleteHeroButton = (key) => {
    setHeroDeleteYet(true);
    dispatcher(deleteHero(key));
  };
  const save = async (key) => {
    // console.log()
    try {
      const row = await form.validateFields();

      const newData = { ...data };
      newData[key] = row[key];
      dispatcher(updateHeroList(newData));
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    setData(heroList.find((hero) => hero.key === state.key));
  }, [form.getFieldsValue()]);
  if (data == null || data == undefined) {
    return redirect("/hero-list");
  }
  const origindata = Object.entries(data);
  if (HeroDeleteYet) {
    // dispatch(getAllUserPost())
    navigate("/hero-list", { replace: true });
  }
  return (
    <div className="description-containner">
      <Image
        className="image"
        src={URL.createObjectURL(data.avatar.file.originFileObj)}
      />

      <Form
        form={form}
        style={{ paddingTop: 40, width: "35%" }}
        name="basic"
        labelCol={{
          span: 30,
        }}
        wrapperCol={{
          span: 30,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Card title={data.heroname} bordered={false}>
          <ul style={{ listStyleType: "none" }}>
            {origindata.map((data) => {
              if (data[0] !== "key") {
                if (data[0] === editingKey) {
                  const inputNode =
                    data[0] === ("attackP" || "defendP" || "crit_damage") ? (
                      <InputNumber />
                    ) : data[0] === "avatar" ? (
                      <Upload
                        {...props}
                        fileList={stateUpload.selectedFileList}
                        customRequest={dummyRequest}
                      >
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    ) : (
                      <Input />
                    );
                  return (
                    <li key={data[0]}>
                      <span>{data[0]}:</span>
                      <Form.Item
                        name={data[0]}
                        style={{
                          margin: 0,
                        }}
                        rules={[
                          {
                            required: true,
                            message: `Please Input ${data[0]}!`,
                          },
                        ]}
                      >
                        {inputNode}
                      </Form.Item>
                      <span>
                        <Typography.Link
                          onClick={() => save(data[0])}
                          style={{
                            marginRight: 8,
                          }}
                        >
                          Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          <a>Cancel</a>
                        </Popconfirm>
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={data[0]} style={{ marginBottom: "20px" }}>
                    <div style={{ width: "40%", display: "inline-block" }}>
                      {data[0]}:
                    </div>
                    <div style={{ display: "inline-block" }}>
                      {data[0] === "avatar" ? (
                        <>
                          <PaperClipOutlined />
                          {data[1].file.name}
                        </>
                      ) : (
                        data[1]
                      )}
                    </div>

                    <Button
                      style={{ position: "absolute", right: "-10%" }}
                      className="edit-button"
                      onClick={() => handelClickEditButton(data[0])}
                    >
                      edit
                    </Button>
                  </li>
                );
              }
            })}
          </ul>

          <Form.Item
            name={data[0]}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${data[0]}!`,
              },
            ]}
          ></Form.Item>

          <Button onClick={() => handelClickDeleteHeroButton(data["key"])}>
            Delete hero
          </Button>
        </Card>
      </Form>
    </div>
  );
};
export default HeroDes;
