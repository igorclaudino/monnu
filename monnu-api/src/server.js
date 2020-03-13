import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.get("/", (req, res) => {
    return res.json({ ok: true });
})

app.listen(3333);