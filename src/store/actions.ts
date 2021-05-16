import {useDispatch} from "react-redux";
import {Cell, GameConfiguration} from "../types/types";
import {useCallback} from "react";
import {reducers} from "./slice";
import {initGameConfiguration, initGameGrid} from "../utils/game-creator";

export const useActions = () => {
    const dispatch = useDispatch();

    const setGameConfiguration = useCallback((config: GameConfiguration) => {
        dispatch(reducers.setGameConfiguration(config));
    }, [dispatch]);

    const setGameIsStarted = useCallback(() => {
        dispatch(reducers.startGame());
    }, [dispatch]);

    const setGrid = useCallback((grid: Cell[][]) => {
        dispatch(reducers.setGrid(grid));
    }, [dispatch]);

    const initGame = useCallback(() => {
        const gameConfig = initGameConfiguration();
        const gameGrid = initGameGrid(gameConfig);
        setGameConfiguration(gameConfig);
        setGrid(gameGrid);
        setGameIsStarted();
    }, [setGameConfiguration, setGameIsStarted, setGrid]);

    const revealCell = useCallback((row: number, column: number) => {
            dispatch(reducers.revealCell({row, column}))
    }, [dispatch]);

    const setCellFlag = useCallback((row: number, column: number, flagged: boolean) => {
        flagged ?
            dispatch(reducers.flagCell({row, column}))
            : dispatch(reducers.unFlagCell({row, column}));
    }, [dispatch]);

    const incrementElapsedTime = useCallback(() => {
            dispatch(reducers.incrementElapsedTime())
    }, [dispatch]);

    const setGameIsOver = useCallback(() => {
        dispatch(reducers.endGame());
    }, [dispatch]);

    return {
        initGame,
        setGameConfiguration,
        setGameIsStarted,
        setGrid,
        revealCell,
        setCellFlag,
        incrementElapsedTime,
        setGameIsOver
    }
};