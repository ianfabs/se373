let path = require('path');
let logger = require('morgan');
let express = require('express');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let hbs = require('hbs');

let indexRouter = require('./routes/index');
let employeesRouter = require('./routes/employees');

let app = express();

hbs.registerHelper('formatDate', (date) => {
  let it = new Date(date);
  return `${it.getFullYear()}-${it.getMonth().toString().padStart(2, "0")}-${it.getDate().toString()}`
});

hbs.registerHelper('displayDate', (date) => {
  let it = new Date(date);
  return it.toLocaleDateString();
});
hbs.registerHelper('formatCurrency', function(value) {
  return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
});

hbs.registerHelper('capit', (string) => [...string].map((v,i)=>i==0?v.toUpperCase():v).join(""));

let pages = [
  "view",
  "update",
  "delete",
  "create"
];

hbs.registerHelper("nav", (page, id) => {
  let links = pages.map( p => p != page ? `<a href="/employees/${p}/${id}">${p}</a>` : `<span>${p}</span>` ).join(" | ");
  console.log(links);
  return hbs.handlebars.SafeString(`<nav>${links}</nav>`);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
