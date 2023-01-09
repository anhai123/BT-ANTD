const db = require("../models");
const hero = db.hero;
const path = require("path");
const fs = require("fs");
var ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

function setResHeader(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  ); // If needed
  res.setHeader("Access-Control-Allow-Credentials", true); // If needed
  return res;
}
exports.createNewHero = (req, res) => {
  res = setResHeader(res);
  // console.log("ten file day");
  // console.log(req.file.filename);
  // avatar: {
  //   data: fs.readFileSync(
  //     path.join(process.cwd() + "/uploads/" + req.file.filename)
  //   ),
  //   contentType: "image/jpeg",
  // },
  console.log(req.body);
  var Hero = {
    attackP: req.body.attackP,
    defendP: req.body.defendP,
    heroname: req.body.heroname,
    key: req.body.key,
    crit_damage: req.body.crit_damage,
    description: req.body.description,
    avatar: req.body.avatar,
  };
  hero.create(Hero, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log("luu vao dtb");
      res.json({ Hero });
    }
  });
};
exports.getAllHero = (req, res) => {
  res = setResHeader(res);
  hero.find({}, (err, hero) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send(hero);
    }
  });
};
exports.updateHero = (req, res) => {
  res = setResHeader(res);
  hero.findByIdAndUpdate(
    req.body._id,
    {
      attackP: req.body.attackP,
      defendP: req.body.defendP,
      heroname: req.body.heroname,
      key: req.body.key,
      crit_damage: req.body.crit_damage,
      description: req.body.description,
      avatar: req.body.avatar,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    }
  );
};
exports.deleteHero = (req, res) => {
  res = setResHeader(res);
  hero.findOneAndDelete(
    { _id: new mongoose.Types.ObjectId(req.query.ids) },
    (err, hero) => {
      if (!err) {
        res.json({ msg: "hero deleted", deleted: hero });
      } else {
        console.log("Error removing :" + err);
      }
    }
  );
};
