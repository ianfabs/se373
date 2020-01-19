const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
global.fetch = fetch;
const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash({
  accessKey: "efa9a69bdb797a4284e3caa1a53bda45780941b5bebb69fc2c8384048d797a5d"
});

router.get("/", async (req, res, next) => {
  let randomPhoto = await unsplash.photos.getRandomPhoto({ query: "white" });
  randomPhoto = await randomPhoto.json();
  res.render("about", {
    title: "About",
    random: {
      src: randomPhoto.urls.raw,
      width: randomPhoto.width / 4,
      height: randomPhoto.height / 4
    }
  });
});

module.exports = router;
