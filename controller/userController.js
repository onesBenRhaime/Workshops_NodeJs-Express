const User = require("../models/user");
const Message = require("../models/user");

async function add(req, res) {
	try {
		console.log(req.body);
		const user1 = new User(req.body);
		await user1.save();
		res.send("added");
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
async function getall(req, res) {
	try {
		const data = await User.find();
		res.status(200).send(data);
	} catch (error) {
		res.status(400).json;
	}
}
async function getmsg(req, res) {
	try {
		const data = await Message.find();
		res.status(200).send(data);
	} catch (error) {
		res.status(400).json;
	}
}
async function getbyname(req, res) {
	try {
		let name = req.params.name;
		/// lazim {object } ==> khatro non define fil moongoos
		const data = await User.findOne({ name });
		res.status(200).send(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
async function getbyid(req, res) {
	try {
		const data = await User.findOne(req.params.id);
		res.status(200).send(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
async function updateUser(req, res) {
	try {
		const data = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
async function deleteUser(req, res) {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("deleted");
	} catch (error) {
		res.status(400).json(error);
	}
}
module.exports = {
	add,
	getall,
	getbyid,
	getbyname,
	updateUser,
	deleteUser,
	getmsg,
};
