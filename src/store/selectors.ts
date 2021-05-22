import {createSelector} from "@reduxjs/toolkit";
import {MinesweeperState} from "./slice";

export const useSelectors = () => {
    const selectState = (state: MinesweeperState) => state;
    const selectGameState = (state: MinesweeperState) => state.game;
    const selectDifficultyLevel = createSelector(selectState, (state) => state.difficulty);
    const selectGameConfiguration = createSelector(selectState, (state) => state.configuration);
    const selectGameIsStarted = createSelector(selectGameState, (state) => state.gameIsStarted);
    const selectGrid = createSelector(selectGameState, (state) => state.grid);
    const selectMines = createSelector(selectGameState, (state) => state.mines);
    const selectElapsedTime = createSelector(selectGameState, (state) => state.elapsedTime);
    const selectGameIsOver = createSelector(selectGameState, (state) => state.gameIsOver);

    return {
        selectDifficultyLevel,
        selectGameConfiguration,
        selectGameIsStarted,
        selectElapsedTime,
        selectGrid,
        selectMines,
        selectGameIsOver
    }
};