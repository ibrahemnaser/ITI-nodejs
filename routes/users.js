const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

/************* */
// get method for getting all data or list them
router.get("/", async function (req, res) {
	// userModel.getUsersByFullName("Mohsen Ashraf", (err, users) => {
	// 	console.log(users);
	// });
	// userModel.find({}, (err, user) => {
	// 	if (!err) return res.json(user);
	// 	res.json(err);
	// });
	try {
		const users = await userModel.find({});
		res.json(users);
	} catch {
		res.json(err);
	}
});

// get method for getting data by id
router.get("/:id", async function (req, res) {
	const id = req.params.id;
	// userModel.find({ _id: id }, (err, user) => {
	// 	if (!err) return res.json(user);
	// 	res.json(err);
	// });
	try {
		const users = await userModel.find({ _id: id });
		res.json(users);
	} catch {
		res.json(err);
	}
});

////** */
router.post("/", async function (req, res) {
	const userBody = req.body;
	const user = new userModel(userBody);
	// console.log(user.getFullName());
	// user.save((err, savedUser) => {
	// 	if (!err) return res.json(savedUser);
	// 	console.log(err);
	// 	res.status(500).json({ code: "DB_error" });
	// });
	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch {
		res.status(500).json({ code: "DB_error" });
	}
});

router.put("/:id", async function (req, res) {
	const id = req.params.id;
	const { firstName: fName, lastName: lName, email, dob } = req.body;

	// userModel.updateOne(
	// 	{ _id: id },
	// 	{ firstName: fName, lastName: lName, email: email, dob: dob },
	// 	(err) => {
	// 		if (!err) return res.json("done");
	// 		res.json(err);
	// 	}
	// );
	try {
		await userModel.updateOne(
			{ _id: id },
			{ firstName: fName, lastName: lName, email: email, dob: dob }
		);
		res.json("updated");
	} catch {
		res.json(err);
	}
});

router.delete("/:id", async function (req, res) {
	const id = req.params.id;
	// userModel.deleteOne({ _id: id }, (err) => {
	// 	if (!err) return res.json("done");
	// 	res.json(err);
	// });
	try {
		await userModel.deleteOne({ _id: id });
		res.json("deleted");
	} catch {
		res.json(err);
	}
});

//Routes will go here
module.exports = router;
