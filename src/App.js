import { Button, Popconfirm } from "antd";
import React from "react";
import Menu from "./Component/Menu";
import AddHeroForm from "./Component/AddHeroForm";
import HeroList from "./Component/HeroList";
import HeroDes from "./Component/HeroDes";
import BattleField from "./Component/Battle Field";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/add-hero/" element={<AddHeroForm />} />
          <Route path="/hero-list" element={<HeroList />} />
          <Route path="/hero-description" element={<HeroDes />} />
          <Route path="/battle-field" element={<BattleField />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
