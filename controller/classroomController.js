const Classroom = require("../models/classroom");

async function add(req, res) {
	try {
		const c = new Classroom(req.body);
		await c.save();
		res.status(200).send("added");
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
async function getall(req, res) {
	try {
		const data = await Classroom.find();
		res.status(200).send(data);
	} catch (error) {
		res.status(400).json;
	}
}
async function getbynameclass(req, res) {
	try {
		let name = req.params.name;
		/// lazim {object } ==> khatro non define fil moongoos
		const data = await Classroom.findOne({ name });
		res.status(200).send(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
async function getbyid(req, res) {
	try {
		const data = await Classroom.findOne(req.params.id);
		res.status(200).send(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
async function updateClassroom(req, res) {
	try {
		const data = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
async function deleteClassroom(req, res) {
	try {
		await Classroom.findByIdAndDelete(req.params.id);
		res.status(200).json("deleted");
	} catch (error) {
		res.status(400).json(error);
	}
}


module.exports = {
	add,
	getall,
	getbyid,
	getbynameclass,
	updateClassroom,
	deleteClassroom,
};
