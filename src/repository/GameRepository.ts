import * as mongoose from 'mongoose';
var GameModel = mongoose.model('Game');

/**
 * Database access implementation for the game entity
 */
export class GameRepository {

    //#region Methods

    /**
     * Creates, stores and returns a Game
     * @param body Body to create a Game
     */
    create(body: any) {
        try {
            return GameModel.create(body);
        } catch (error) {
            throw new Error(`Error creating a Game`);
        }
    }

    /**
     * Updates and returns a Game
     * @param query Query to find the Game
     * @param body Body to set to the Game
     */
    updateOne(query: any, body: any) {
        try {
            return GameModel.updateOne(query, body);
        } catch (error) {
            throw new Error(`Error updating a Game`);
        }
    }

    /**
     * Finds and returns matching Game
     * @param query Query to match
     */
    find(query: any) {
        try {
            return GameModel.find(query);
        } catch (error) {
            throw new Error(`Error getting Games`);
        }
    }

    /**
     * Finds and returns first matching Game
     * @param query Query to match
     */
    findOne(query: any) {
        try {
            return GameModel.findOne(query);
        } catch (error) {
            throw new Error(`Error getting Game`);
        }
    }

    //#endregion

}

export const gameRepository = new GameRepository();