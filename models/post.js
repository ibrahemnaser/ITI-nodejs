const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
