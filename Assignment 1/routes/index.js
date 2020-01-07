var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ian Fabs', list: [
    'Eggs',
    'Burritos',
    'JavaScript'
  ] });
});

module.exports = router;
