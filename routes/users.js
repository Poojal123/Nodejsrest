var express = require('express');  
var router = express.Router();
var user_controller = require('../controllers/user_controller');
var profile_controller = require('../controllers/profile_controller');
var child_controller = require('../controllers/child_controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/register",user_controller.registerUser);
router.get("/getUsers",user_controller.retriveUsers);
router.post("/getSemister",user_controller.retriveSemister);
router.post("/loginUser",user_controller.login);
router.post('/upload',profile_controller.uploadProfile)
router.post('/getProfile',profile_controller.getProfileDetails)
router.post('/uploadChild',child_controller.uploadChild)
router.post('/uploadChildPhotos',child_controller.uploadPhotosOfChild)
router.post('/getChildPhotos',child_controller.getPhotos)
router.post('/getAllChildrens',child_controller.getAllChildrens)
// router.post('/uploadChildPhotos',child_controller.uploadPhotosOfChild)
// router.post('/uploadChildPhotos',child_controller.uploadPhotosOfChild)
// router.post('/uploadChildPhotos',child_controller.uploadPhotosOfChild)
// router.post('/uploadChildPhotos',child_controller.uploadPhotosOfChild)
// router.post('/uploadChildPhotos',child_controller.uploadPhotosOfChild)
// router.post('/uploadChildPhotos',child_controller.uploadPhotosOfChild)


module.exports = router;
