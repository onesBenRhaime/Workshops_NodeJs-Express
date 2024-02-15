const mongo = require("mongoose");
const Schema = mongo.Schema;
const user = new Schema({
	name: String,
	email: String,
	cin: Number,
});
module.exports = mongo.model("user", user);
