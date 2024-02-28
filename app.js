// // /*package express pour cree une application express nodejs */
// // const express = require("express");
// // const http = require("http");
// // const mongoose = require("mongoose");
// // const bodyperser = require("body-parser");
// // const path = require("path");

// // const userRouter = require("./routes/users");
// // const classroomRouter = require("./routes/classroom");
// // const config = require("./config/dbConnection.json");
// // var app = express();
// // //views :  name of the folder  &&   will   __dirname  : ( ya3rif  path imta3 lfolder)
// // app.set("views", path.join(__dirname, "views"));
// // // set the view  to twig
// // app.set("view engine", "twig");

// // //connect to bd
// // mongoose
// // 	.connect(config.url, {
// // 		useNewUrlParser: true,
// // 		useUnifiedTopology: true,
// // 	})
// // 	.then(() => console.log("Connexion à MongoDB réussie !"))
// // 	.catch(() => console.log("Connexion à MongoDB échouée !"));

// // app.use(bodyperser.json());

// // //middleware
// // app.use("/user", userRouter);
// // app.use("/classroom", classroomRouter);

// // //server configuration
// // const server = http.createServer(app);

// // const io = require("socket.io")(server);

// // // open the flux of the socket
// // io.on("connection", (socket) => {
// // 	socket.emit("msg", "user is connected ");
// // 	//flux chat :
// // 	socket.on("typing", (data) => {
// // 		io.emit("typing", data);
// // 	});

// // 	socket.on("msg", (data) => {
// // 		//broadcast : 3la kol les users bich inty matrahich o khirik ayh
// // 		socket.broadcast.emit("msg", data + "is typing.....");
// // 	});

// // 	socket.on("disconnect", () => {
// // 		io.emit("msg", "user is disconnected");
// // 	});
// // });

// // server.listen(3000, () => {
// // 	console.log("Server is running on port 3000");
// // });

// // module.exports = app;
// //3ayatna lel express
// const express = require("express");
// const http = require("http");
// const mongo = require("mongoose");
// const bodyparser = require("body-parser");
// const config = require("./config/dbconnection.json");
// const chatControler = require("./controller/chatcontroller");

// //teba twig
// const path = require("path");
// mongo
// 	.connect(config.url, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})

// 	.then(() => console.log("database connected"))
// 	.catch(() => console.log("not connected"));

// //fichier router
// const userRouter = require("./routes/users");
// const classroomRouter = require("./routes/classroom");

// //creation d'un serveur const server=http.createServer(app)  server atineh app

// var app = express();

// //path folder views
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "twig");

// //ligne hethi dima tahet app=express()
// app.use(bodyparser.json());

// app.use("/user", userRouter);
// app.use("/classroom", classroomRouter);

// const server = http.createServer(app);

// // partie tawa socket yekho server eli samito fel ligne kbalha connection et // decoonection
// const io = require("socket.io")(server);
// io.on("connection", (socket) => {
// 	socket.emit("msg", "user is connected");

// 	//user deux users fazet ali is typing
// 	socket.on("typing", (data) => {
// 		chatControler.add(data);
// 		socket.broadcast.emit("typing", data + " is typing...");
// 	});

// 	socket.on("msg", (data) => {
// 		io.emit("msg", data);
// 		addMsg(data);
// 	});

// 	socket.on("disconnect", () => {
// 		io.emit("msg", "user is disconnect");
// 	});
// });

// server.listen(3000, console.log("server run"));
// //lezem exports bech ychoufouh kol
// module.exports = app;
const express = require("express");
const http = require("http");

const bodyparser = require("body-parser");

//db
const mongo = require("mongoose");
const config = require("./config/dbconnection.json");
mongo
	.connect(config.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("database connected"))
	.catch(() => console.log("not connected"));

const userRouter = require("./routes/users");
const classroomRouter = require("./routes/classroom");
const { join } = require("path");
const { addMessage } = require("./controller/messageController");

var app = express();
app.use(bodyparser.json());
app.set("views", join(__dirname, "views"));
app.set("view engine", "twig");

app.use("/users", userRouter);
app.use("/classroom", classroomRouter);

//server config
const server = http.createServer(app);
const io = require("socket.io")(server);
server.listen(3000, console.log("server is running"));

io.on("connection", (socket) => {
	socket.emit("message", "user is connected");

	socket.on("message", (data) => {
		addMessage(data).then((r) => console.log("message added" + r));
		io.emit("message", data);
	});
	socket.on("typing", (data) => {
		socket.broadcast.emit("typing", data);
	});

	socket.on("disconnect", () => {
		io.emit("message", "user is disconnected");
	});
});

module.exports = app;
