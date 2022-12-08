import Icon from "@ant-design/icons";
import { ReactComponent as addSvg } from "../../SVG/addIcon.svg";
import { ReactComponent as stadium } from "../../SVG/stadium.svg";
import { ReactComponent as sword } from "../../SVG/sword.svg";
export const AddIcon = (props) => {
  return <Icon component={addSvg} {...props} />;
};

export const StadiumIcon = (props) => {
  return <Icon component={stadium} {...props} />;
};

export const Sword = (props) => {
  return <Icon component={sword} {...props} />;
};
