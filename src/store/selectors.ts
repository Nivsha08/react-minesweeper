import {createSelector} from "@reduxjs/toolkit";
import {MinesweeperState} from "./slice";

export const useSelectors = () => {
    const selectState = (state: MinesweeperState) => state;
    const selectGameState = (state: MinesweeperState) => state.game;
    const selectGameConfiguration = createSelector(selectState, (state) => state.configuration);
    const selectGameIsStarted = createSelector(selectGameState, (state) => state.gameIsStarted);
    const selectGrid = createSelector(selectGameState, (state) => state.grid);
    const selectElapsedTime = createSelector(selectGameState, (state) => state.elapsedTime);
    const selectGameIsOver = createSelector(selectGameState, (state) => state.gameIsOver);

    return {
        selectGameConfiguration,
        selectGameIsStarted,
        selectElapsedTime,
        selectGrid,
        selectGameIsOver
    }
};