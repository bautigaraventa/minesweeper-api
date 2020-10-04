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
            const { rows, columns, mines, player } = req.body;
            const game = await mineSweeperService.startGame(rows, columns, mines, player);
            res.status(200).send(game);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    /**
     * Saves a finished game
     * @param req 
     * @param res 
     */
    public endGame = async (req: Request, res: Response) => {
        try {
            const { board, won, lost } = req.body;
            await mineSweeperService.endGame(req.params.id, board, won, lost);
            res.status(200).send();
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    /**
     * Saves the state of a game in progress
     * @param req 
     * @param res 
     */
    public pauseGame = async (req: Request, res: Response) => {
        try {
            await mineSweeperService.pauseGame(req.params.id, req.body.board);
            res.status(200).send();
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    /**
     * Returns a game in progress
     * @param req 
     * @param res 
     */
    public resumeGame = async (req: Request, res: Response) => {
        try {
            const game = await mineSweeperService.resumeGame(req.params.id);
            res.status(200).send(game);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    /**
     * Returns all games of a player
     * @param req 
     * @param res 
     */
    public getByPlayer = async (req: Request, res: Response) => {
        try {
            const games = await mineSweeperService.getByPlayer(req.params.player);
            res.status(200).send(games);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    //#endregion

}

export const mineSweeperController = new MineSweeperController();