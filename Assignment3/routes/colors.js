var express = require("express");
var router = express.Router();

/* GET home page. */
router.all("/", (req, res) => {
  res.render("colors", { title: "Colors", n: req.body.n || 3 });
});

module.exports = router;
