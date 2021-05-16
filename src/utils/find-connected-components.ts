import {Position} from "../types/types";

export type BinaryNumber = 0 | 1;

const getValidNeighbors = (matrix: BinaryNumber[][], row: number, column: number): Position[] => {
    const result = [];
    const positionNotOnRightBound = column < matrix[0].length - 1;
    const positionNotOnBottomBound = row < matrix.length - 1;
    const positionNotOnLeftBound = column > 0;
    const positionNotOnTopBound = row > 0;

    if (positionNotOnRightBound) {
        if (matrix[row][column + 1] === 1) result.push({row, column: column + 1});
    }
    if (positionNotOnLeftBound) {
        if (matrix[row][column - 1]) result.push({row, column: column - 1});
    }

    if (positionNotOnBottomBound) {
        if (matrix[row + 1][column] === 1) result.push({row: row + 1, column});
    }
    if (positionNotOnTopBound) {
        if (matrix[row - 1][column] === 1) result.push({row: row - 1, column});
    }

    return result;
};

export const findConnectedComponent =
    (matrix: BinaryNumber[][], rootPosition: Position, visitedMtx?: boolean[][]): Position[] => {
    const rows = matrix.length;
    const columns = matrix[0]?.length;

    if (!rows || !columns) {
        return [];
    }

    const {row, column} = rootPosition;
    const visitedMatrix: boolean[][] =
        visitedMtx || Array(rows).fill(false).map(row => Array(columns).fill(false));

    if (visitedMatrix[row][column]) {
        return [];
    }

    visitedMatrix[row][column] = true;
    const validNeighbors = getValidNeighbors(matrix, row, column);
    const connectedComponents = validNeighbors.reduce<Position[]>((acc, position) => {
        return [...acc, ...findConnectedComponent(matrix, position, visitedMatrix)]
    }, []);

    return [rootPosition, ...connectedComponents];
}