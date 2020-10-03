import * as express from "express";
import { mineSweeperController } from "../controllers/MineSweeperController";
import { mineSweeperValidator } from '../validators/MineSweeperValidators';

class MineSweeperRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.init();
    }

    private init(): void {

        this.router.post(
            `/start-game`,
            // mineSweeperValidator.startGame,
            mineSweeperController.startGame,
        );

    }
}

export const mineSweeperRoutes = new MineSweeperRoutes().router;