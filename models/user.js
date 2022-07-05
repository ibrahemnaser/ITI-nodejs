const mongoose = require("mongoose");
const postModel = require("./post");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true, minLength: 5, maxLength: 20 },
	lastName: { type: String, required: true, minLength: 5, maxLength: 20 },
	email: {
		type: String,
		unique: [true, "enter a unique email"],
		match: /.+@.+\..+/,
	},
	dob: Date,
});

userSchema.methods.getFullName = function () {
	return this.firstName + " " + this.lastName;
};

userSchema.statics.getUsersByFullName = function (fullName, cb) {
	const [firstName, lastName] = fullName.split(" ");
	this.find({ firstName, lastName }, cb);
};

// to delete all posts of the deleted user  [pre/post MiddleWares]
userSchema.pre("remove", (err, user, next) => {
	postModel.findAndDelete({ author: this._id });
	next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
