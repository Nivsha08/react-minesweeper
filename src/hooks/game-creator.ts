import {Cell, GameConfiguration, Position} from "../types/types";
import {CSSProperties} from "react";
import {CELL_SIZE_PX} from "../constants";

const generateRandomPosition = (maxRow: number, maxColumn: number): Position => ({
    row: Math.floor(Math.random() * maxRow),
    column: Math.floor(Math.random() * maxColumn),
});

const generateMinesPositions = (numberOfMines: number, maxRow: number, maxColumn: number): Position[] => {
    const positions: Position[] = [];
    for (let i = 0; i < numberOfMines; i++) {
        let position = generateRandomPosition(maxRow, maxColumn);
        while (positions.find(p => position.row === p.row && position.column === p.column)) {
            position = generateRandomPosition(maxRow, maxColumn);
        }
        positions.push(position);
    }

    return positions;
};

const initCell = (row: number, column: number, isMine: boolean = false): Cell => ({
    row,
    column,
    isMine,
    numberOfNeighborMines: 0,
    flagged: false,
});

const getNumberOfNeighborMines = (grid: Cell[][], row: number, column: number): number => {
    let result = 0;
    const cellNotOnRightBound = column < grid[0].length - 1;
    const cellNotOnBottomBound = row < grid.length - 1;
    const cellNotOnLeftBound = column > 1;
    const cellNotOnTopBound = row > 1;

    if (cellNotOnRightBound) {
        result += grid[row][column + 1].isMine ? 1 : 0;
    }
    if (cellNotOnLeftBound) {
        result += grid[row][column - 1].isMine ? 1 : 0;
    }

    if (cellNotOnBottomBound) {
        result += grid[row + 1][column].isMine ? 1 : 0;
        if (cellNotOnRightBound) {
            result += grid[row + 1][column + 1].isMine ? 1 : 0;
        }
        if (cellNotOnLeftBound) {
            result += grid[row + 1][column - 1].isMine ? 1 : 0;
        }
    }
    if (cellNotOnTopBound) {
        result += grid[row - 1][column].isMine ? 1 : 0;
        if (cellNotOnRightBound) {
            result += grid[row - 1][column + 1].isMine ? 1 : 0;
        }
        if (cellNotOnLeftBound) {
            result += grid[row - 1][column - 1].isMine ? 1 : 0;
        }
    }

    return result;
};

export const initGridStyle = (rows: number, columns: number): CSSProperties => ({
    gridTemplateRows: `${CELL_SIZE_PX}px `.repeat(rows),
    gridTemplateColumns: `${CELL_SIZE_PX}px `.repeat(columns),
});

export const initGameConfiguration = (): GameConfiguration => ({
    rows: 10,
    columns: 15,
    numberOfMines: 20
});

export const initGameGrid = (gameConfig: GameConfiguration): Cell[][] => {
    const {rows, columns, numberOfMines} = gameConfig;
    const minePositions = generateMinesPositions(numberOfMines, rows - 1, columns - 1);
    const grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push(initCell(i, j));
        }
    }

    minePositions.forEach(({row, column}) => {
        grid[row][column].isMine = true;
    });

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            grid[i][j].numberOfNeighborMines = getNumberOfNeighborMines(grid, i, j);
        }
    }

    return grid;
};