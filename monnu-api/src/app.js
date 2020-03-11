import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

class App {

    constructor() {
        this.express = express();

        this.connectToMongo();
        this.middleware();
    }


    connectToMongo() {
        mongoose.connect(
            `mongodb://localhost/monnu`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        )

    }

    middleware() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(routes);
    }


}

export default new App().express;