const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("form", { title: "Form" });
});

router.post("/results", function(req, res, next) {
  res.render("formResults", { title: "Results", form: { ...req.body } });
});

module.exports = router;
