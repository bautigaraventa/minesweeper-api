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
            mineSweeperValidator.startGame,
            mineSweeperController.startGame,
        );

        this.router.put(
            `/end-game/:id`,
            mineSweeperValidator.endGame,
            mineSweeperController.endGame,
        );

        this.router.put(
            `/pause-game/:id`,
            mineSweeperValidator.pauseGame,
            mineSweeperController.pauseGame,
        );

        this.router.get(
            `/resume-game/:id`,
            mineSweeperValidator.resumeGame,
            mineSweeperController.resumeGame,
        );

        this.router.get(
            `/games/:player`,
            mineSweeperValidator.getByPlayer,
            mineSweeperController.getByPlayer,
        );

    }
}

export const mineSweeperRoutes = new MineSweeperRoutes().router;