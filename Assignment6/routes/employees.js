let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Employee = require('../models/employee');

mongoose.connect('mongodb+srv://ianfabs:TheFabs4@cloudsettingscluster0-4anig.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('create', {title: "create"});
});

router.get('/view', async function(req, res) {
  let all = await Employee.find({});
  let headers = ["First Name", "Last Name", "Department", "Start Date", "Job Title", "Salary"];
  console.log(all);
  res.render('all', {title: "create", all, headers});
});

router.get('/create', function(req, res) {
  res.render('create', {title: "create"});
});

router.post('/create', async function(req, res, next) {
  // Mongo magic
  let newEmployee = new Employee({...req.body});
  try {
    let they = await newEmployee.save();
    res.redirect("/employees/view/"+they._id);
  } catch(err) {
    res.render("error", {...err})
  }
});

router.get('/update/:id', async (req, res) => {
  const {id} = req.params;
  let employee = await Employee.findById(id);
  if (employee) res.render('update', {title: "update", ...employee._doc});
  else res.render("error", {message: "A user with that ID does not exist"});
});

router.post('/update/:id', async (req, res) => {
  const {id} = req.params;
  await Employee.updateOne({_id: id}, { $set: req.body });
  res.redirect("/employees/view/"+id);
});

router.get('/delete/:id', async (req, res) => {
  const {id} = req.params;
  let employee = await Employee.findById(id);
  if (employee) res.render('delete', {title: "delete", ...employee._doc});
  else res.render("error", {message: "A user with that ID does not exist"});
});

router.post('/delete/:id', async (req, res) => {
  const {id} = req.params;
  let employee = await Employee.deleteOne({_id: id})
  if (employee) res.render("error", {title: "User Deleted", error: {status: "User deleted successfully"}})
  else res.render("error", {message: "A user with that ID does not exist"});
});

router.get('/view/:id', async (req, res) => {
  const {id} = req.params;
  let employee = await Employee.findById(id);
  if (employee) res.render('view', {title: "view", ...employee._doc});
  else res.render("error", {message: "A user with that ID does not exist"});
});

module.exports = router;
