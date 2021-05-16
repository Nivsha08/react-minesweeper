import {Cell, GameConfiguration} from "../types/types";
import {CSSProperties, useState} from "react";
import {CELL_SIZE_PX} from "../constants";

const initCell = (row: number, column: number, isMine: boolean = false): Cell => ({
    row,
    column,
    isMine,
    numberOfNeighborMines: 0,
    flagged: false,
    unknown: false
});

const initGrid = (rows: number, columns: number, numberOfMines: number): Cell[][] => {
    const grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push(initCell(i, j));
        }
    }

    return grid;
};

const getGridStyle = (rows: number, columns: number): CSSProperties => ({
    gridTemplateRows: `${CELL_SIZE_PX}px `.repeat(rows),
    gridTemplateColumns: `${CELL_SIZE_PX}px `.repeat(columns),
});

export const useGameGrid = (gameConfig: GameConfiguration) => {
    const {rows, columns, numberOfMines} = gameConfig;
    const gridStyle = getGridStyle(rows, columns);

    const [gameGrid, setGameGrid] = useState<Cell[][]>(initGrid(rows, columns, numberOfMines));

    return {
        gameGrid,
        setGameGrid,
        gridStyle
    }
};