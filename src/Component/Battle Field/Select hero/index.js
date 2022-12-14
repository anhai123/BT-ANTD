import React, { useEffect, useState } from "react";
import { Avatar, List, message, Card, Checkbox } from "antd";
import VirtualList from "rc-virtual-list";
import { useDispatch, useSelector } from "react-redux";

const ContainerHeight = 400;
const SelectHero = ({ parentToChildrenForSelectHero, clickRebattle }) => {
  const { heroList } = useSelector((state) => state.hero);
  const [newSelectedHero, setNewSelectedHero] = useState([]);
  const onChange = (e, key) => {
    let index = heroList.findIndex((hero) => hero.key === key);
    if (e.target.checked === true && newSelectedHero.length < 2) {
      newSelectedHero.push(index);
      setNewSelectedHero([...newSelectedHero]);
    }
    if (e.target.checked === false) {
      setNewSelectedHero(
        newSelectedHero.filter(function (ele) {
          return ele !== index;
        })
      );
    }
  };
  useEffect(() => {
    console.log(clickRebattle.clickRebattle);
    if (newSelectedHero.length === 2 && clickRebattle.clickRebattle) {
      parentToChildrenForSelectHero.setIndexOfBattleHero([...newSelectedHero]);
    } else if (newSelectedHero.length > 2) {
      message.error("Chỉ được chọn 2 nhân vật thôi");
    }
  }, [newSelectedHero, clickRebattle.clickRebattle]);
  return (
    <Card
      title="Chọn 2 nhân vật khác để bắt đầu trận chiến mới"
      style={{
        width: 400,
        height: 500,
        left: " 50%",
        transform: "translate(-50%, 0%)",
      }}
    >
      <List>
        <VirtualList
          data={heroList}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"

          // onScroll={onScroll}
        >
          {(item, index) => (
            <List.Item key={item.key}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="https://ant.design">{item.heroname}</a>}
                description={item.description}
              />
              <div>
                Chọn{"        "}
                <Checkbox
                  disabled={
                    newSelectedHero.length >= 2 &&
                    !newSelectedHero.includes(index)
                  }
                  onChange={(e) => onChange(e, item.key)}
                ></Checkbox>
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </Card>
  );
};
export default SelectHero;
