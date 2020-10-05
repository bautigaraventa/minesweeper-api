import { MineSweeperService } from './MineSweeperService';
import { gameRepository } from '../repository/GameRepository';
jest.mock('mongoose')
let mineSweeperServiceMock: MineSweeperService;

beforeEach(() => {
    mineSweeperServiceMock = new MineSweeperService();
});

describe('Function: startGame', () => {

    it('Given rows, columns, mines and player, should call gameRepository.create once', async (done) => {
        // Arrange
        const rowsDummy = 10;
        const columnsDummy = 10;
        const minesDummy = 10;
        const playerDummy = "player";
        gameRepository.create = jest.fn();

        // Act
        try {
            await mineSweeperServiceMock.startGame(rowsDummy, columnsDummy, minesDummy, playerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.create).toBeCalledTimes(1);
        done()
    });

    it('Given rows, columns, mines and player, should call gameRepository.create with the board generated and the other params', async (done) => {
        // Arrange
        const rowsDummy = 10;
        const columnsDummy = 10;
        const minesDummy = 10;
        const playerDummy = "player";
        const boardDummy = [[{ value: "1" }]]
        mineSweeperServiceMock['generateBoard'] = jest.fn().mockReturnValue(boardDummy);
        gameRepository.create = jest.fn();
        const gameDummy = {
            board: boardDummy,
            mines: minesDummy,
            won: false,
            lost: false,
            player: playerDummy,
            timer: 0,
        }

        // Act
        try {
            await mineSweeperServiceMock.startGame(rowsDummy, columnsDummy, minesDummy, playerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.create).toBeCalledWith(gameDummy);
        done()
    });

});

describe('Function: endGame', () => {

    it('Given id, board, won, lost and timer, should call gameRepository.updateOne once', async (done) => {
        // Arrange
        const idDummy = "123";
        const boardDummy = [[{ value: "1" }]];
        const wonDummy = true;
        const lostDummy = false;
        const timerDummy = 20;
        gameRepository.updateOne = jest.fn();

        // Act
        try {
            await mineSweeperServiceMock.endGame(idDummy, boardDummy, wonDummy, lostDummy, timerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.updateOne).toBeCalledTimes(1);
        done()
    });

    it('Given id, board, won, lost and timer, should call gameRepository.updateOne with those parameters', async (done) => {
        // Arrange
        const idDummy = "123";
        const boardDummy = [[{ value: "1" }]];
        const wonDummy = true;
        const lostDummy = false;
        const timerDummy = 20;
        gameRepository.updateOne = jest.fn();
        const queryDummy = { _id: idDummy };
        const updateDummy = {
            $set: {
                board: boardDummy,
                won: wonDummy,
                lost: lostDummy,
                timer: timerDummy,
            }
        }

        // Act
        try {
            await mineSweeperServiceMock.endGame(idDummy, boardDummy, wonDummy, lostDummy, timerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.updateOne).toBeCalledWith(queryDummy, updateDummy);
        done()
    });

});

describe('Function: pauseGame', () => {

    it('Given id, board and timer, should call gameRepository.updateOne once', async (done) => {
        // Arrange
        const idDummy = "123";
        const boardDummy = [[{ value: "1" }]];
        const timerDummy = 20;
        gameRepository.updateOne = jest.fn();

        // Act
        try {
            await mineSweeperServiceMock.pauseGame(idDummy, boardDummy, timerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.updateOne).toBeCalledTimes(1);
        done()
    });

    it('Given id, board and timer, should call gameRepository.updateOne with those parameters', async (done) => {
        // Arrange
        const idDummy = "123";
        const boardDummy = [[{ value: "1" }]];
        const timerDummy = 20;
        gameRepository.updateOne = jest.fn();
        const queryDummy = { _id: idDummy };
        const updateDummy = {
            $set: {
                board: boardDummy,
                timer: timerDummy,
            }
        }

        // Act
        try {
            await mineSweeperServiceMock.pauseGame(idDummy, boardDummy, timerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.updateOne).toBeCalledWith(queryDummy, updateDummy);
        done()
    });

});

describe('Function: resumeGame', () => {

    it('Given id, should call gameRepository.findOne once', async (done) => {
        // Arrange
        const idDummy = "123";
        gameRepository.findOne = jest.fn();

        // Act
        try {
            await mineSweeperServiceMock.resumeGame(idDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.findOne).toBeCalledTimes(1);
        done()
    });

    it('Given id, should call gameRepository.findOne with that id', async (done) => {
        // Arrange
        const idDummy = "123";
        gameRepository.findOne = jest.fn();
        const queryDummy = { _id: idDummy };

        // Act
        try {
            await mineSweeperServiceMock.resumeGame(idDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.findOne).toBeCalledWith(queryDummy);
        done()
    });

});

describe('Function: getByPlayer', () => {

    it('Given player, should call gameRepository.find once', async (done) => {
        // Arrange
        const playerDummy = "bauti";
        gameRepository.find = jest.fn();

        // Act
        try {
            await mineSweeperServiceMock.getByPlayer(playerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.find).toBeCalledTimes(1);
        done()
    });

    it('Given player, should call gameRepository.find with that name as parameter', async (done) => {
        // Arrange
        const playerDummy = "bauti";
        gameRepository.findOne = jest.fn();
        const queryDummy = {
            player: playerDummy,
            won: false,
            lost: false,
        };

        // Act
        try {
            await mineSweeperServiceMock.getByPlayer(playerDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(gameRepository.find).toBeCalledWith(queryDummy);
        done()
    });

});

describe('Function: generateBoard', () => {

    it('Given rows, columns and mines, should return a board with those qty of rows', async (done) => {
        // Arrange
        const rowsDummy = 8;
        const columnsDummy = 10;
        const minesDummy = 12;
        let result;

        // Act
        try {
            result = await mineSweeperServiceMock['generateBoard'](rowsDummy, columnsDummy, minesDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result.length).toEqual(rowsDummy);
        done()
    });

    it('Given rows, columns and mines, should return a board with those qty of columns', async (done) => {
        // Arrange
        const rowsDummy = 8;
        const columnsDummy = 10;
        const minesDummy = 12;
        let result;

        // Act
        try {
            result = await mineSweeperServiceMock['generateBoard'](rowsDummy, columnsDummy, minesDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result[0].length).toEqual(columnsDummy);
        done()
    });

    it('Given rows, columns and mines, should return a board with those qty of mines', async (done) => {
        // Arrange
        const rowsDummy = 8;
        const columnsDummy = 10;
        const minesDummy = 12;
        let result;

        // Act
        try {
            const board = await mineSweeperServiceMock['generateBoard'](rowsDummy, columnsDummy, minesDummy);
            result = board.map(b => {
                return b.filter((c: any) => c.value === -1);
            }).flat();
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result.length).toEqual(minesDummy);
        done()
    });

});

describe('Function: initializeBoard', () => {

    it('Given rows and columns should return a board with those qty of rows', async (done) => {
        // Arrange
        const rowsDummy = 8;
        const columnsDummy = 10;
        let result;

        // Act
        try {
            result = await mineSweeperServiceMock['initializeBoard'](rowsDummy, columnsDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result.length).toEqual(rowsDummy);
        done()
    });

    it('Given rows and columns should return a board with those qty of columns', async (done) => {
        // Arrange
        const rowsDummy = 8;
        const columnsDummy = 10;
        let result;

        // Act
        try {
            result = await mineSweeperServiceMock['initializeBoard'](rowsDummy, columnsDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result[0].length).toEqual(columnsDummy);
        done()
    });

});