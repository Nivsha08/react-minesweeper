import {Cell, GameState, Position} from "../types/types";
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: GameState = {
    grid: [],
    markedMines: 0,
    gameIsStarted: false,
    elapsedTime: 0,
    gameIsOver: false
};

export const slice = createSlice({
    name: 'minesweeper',
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameIsStarted = true;
        },
        setGrid: (state, {payload}: PayloadAction<Cell[][]>) => {
            state.grid = payload;
        },
        incrementElapsedTime: (state) => {
            state.elapsedTime++;
        },
        flagCell: (state, {payload}: PayloadAction<Position>) => {
            const {row, column} = payload;
            state.grid[row][column].flagged = true;
        },
        unFlagCell: (state, {payload}: PayloadAction<Position>) => {
            const {row, column} = payload;
            state.grid[row][column].flagged = false;
        },
        endGame: (state) => {
            state.gameIsOver = true;
        },
    }
});

export const store = configureStore(slice);
export const reducers = slice.actions;