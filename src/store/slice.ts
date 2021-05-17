import {Cell, GameConfiguration, GameState, Position} from "../types/types";
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type MinesweeperState = {
    game: GameState;
    configuration: GameConfiguration;
}

export const initialState: MinesweeperState = {
    configuration: {
        rows: 0,
        columns: 0,
        numberOfMines: 0,
    },
    game: {
        grid: [],
        mines: [],
        markedMines: 0,
        gameIsStarted: false,
        elapsedTime: 0,
        gameIsOver: false
    }
};

export const slice = createSlice({
    name: 'minesweeper',
    initialState,
    reducers: {
        setGameConfiguration: (state, {payload}: PayloadAction<GameConfiguration>) => {
            state.configuration = payload;
        },
        startGame: (state) => {
            state.game.gameIsStarted = true;
            state.game.gameIsOver = false;
        },
        setGrid: (state, {payload}: PayloadAction<Cell[][]>) => {
            state.game.grid = payload;
        },
        setMines: (state, {payload}: PayloadAction<Position[]>) => {
            state.game.mines = payload;
        },
        incrementElapsedTime: (state) => {
            state.game.elapsedTime++;
        },
        revealCell: (state, {payload}: PayloadAction<Position>) => {
            const {row, column} = payload;
            state.game.grid[row][column].revealed = true;
        },
        flagCell: (state, {payload}: PayloadAction<Position>) => {
            const {row, column} = payload;
            state.game.grid[row][column].flagged = true;
        },
        unFlagCell: (state, {payload}: PayloadAction<Position>) => {
            const {row, column} = payload;
            state.game.grid[row][column].flagged = false;
        },
        endGame: (state) => {
            state.game.gameIsOver = true;
        },
    }
});

export const store = configureStore(slice);
export const reducers = slice.actions;