const mongo = require("mongoose");
const Schema = mongo.Schema;
const classroom = new Schema({
	nameClass: String,
	nbStudent: Number,
	salle: Number,
});
module.exports = mongo.model("classroom", classroom);
