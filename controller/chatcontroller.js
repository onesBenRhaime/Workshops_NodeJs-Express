const Chat = require("../models/chat");

async function addMsg(data) {
	try {
		const c = new Chat(data);
		await c.save();
		res.status(200).send("added");
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

module.exports = {
	add,
};
