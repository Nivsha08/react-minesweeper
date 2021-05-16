import {useDispatch} from "react-redux";
import {Cell} from "../types/types";
import {useCallback} from "react";
import {reducers} from "./slice";

export const useActions = () => {
    const dispatch = useDispatch();

    const setGameIsStarted = useCallback(() => {
        dispatch(reducers.startGame());
    }, [dispatch]);

    const setGrid = useCallback((grid: Cell[][]) => {
        dispatch(reducers.setGrid(grid));
    }, [dispatch]);

    const setCellFlag = useCallback((row: number, column: number, flagged: boolean) => {
        flagged ?
            dispatch(reducers.flagCell({row, column}))
            : dispatch(reducers.unFlagCell({row, column}));
    }, [dispatch])

    const incrementElapsedTime = useCallback(() => {
            dispatch(reducers.incrementElapsedTime())
    }, [dispatch])

    const setGameIsOver = useCallback(() => {
        dispatch(reducers.endGame());
    }, [dispatch]);

    return {
        setGameIsStarted,
        setGrid,
        setCellFlag,
        incrementElapsedTime,
        setGameIsOver
    }
};