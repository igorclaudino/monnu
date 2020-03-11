import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

mongoose.connect(
    `mongodb://localhost/monnu`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
    return res.json({ ok: true });
})

app.listen(3333);