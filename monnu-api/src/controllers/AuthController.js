import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Validator from "../helpers/Validator";


class AuthController {
    async register(req, res) {

        const {
            name,
            email,
            password,
        } = req.body;
        const data = {};


        const validator = new Validator({
            "name.required": name,
            "email.required": email,
            "password.required": password,
        });

        if (validator.hasError()) return res.status(400).json(validator.errors);


        data.name = name;
        data.email = email;
        data.password = password;
        try {
            const userFromDb = await User.findOne({ email });
            if (userFromDb)
                return res.status(409).json({
                    error: "E-mail is already in use."
                });

            const user = await User.create({ ...data });

            user.password = undefined;

            return res.status(201).json({
                user,
                token: jwt.sign({ id: user._id }, process.env.APP_SECRET, {
                    expiresIn: 86400
                })
            });
        } catch (err) {
            return res
                .status(400)
                .json({ error: `Registration failed: ${err}` });

        }
    }

    async login(req, res) {

        try {
            const { email, password } = req.body;

            const validator = new Validator({
                "email.required": email,
                "password.required": password,
            });

            if (validator.hasError()) return res.status(400).json(validator.errors);

            const user = await User.findOne({ email }).select("+password");

            if (!user) return res.status(401).json({ error: "User not found" });

            if (!(await bcrypt.compare(password, user.password)))
                return res.status(401).json({ error: "Invalid password" });

            user.password = undefined;

            return res.json({
                user,
                token: jwt.sign({ id: user._id }, process.env.APP_SECRET, {
                    expiresIn: 86400
                })
            });

        } catch (error) {
            return res.status(500).json({error: error});
        }



    }
}

export default new AuthController();