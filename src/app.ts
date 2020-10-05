import * as express from "express";
import * as bodyParser from "body-parser";
import { mineSweeperRoutes } from "./routes/MineSweeperRoutes";
import * as mongoose from 'mongoose';
import * as cors from 'cors';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // Database
        mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true });

        this.app.use(cors());
        
        // support application/json
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Routing
        this.app.use("/", mineSweeperRoutes);
    }
}

export default new App().app;