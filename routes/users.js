var express = require("express");
const userControler = require("../controller/userController");

const validate = require("../middillware/validate");

const message = require("../models/message");
var router = express.Router();

//function mode async :
//await : ab9a istana can hiya tist7a9 wa9it : await user.find() => ta3ti wa9it lill find()
//setTimeout()//patch : takho  formes okhrin bikhlaf les type  simple : integer , boolean ...

router.get("/", function (req, res) {
	res.render("chat");
});
router.get("/get", userControler.getall);
router.get("/msg", userControler.getmsg);
router.post("/add", validate, userControler.add);
router.get("/getbyid/:id", userControler.getbyid);

router.get("/getbyname/:name", userControler.getbyname);
router.put("/update/:id", userControler.updateUser);

router.delete("/delete/:id", userControler.deleteUser);

module.exports = router;
