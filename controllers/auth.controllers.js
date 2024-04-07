const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const saltRounds = 10;

const signUp = async (req, res, next) => {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ errorMessages: "Provide email, password and fullName" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ errorMessages: "Provide a valid email address." });
        }

        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                errorMessages:
                    "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
            });
        }

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ errorMessages: "User already exists." });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ email, fullName, password: hashedPassword });
        if (newUser) {
            const { _id, email: userEmail, fullName: userfullName } = newUser;
            const user = { _id, email: userEmail, fullName: userfullName };
            return res.status(201).json(true);
        }

    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ errorMessages: "Provide email and password." });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ errorMessages: "User not found." });
        }

        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

        if (passwordCorrect) {
            const { _id, email: userEmail, fullName: userfullName } = foundUser;

            const payload = { _id, email: userEmail, fullName: userfullName };

            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: "6h",
            });

            return res.status(200).json(authToken);
        } else {
            return res.status(401).json({ errorMessages: "Unable to authenticate the user" });
        }
    } catch (error) {
        return next(error);
    }
};

const verify = (req, res, next) => {
    console.log(`req.payload`, req.payload);

    res.status(200).json(req.payload);
};

module.exports = {
    signUp,
    login,
    verify,
};
