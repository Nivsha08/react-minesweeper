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

export const initGameGrid = (gameConfig: GameConfiguration) => {
    const {rows, columns, numberOfMines} = gameConfig;
    const minePositions = generateMinesPositions(numberOfMines, rows - 1, columns - 1);
    const gameGrid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
        gameGrid.push([]);
        for (let j = 0; j < columns; j++) {
            gameGrid[i].push(initCell(i, j));
        }
    }

    minePositions.forEach(({row, column}) => {
        gameGrid[row][column].isMine = true;
    });

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            gameGrid[i][j].numberOfNeighborMines = getNumberOfNeighborMines(gameGrid, i, j);
        }
    }

    return {
        gameGrid,
        minePositions
    };
};