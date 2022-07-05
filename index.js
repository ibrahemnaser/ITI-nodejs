const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const userRouters = require("./routes/users");
const postRouters = require("./routes/posts");
const app = express();
app.use(express.json());
//
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
	flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
//
app.use(["/user", "/users"], userRouters);
app.use(["/post", "/posts"], postRouters);

mongoose.connect("mongodb://127.0.0.1:27017/myBlog", (err) => {
	if (!err) return console.log("successful connection to db");
	console.log(err);
});

app.listen(8080, (err) => {
	if (!err) return console.log("server starts on port: 8080");
	console.log(err);
});
/***************** */
