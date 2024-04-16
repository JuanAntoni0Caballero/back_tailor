const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const saltRounds = 10;

const signUp = async (req, res, next) => {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ errorMessages: ["Nombre, email y contraseña requeridos."] });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ errorMessages: ["Email no válido."] });
        }

        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                errorMessages:
                    ["La contraseña debe contener al menos 6 carácteres y contener al menos un número, una minúscula y una mayúscula."],
            });
        }

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ errorMessages: ["Usuario ya registrado."] });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ email, fullName, password: hashedPassword });
        if (newUser) {
            console.log(`newUser`, newUser);
            const { _id, email: userEmail, fullName: userfullName } = newUser;
            const user = { _id, email: userEmail, fullName: userfullName };
            return res.status(201).json(user);
        }

    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ errorMessages: ["Rellena los campos de email y contraseña."] });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ errorMessages: ["Usuario no encontrado."] });
        }

        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

        if (passwordCorrect) {
            const { _id, email: userEmail, fullName: userfullName, favoritedRestaurants } = foundUser;

            const payload = { _id, email: userEmail, fullName: userfullName, favoritedRestaurants };

            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: "6h",
            });

            return res.status(200).json(authToken);
        } else {
            return res.status(401).json({ errorMessages: ["Imposible reconocer al usuario."] });
        }
    } catch (error) {
        return next(error);
    }
};

const verify = (req, res, next) => {
    res.status(200).json(req.payload);
};

module.exports = {
    signUp,
    login,
    verify,
};
