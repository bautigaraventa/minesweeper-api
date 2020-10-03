import { Request, Response } from "express";
import { mineSweeperService } from "../services/MineSweeperService";

/**
 * Mine sweeper Controller to handle all API routes
 */
export class MineSweeperController {

    //#region Methods

    /**
     * Generates a new game and returns it
     * @param req 
     * @param res 
     */
    public startGame = async (req: Request, res: Response) => {
        try {
            const newGame = mineSweeperService.startGame();
            res.status(200).send({ newGame });
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    //#endregion

}

export const mineSweeperController = new MineSweeperController();