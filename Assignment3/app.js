const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const rholor = require("rholor");

const indexRouter = require("./routes/index");
const colorsRouter = require("./routes/colors");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
hbs.registerPartials(__dirname + "/views/partials");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerHelper("color", n => {
  let table = "";
  for (let i = 0; i < n; i++) {
    for (let i = 0; i < n; i++) {
      let color = rholor();
      table += `<div style="background-color: #${color};" class="color"><span class="black-text">#${color}</span><span class="white-text">${color}</span></div>`;
    }
  }
  return new hbs.handlebars.SafeString(
    `<div style='display: grid;grid-template-columns: repeat(${n}, 75px);'>${table}</div>`
  );
});
app.set("view engine", "hbs");

hbs.registerHelper("404", () => {
  let n = Math.floor(Math.random() * (50 - 20) + 20);
  let grid = "";
  for (let i = 0; i < n; i++) {
    for (let i = 0; i < n; i++) {
      let options = ["shrink", "rotate", "still"];
      grid += `<div class="${
        options[Math.floor(Math.random() * 10) % 3]
      }">404</div>`;
    }
  }
  return new hbs.handlebars.SafeString(
    `<div style='display: grid;grid-template-columns: repeat(auto-fill, 200px);'>${grid}</div>`
  );
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/colors", colorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
