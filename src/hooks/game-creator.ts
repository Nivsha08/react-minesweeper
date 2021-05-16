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
    })

    return grid;
};