var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller');
var profile_controller = require('../controllers/profile_controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/register",user_controller.registerUser);
router.get("/getUsers",user_controller.retriveUsers);
router.post("/getSemister",user_controller.retriveSemister);
router.post("/loginUser",profile_controller.upload);


router.post('/uploadProfile',)
module.exports = router;
