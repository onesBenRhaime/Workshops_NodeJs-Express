var express = require("express");
const classroomControler = require("../controller/classroomController");
const validate = require("../middillware/validate");
var router = express.Router();

//function mode async :
//await : ab9a istana can hiya tist7a9 wa9it : await user.find() => ta3ti wa9it lill find()
//setTimeout()

//patch : takho  formes okhrin bikhlaf les type  simple : integer , boolean ...
router.get("/get", classroomControler.getall);
router.post("/add", validate, classroomControler.add);
router.get("/getbyid/:id", classroomControler.getbyid);

router.get("/getbyname/:name", classroomControler.getbynameclass);
router.put("/update/:id", classroomControler.updateClassroom);

router.delete("/delete/:id", classroomControler.deleteClassroom);

module.exports = router;
