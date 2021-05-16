import {GameState} from "../types/types";
import {createSelector} from "@reduxjs/toolkit";

export const useSelectors = () => {
    const selectState = (state: GameState) => state;
    const selectGameIsStarted = createSelector(selectState, (state) => state.gameIsStarted);
    const selectGrid = createSelector(selectState, (state) => state.grid);
    const selectElapsedTime = createSelector(selectState, (state) => state.elapsedTime);
    const selectGameIsOver = createSelector(selectState, (state) => state.gameIsOver);

    return {
        selectGameIsStarted,
        selectElapsedTime,
        selectGrid,
        selectGameIsOver
    }
};