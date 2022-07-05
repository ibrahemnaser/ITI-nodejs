const express = require("express");
const router = express.Router();
const postModel = require("../models/post");

/************* */
// get method for getting all data or list them
router.get("/", function (req, res) {
	postModel
		.find({})
		.populate("author")
		.exec((err, post) => {
			if (!err) return res.json(post);
			res.json(err);
		});
});

// get method for getting data by id
router.get("/:id", function (req, res) {
	const id = req.params.id;
	postModel
		.find({ _id: id })
		.populate("author")
		.exec((err, post) => {
			if (!err) return res.json(post);
			res.json(err);
		});
});

////** */
router.post("/", function (req, res) {
	const postBody = req.body;
	const post = new postModel(postBody);
	post.save((err, savedPost) => {
		if (!err) return res.json(savedPost);
		console.log(err);
		res.status(500).json({ code: "DB_error" });
	});
});

router.put("/:id", function (req, res) {
	const id = req.params.id;
	const { title } = req.body;
	postModel.updateOne({ _id: id }, { title: title }, (err) => {
		if (!err) return res.json("done");
		res.json(err);
	});
});

router.delete("/:id", function (req, res) {
	const id = req.params.id;
	postModel.deleteOne({ _id: id }, (err) => {
		if (!err) return res.json("done");
		res.json(err);
	});
});

//Routes will go here
module.exports = router;
