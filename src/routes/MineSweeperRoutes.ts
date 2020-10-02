import * as express from "express";
import { mineSweeperController } from "../controllers/MineSweeperController";
import { mineSweeperValidator } from '../validators/MineSweeperValidators';

class MineSweeperRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.init();
    }

    private init(): void {

    }
}

export const mineSweeperRoutes = new MineSweeperRoutes().router;