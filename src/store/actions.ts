import {useDispatch} from "react-redux";
import {Cell, DifficultyLevel, GameConfiguration, Position} from "../types/types";
import {useCallback} from "react";
import {reducers} from "./slice";
import {initGameGrid} from "../utils/game-creator";
import {getConfigByDifficulty} from "../utils/difficulty-levels";

export const useActions = () => {
    const dispatch = useDispatch();

    const setGameConfiguration = useCallback((config: GameConfiguration) => {
        dispatch(reducers.setGameConfiguration(config));
    }, [dispatch]);

    const setGameIsStarted = useCallback((isStarted) => {
        dispatch(reducers.setGameIsStarted(isStarted));
    }, [dispatch]);

    const setGrid = useCallback((grid: Cell[][]) => {
        dispatch(reducers.setGrid(grid));
    }, [dispatch]);

    const setMines = useCallback((mines: Position[]) => {
        dispatch(reducers.setMines(mines));
    }, [dispatch]);

    const initGame = useCallback((difficulty: DifficultyLevel) => {
        const gameConfig = getConfigByDifficulty(difficulty);
        const {gameGrid, minePositions} = initGameGrid(gameConfig);
        setGameConfiguration(gameConfig);
        setGrid(gameGrid);
        setMines(minePositions);
        setGameIsStarted(true);
    }, [setGameConfiguration, setGameIsStarted, setGrid, setMines]);

    const setDifficultyLevel = useCallback((difficulty: DifficultyLevel) => {
        dispatch(reducers.setDifficultyLevel(difficulty));
    }, [dispatch]);

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
        setDifficultyLevel,
        initGame,
        setGameConfiguration,
        setGameIsStarted,
        setGrid,
        setMines,
        revealCell,
        setCellFlag,
        incrementElapsedTime,
        setGameIsOver
    }
};