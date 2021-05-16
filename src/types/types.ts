export type GameConfiguration = {
    rows: number;
    columns: number;
    numberOfMines: number;
};

export type Cell = {
    row: number;
    column: number;
    numberOfNeighborMines: number;
    isMine: boolean;
    flagged: boolean;
    unknown: boolean;
};

export type GameState = {
    grid: Cell[][];
    markedMines: number;
    gameIsOver: boolean;
    elapsedTime: number;
};