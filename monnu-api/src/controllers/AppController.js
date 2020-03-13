import jwt from "jsonwebtoken";
import App from "../models/App";
import Validator from "../helpers/Validatorr";

class AppController {
    async store(req, res) {

        try {
            const {
                name,
                url,
                port,
            } = req.body;


            const validator = new Validator({
                "name.required": name,
                "url.required": url,
                "port.required": port,
            });

            if (validator.hasError()) return res.status(400).json(validator.errors);




            const app = await App.create({ name, url, port });

            return res.status(201).json(app);

        } catch (err) {
            return res
                .status(400)
                .json({ error: `Registration failed: ${err}` });

        }
    }

    async index(req, res) {
        try {
            const apps = await App.find();
            return res.json(apps);
        } catch (error) {
            return res.status(500).json({ error: error });
        }

    }
}

export default new AppController();