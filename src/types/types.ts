export type Position = {
    row: number;
    column: number;
}

export type GameConfiguration = {
    rows: number;
    columns: number;
    numberOfMines: number;
};

export type Cell = Position & {
    isMine: boolean;
    revealed: boolean;
    flagged: boolean;
    numberOfNeighborMines: number;
};

export type GameState = {
    grid: Cell[][];
    markedMines: number;
    gameIsStarted: boolean;
    elapsedTime: number;
    gameIsOver: boolean;
};