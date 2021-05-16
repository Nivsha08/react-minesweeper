import {Cell, GameConfiguration} from "../types/types";
import {CSSProperties} from "react";
import {CELL_SIZE_PX} from "../constants";
import {generateMinesPositions, getNumberOfNeighborMines, initCell} from "./game-utils";

export const initGridStyle = (rows: number, columns: number): CSSProperties => ({
    gridTemplateRows: `${CELL_SIZE_PX}px `.repeat(rows),
    gridTemplateColumns: `${CELL_SIZE_PX}px `.repeat(columns),
});

export const initGameConfiguration = (): GameConfiguration => ({
    rows: 8,
    columns: 12,
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