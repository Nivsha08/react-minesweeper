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
    numberOfNeighborMines: number;
    isMine: boolean;
    flagged: boolean;
};

export type GameState = {
    grid: Cell[][];
    markedMines: number;
    gameIsStarted: boolean;
    elapsedTime: number;
    gameIsOver: boolean;
};