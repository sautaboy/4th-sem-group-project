var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/user", function (req, res, next) {
  res.render("user")
})



router.get("/semister", function (req, res, next) {
  res.render("semister")
})


module.exports = router;
