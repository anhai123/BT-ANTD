var multer = require("multer");
const controller = require("../controllers/hero");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.post("/hero/create", upload.single("avatar"), controller.createNewHero);
  app.post("/hero/create", upload.none(), controller.createNewHero);

  app.post("/hero/update", upload.none(), controller.updateHero);

  app.get("/hero/getAll", controller.getAllHero);

  app.delete("/hero/delete", controller.deleteHero);
};
