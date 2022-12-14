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
  message,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { UploadOutlined, PaperClipOutlined } from "@ant-design/icons";
import { resizeFile } from "..";
import "./HeroDes.css";
import {
  updateHeroList,
  deleteHero,
  updateHero,
  deleteHeroAPI,
} from "../../feature/heroSlice";
const { Header, Footer, Sider, Content } = Layout;
const key = "updatable";
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
    // console.log(file);
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
    // console.log(values);
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
  const handelClickDeleteHeroButton = (key, data) => {
    // console.log(data);
    dispatcher(deleteHeroAPI(data._id));
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      // console.log(row);
      let newData;
      if (key === "avatar") {
        let hero = await resizeFile(row.avatar.file.originFileObj).then(
          (uri) => {
            let hero1 = { ...data, avatar: uri };
            return hero1;
          }
        );
        newData = hero;
      } else {
        newData = { ...data };
        newData[key] = row[key];
        // console.log(newData);
      }
      // console.log(newData);
      dispatcher(updateHeroList(newData));
      dispatcher(updateHero(newData));
      setTimeout(() => {
        message.success({
          content: "C???p nh???t th??ng tin nh??n v???t th??nh c??ng",
          key,
          duration: 2,
        });
      }, 1000);
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

  //?????m b???o quay l???i trang hero list m?? d??? li???u trong list ???? ???????c c???p nh???t
  useEffect(() => {
    if (data === undefined) {
      setTimeout(() => {
        message.success({
          content: "X??a nh??n v???t th??nh c??ng",
          key,
          duration: 2,
        });
      }, 1000);
      setHeroDeleteYet(true);
    }
    return () => redirect("/hero-list");
  }, [data]);

  const origindata = data !== undefined ? Object.entries(data) : [];
  if (HeroDeleteYet) {
    setTimeout(() => {
      message.success({
        content: "X??a nh??n v???t th??nh c??ng",
        key,
        duration: 2,
      });
    }, 1000);
    navigate("/hero-list", { replace: true });
  }
  const ChoseName = (data) => {
    let name;
    switch (data) {
      case "heroname":
        name = "T??n nh??n v???t:";
        break;
      case "avatar":
        name = "???nh ?????i di???n:";
        break;
      case "description":
        name = "Mi??u t???:";
        break;
      case "attackP":
        name = "??i???m t???n c??ng:";
        break;
      case "defendP":
        name = "??i???m ph??ng th???:";
        break;
      case "crit_damage":
        name = "T??? l??? ch?? m???ng:";
        break;
      default:
      // code block
    }
    return <p>{name}</p>;
  };

  return (
    data && (
      <div className="description-containner">
        <Image className="image" src={data.avatar} />

        <Form
          form={form}
          style={{ width: "40%" }}
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
                if (!["key", "__v", "_id"].includes(data[0])) {
                  if (data[0] === editingKey) {
                    const inputNode =
                      data[0] === ("attackP" || "defendP" || "crit_damage") ? (
                        <InputNumber />
                      ) : data[0] === "crit_damage" ? (
                        <InputNumber
                          defaultValue={100}
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value) => value.replace("%", "")}
                        />
                      ) : data[0] === "avatar" ? (
                        <Upload
                          {...props}
                          fileList={stateUpload.selectedFileList}
                          customRequest={dummyRequest}
                        >
                          <Button icon={<UploadOutlined />}>
                            Ch???n ???nh m???i
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
                              message: `H??y nh???p ${data[0]}!`,
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
                            L??u thay ?????i
                          </Typography.Link>
                          <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={cancel}
                          >
                            <a>Ho??n thay ?????i</a>
                          </Popconfirm>
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={data[0]} style={{ marginBottom: "20px" }}>
                      <div style={{ width: "40%", display: "inline-block" }}>
                        {ChoseName(data[0])}
                      </div>
                      <div style={{ display: "inline-block" }}>
                        {data[0] === "avatar" ? (
                          <>
                            <PaperClipOutlined />
                            ???nh ?????i di???n
                          </>
                        ) : (
                          data[1]
                        )}
                      </div>

                      <Button
                        style={{ position: "absolute", right: "0%" }}
                        className="edit-button"
                        onClick={() => handelClickEditButton(data[0])}
                      >
                        Ch???nh s???a
                      </Button>
                    </li>
                  );
                }
              })}
            </ul>

            <Button
              style={{ marginLeft: "40px" }}
              onClick={() => handelClickDeleteHeroButton(data["key"], data)}
            >
              X??a nh??n v???t
            </Button>
          </Card>
        </Form>
      </div>
    )
  );
};
export default HeroDes;
