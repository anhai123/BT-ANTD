import { Card, Descriptions, Pagination } from "antd";
import "./heroList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const { Meta } = Card;
const pageSize = 8;
const HeroList = () => {
  const dispatcher = useDispatch();
  const { heroList } = useSelector((state) => state.hero);

  const [state, setState] = useState({
    heroList,
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  const { updateHero: updateHero } = useSelector((state) => state.hero);
  const [singleHero, setSingleHero] = useState();
  const handleClickImageEvent = (e) => {
    if (updateHero) {
      console.log(updateHero);
      setSingleHero(updateHero);
    } else {
      console.log(e);
      setSingleHero(e);
    }
  };
  useEffect(() => {
    setState({
      heroList,
      totalPage: heroList.length / pageSize,
      minIndex: 0,
      maxIndex: pageSize,
    });
    console.log(state);
  }, [heroList]);
  const handleChange = (page) => {
    setState({
      heroList,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  return (
    <div className="site-card-border-less-wrapper">
      {singleHero ? (
        <Navigate to="/hero-description" state={singleHero} replace={true} />
      ) : (
        heroList.map(
          (hero, index) =>
            index >= state.minIndex &&
            index < state.maxIndex && (
              <Card
                hoverable
                bordered={true}
                className="card-layout"
                cover={
                  <img
                    alt="example"
                    src={hero.avatar}
                    className="postImage"
                    onClick={() => handleClickImageEvent(hero)}
                  />
                }
              >
                <Meta
                  title={hero.heroname}
                  description={
                    <>
                      <p>Điểm tấn công: {hero.attackP}</p>
                      <p>Điểm phòng thủ: {hero.defend}</p>
                      <p>Tỉ lệ chí mạng: {hero.crit_damage}</p>
                    </>
                  }
                />
              </Card>
            )
        )
      )}
      <Pagination
        pageSize={pageSize}
        current={state.current}
        total={state.heroList.length}
        onChange={handleChange}
        style={{ marginTop: "6rem", bottom: "0px !important" }}
      />
    </div>
  );
};
export default HeroList;
