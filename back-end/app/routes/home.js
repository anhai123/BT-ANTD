// const express = require("express");
// const router = express.Router();

// router.get("/", async (req, res, next) => {
//   return res.status(200).json({
//     title: "Express Testing",
//     message: "The app is working properly!",
//   });
// });

// module.exports = router;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/home", (req, res) => {
    return res.status(200).json({
      title: "Express Testing",
      message: "The app is working properly!",
    });
  });
};
