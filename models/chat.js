const mongo = require("mongoose");
const Schema = mongo.Schema;
const Chat = new Schema({
	data: [
		{
			name: String,
			msg: String,
		},
	],
});
module.exports = mongo.model("chat", Chat);
