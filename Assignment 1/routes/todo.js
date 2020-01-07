const express = require('express');
const router = express.Router();
const todos = require('../todo.json');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json(todos);
});

module.exports = router;
