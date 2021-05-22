import {DifficultyLevel, GameConfiguration} from "../types/types";

const configByDifficulty: Record<DifficultyLevel, GameConfiguration & {
    cellSize: number;
}> = {
    easy: {
        rows: 8,
        columns: 10,
        numberOfMines: 10,
        cellSize: 45,
    },
    medium: {
        rows: 12,
        columns: 18,
        numberOfMines: 40,
        cellSize: 35,
    },
    hard: {
        rows: 14,
        columns: 25,
        numberOfMines: 75,
        cellSize: 35,
    }
};

export const getConfigByDifficulty = (difficulty: DifficultyLevel) => configByDifficulty[difficulty];