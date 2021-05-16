import {Cell, Position} from "../types/types";
import {BinaryNumber, findConnectedComponent} from "./find-connected-components";

export const generateRandomPosition = (maxRow: number, maxColumn: number): Position => ({
    row: Math.floor(Math.random() * maxRow),
    column: Math.floor(Math.random() * maxColumn),
});

export const generateMinesPositions = (numberOfMines: number, maxRow: number, maxColumn: number): Position[] => {
    const positions: Position[] = [];
    for (let i = 0; i < numberOfMines; i++) {
        let position = generateRandomPosition(maxRow, maxColumn);
        // eslint-disable-next-line no-loop-func
        while (positions.find(p => position.row === p.row && position.column === p.column)) {
            position = generateRandomPosition(maxRow, maxColumn);
        }
        positions.push(position);
    }

    return positions;
};

export const initCell = (row: number, column: number, isMine: boolean = false): Cell => ({
    row,
    column,
    isMine,
    revealed: false,
    flagged: false,
    numberOfNeighborMines: 0,
});

export const getNumberOfNeighborMines = (grid: Cell[][], row: number, column: number): number => {
    let result = 0;
    const cellNotOnRightBound = column < grid[0].length - 1;
    const cellNotOnBottomBound = row < grid.length - 1;
    const cellNotOnLeftBound = column > 0;
    const cellNotOnTopBound = row > 0;

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

export const getAllZeroNeighborsCells = (grid: Cell[][], rootCell: Cell): Cell[] => {
    const {row, column} = rootCell;
    const binaryMatrix = grid
        .map(row => row
            .map(cell => Number(cell.numberOfNeighborMines === 0) as BinaryNumber));

    const connectedComponentPositions = findConnectedComponent(binaryMatrix, { row, column });
    return connectedComponentPositions.map(({row, column}) => grid[row][column]);
};