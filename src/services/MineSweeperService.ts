import { gameRepository } from "../repository/GameRepository";

/**
 * Mine sweeper Service to manage extra functionalities
 */
export class MineSweeperService {

    //#region Methods

    /**
     * Generates a new game and returns it
     */
    public startGame = (): any => {
        try {
            const newBoard: number[][] = this.generateBoard();
            const mines: number = 10;
            const won: boolean = false;
            const lost: boolean = false;

            return {
                board: newBoard,
                mines,
                won,
                lost
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a new board
     * @param rows number of rows in the board
     * @param columns number of columns in the board
     * @param mines number of mines in the board
     */
    private generateBoard = (rows: number = 10, columns: number = 10, mines: number = 10): number[][] => {
        try {
            const board: number[][] = this.initializeBoard(rows, columns);

            const { boardWithMines, addedMines } = this.addMines(board, mines);

            const filledBoard: number[][] = this.addHints(boardWithMines, addedMines);

            const formattedBoard: any[] = this.formatBoard(filledBoard);

            return formattedBoard;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns an empty board based on rows and columns
     * @param rows number of rows for the board
     * @param columns number of columns for the board
     */
    private initializeBoard = (rows: number, columns: number): number[][] => {
        try {
            const board: number[][] = [];
            for (let r = 0; r < rows; r++) {
                const newColumns = [];

                for (let c = 0; c < columns; c++) {
                    newColumns[c] = 0;
                }

                board[r] = newColumns;
            }

            return board;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates random mines for a board
     * @param board current board
     * @param mines mines quantity to add
     */
    private addMines = (board: number[][], mines: number): { boardWithMines: number[][], addedMines: number[][] } => {
        try {
            const boardWithMines: number[][] = [...board];
            const addedMines: number[][] = [];

            for (let m = 0; m < mines; m++) {
                let mineAlreadyExists = true;
                while (mineAlreadyExists) {
                    const mineRow = Math.floor(Math.random() * boardWithMines.length);
                    const mineColumn = Math.floor(Math.random() * boardWithMines[0].length);
                    if (boardWithMines[mineRow][mineColumn] !== -1) {
                        boardWithMines[mineRow][mineColumn] = -1;
                        addedMines.push([mineRow, mineColumn]);
                        mineAlreadyExists = false;
                    }
                }
            }

            return {
                boardWithMines,
                addedMines,
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates the numbers on each cell
     * @param board current board
     * @param minesPositions the positions of the mines
     */
    private addHints = (board: number[][], minesPositions: number[][]): number[][] => {
        try {
            minesPositions.forEach(minePosition => {
                const mineRow = minePosition[0];
                const mineColumn = minePosition[1];

                const aroundPositions = [
                    { x: mineRow - 1, y: mineColumn - 1 },
                    { x: mineRow - 1, y: mineColumn },
                    { x: mineRow - 1, y: mineColumn + 1 },
                    { x: mineRow, y: mineColumn - 1 },
                    { x: mineRow, y: mineColumn + 1 },
                    { x: mineRow + 1, y: mineColumn - 1 },
                    { x: mineRow + 1, y: mineColumn },
                    { x: mineRow + 1, y: mineColumn + 1 },
                ]

                aroundPositions.forEach(position => {
                    const cell = board[position.x]?.[position.y];
                    if (cell > -1) {
                        board[position.x][position.y] = board[position.x][position.y] + 1;
                    }
                });
            });

            return board;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates an object for each cell in the board
     * @param board current board
     */
    private formatBoard = (board: number[][]): any[] => {
        try {
            const formattedBoard = board.map(b => {
                return b.map(c => {
                    return {
                        value: c,
                        isQuestioned: false,
                        isFlagged: false,
                        isRevealed: false,
                    }
                })
            });

            return formattedBoard;
        } catch (error) {
            throw error;
        }
    }

    //#endregion

}

export const mineSweeperService = new MineSweeperService();
