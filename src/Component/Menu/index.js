import { UnorderedListOutlined } from "@ant-design/icons";
import { AddIcon, StadiumIcon } from "./icon";
import { Menu } from "antd";
import React, { useState } from "react";
import AddHeroForm from "../AddHeroForm";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
  Link,
} from "react-router-dom";
const items = [
  {
    label: (
      <span>
        <Link to="/add-hero">Add hero</Link>
      </span>
    ),
    key: "add_hero",
    icon: <AddIcon style={{ width: 20, fontSize: 23 }} />,
  },
  {
    label: (
      <span>
        <Link to="/hero-list">Hero list</Link>
      </span>
    ),
    key: "hero_list",
    icon: <UnorderedListOutlined style={{ width: 20, fontSize: 23 }} />,
  },
  {
    label: (
      <span>
        <Link to="/battle-field">Hero list</Link>
      </span>
    ),
    key: "battle_field",
    icon: <StadiumIcon style={{ width: 20, fontSize: 23 }} />,
  },
];
const Menuu = () => {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e.key);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ display: "flex", justifyContent: "center" }}
      />
    </>
  );
};
export default Menuu;
