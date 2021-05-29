import {Cell, DifficultyLevel, GameConfiguration} from "../types/types";
import {CSSProperties} from "react";
import {generateMinesPositions, getNumberOfNeighborMines, initCell} from "./game-utils";
import {getConfigByDifficulty} from "./difficulty-levels";

export const initGridStyle = (difficulty: DifficultyLevel): CSSProperties => {
    const {cellSize, rows, columns} = getConfigByDifficulty(difficulty);

    return {
        gridTemplateRows: `${cellSize}px `.repeat(rows),
        gridTemplateColumns: `${cellSize}px `.repeat(columns),
    }
};

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