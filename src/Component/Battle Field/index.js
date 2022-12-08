import {
  Card,
  Descriptions,
  Pagination,
  Alert,
  Result,
  Col,
  Row,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Sword } from "../Menu/icon";
import "./battlefield.css";
import SelectHero from "./Select hero";
const matchResult = ["War", "Peace"];
const BattleField = () => {
  const { heroList } = useSelector((state) => state.hero);
  const [isNavigate, setNavigate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [result, setResult] = useState(false);
  const [indexOfBattleHero, setIndexOfBattleHero] = useState([]);
  const [winner, setWinner] = useState();
  const [SelectedHero, setSelectedHero] = useState([]);
  const ur = useRef();
  useEffect(() => {
    if (heroList.length < 2) {
      setInterval(() => {
        setNavigate(true);
      }, 3000);
    }
    if (isModalOpen) {
      setInterval(() => {
        setIsModalOpen(false);
      }, 5000);
    }
  }, []);
  useEffect(() => {
    if (indexOfBattleHero.length == 2) {
      checkHeroWinBattle();
    }
  }, [indexOfBattleHero]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  //peace
  const handleOk = () => {
    setIsModalOpen(false);
    setResult(matchResult[1]);
  };

  //war
  const handleCancel = () => {
    setIsModalOpen(false);
    setResult(matchResult[0]);
    let heroIndex;
    while (indexOfBattleHero.length < 2) {
      let heroindexInstant = getRandomInt(heroList.length);
      if (heroIndex !== heroindexInstant) {
        heroIndex = heroindexInstant;
        indexOfBattleHero.push(heroIndex);
      }
    }
    setIndexOfBattleHero([...indexOfBattleHero]);
    checkHeroWinBattle();
  };
  const checkHeroWinBattle = () => {
    let Hero1 = heroList[indexOfBattleHero[0]];
    let Hero2 = heroList[indexOfBattleHero[1]];
    console.log(Hero1);
    let damageDoneByHero1 = Hero1.attackP - Hero2.defendP;
    let damageDoneByHero2 = Hero2.attackP - Hero1.defendP;
    let randomPercentageCrit = getRandomInt(100);
    if (randomPercentageCrit < Hero1.crit_damage) {
      damageDoneByHero1 = damageDoneByHero1 + Hero1.attackP;
      Hero1 = {
        ...Hero1,
        damagedone: damageDoneByHero1,
        other: damageDoneByHero2,
      };
    }
    if (randomPercentageCrit < Hero2.crit_damage) {
      damageDoneByHero2 = damageDoneByHero2 + Hero2.attackP;
      Hero2 = {
        ...Hero2,
        damagedone: damageDoneByHero2,
        other: damageDoneByHero1,
      };
    }
    if (damageDoneByHero1 === damageDoneByHero2) {
      setWinner();
    } else if (damageDoneByHero1 > damageDoneByHero2) {
      setWinner(Hero1);
      console.log(Hero1);
    } else setWinner(Hero2);
  };
  return (
    <>
      {heroList.length < 2 ? (
        <>
          <Alert
            message="Heroes are missing"
            description="Add at least 2 heroes to begin. Go back to add hero page in 3 second."
            type="error"
            showIcon
          />
          {isNavigate && (
            <Navigate
              to="/add-hero"
              state={{ current: "add_hero" }}
              replace={true}
            />
          )}
        </>
      ) : (
        <>
          <Modal
            title="Draw?"
            onOk={handleOk}
            onCancel={handleCancel}
            open={isModalOpen}
            cancelText={"No, more blood"}
            okText={"Angle decision"}
          >
            We do not have to fight each other. Let's make peace in 5 second or
            a war will begin.
          </Modal>

          {result === matchResult[1] && (
            <Result
              icon={<SmileOutlined />}
              title="Great, you're such a kind-hearted person"
              extra={<Button type="primary">Next</Button>}
            />
          )}
          {result === matchResult[0] && (
            <Result
              icon={<></>}
              title={
                <>
                  <Row>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                      {heroList[indexOfBattleHero[0]].heroname}
                      <br></br>
                      <Image
                        src={URL.createObjectURL(
                          heroList[indexOfBattleHero[0]].avatar.file
                            .originFileObj
                        )}
                      />
                    </Col>
                    <Col
                      xs={20}
                      sm={16}
                      md={12}
                      lg={8}
                      xl={4}
                      style={{ alignItems: "center" }}
                    >
                      <Sword
                        style={{
                          width: 20,
                          fontSize: 40,
                          position: "absolute",
                          top: " 50%",
                          left: " 50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                      {heroList[indexOfBattleHero[1]].heroname}
                      <br></br>
                      <Image
                        src={URL.createObjectURL(
                          heroList[indexOfBattleHero[1]].avatar.file
                            .originFileObj
                        )}
                      />
                    </Col>
                  </Row>
                  <br></br>
                  <br></br>
                  {/* <span>
                    War result: {winner.heroname} with {winner.damagedone} while
                    opponent only {winner.other}
                  </span> */}
                  {winner ? (
                    <span>
                      War result: The winner is {winner.heroname} with{" "}
                      {winner.damagedone} while opponent only {winner.other}
                    </span>
                  ) : (
                    <span> War result: Draw</span>
                  )}
                </>
              }
              extra={
                <>
                  <Button type="primary">Rebattle</Button>
                </>
              }
            />
          )}
          <SelectHero
            parentToChildrenForSelectHero={{ setIndexOfBattleHero }}
          />
        </>
      )}
    </>
  );
};
export default BattleField;
