import User from "../models/user";
// import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	try {
		// console.log(req.body);
		const { name, email, password } = req.body;

		// validation
		if (!name) return res.status(400).send("Поле 'имя' обязательно");
		if (!password || password.length < 6) {
			return res.status(400).send("Password is required and should be min 6 characters long");
		}
		let userExist = await User.findOne({ email }).exec();
		if (userExist) return res.status(400).send("Email is taken");

		// register
		const user = await new User({
			name,
			email,
			password,
		});
		await user.save();

		console.log(`Saved user ${user}`);
		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again.");
	}
};

export const login = async (req, res) => {
	try {
		// console.log(req.body)
		const { email, password } = req.body;
		// check if our db has user with that email
		const user = await User.findOne({ email }).exec();
		if (!user) return res.status(400).send("Пользователь не найден");
		// check password
		const match = password === user.password;
		// create signed jwt
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
		// return user and token to client, exlude hashed password
		user.password = undefined;
		// send token in cookie
		res.cookie("token", token, {
			httpOnly: true,
			// secure: true
		});
		// send user as json response
		res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again -_-");
	}
};

export const logout = (req, res) => {
	try {
		res.clearCookie("token");
		return res.json({ message: "Вы вышли из личного кабинета" });
	} catch (err) {
		console.log(err);
	}
};

export const currentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password").exec();
		console.log("CURRENT_USER", user);
		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
	}
};