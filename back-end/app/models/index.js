const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const hero = require("./hero");
const db = {};
db.mongoose = mongoose;
db.hero = hero;
module.exports = db;
