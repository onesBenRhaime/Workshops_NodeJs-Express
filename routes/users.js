var express = require("express");
const User = require("../models/user");
var router = express.Router();

router.get("/", function (req, res) {
	res.send("Hello World!");
});
router.get("/:name/:email/:cin", function (req, res) {
	new User({
		name: req.params.name,
		emmail: req.params.email,
		cin: req.params.cin,
	}).save();
	res.send("TEST");
});
//function mode async
router.post("/add", async function (req, res) {
	try {
		console.log(req.body);
		const user1 = new User(req.body);
		await user1.save();
		res.status(200);
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

module.exports = router;
