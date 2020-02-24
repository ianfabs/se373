const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: Date,
    jobTitle: String,
    salary: Number
});

module.exports = model('Employee', employeeSchema);