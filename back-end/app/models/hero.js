const mongoose = require("mongoose");
const HeroInfor = mongoose.model(
  "HeroInfor",
  new mongoose.Schema({
    attackP: Number,
    defendP: Number,
    heroname: String,
    description: String,
    // avatar: {
    //   data: Buffer,
    //   contentType: String,
    // },
    avatar: String,
    key: String,
    crit_damage: Number,
  })
);
module.exports = HeroInfor;
