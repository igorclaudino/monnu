import jwt from "jsonwebtoken";
import App from "../models/App";

class AppController {
    async store(req, res) {
        const {
            name,
            url,
            port,
        } = req.body;
        if (!name || !url || !port)
            return res.status(400).json({
                error: "Name, url and port are required."
            });

        try {

            const app = await App.create({ name, url, port });

            return res.status(201).json(app);

        } catch (err) {
            return res
                .status(400)
                .json({ error: `Registration failed: ${err}` });

        }
    }

    async index(req, res) {
        const apps = await App.find();
        return res.json(apps);
    }
}

export default new AppController();