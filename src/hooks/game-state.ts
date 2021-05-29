import {useSelector} from "react-redux";
import {useSelectors} from "../store/selectors";
import {useGameConfiguration} from "./game-configuration";

export const useGameIsStarted = () => {
    const {selectGameIsStarted} = useSelectors();
    return useSelector(selectGameIsStarted);
};

export const useElapsedTime = () => {
    const {selectElapsedTime} = useSelectors();
    return useSelector(selectElapsedTime);
};

export const useGameGrid = () => {
    const {selectGrid} = useSelectors();
    return useSelector(selectGrid);
};

export const useMinesPositions = () => {
    const {selectMines} = useSelectors();
    return useSelector(selectMines);
};

export const useNonMineCells = () => {
    const grid = useGameGrid();
    return grid.reduce((nonMineCells, row) => {
        nonMineCells.push(...row.filter(cell => !cell.isMine))
        return nonMineCells;
    }, []);
};

export const useFlaggedCells = () => {
    const grid = useGameGrid();
    return grid.reduce((flaggedCells, row) => {
        flaggedCells.push(...row.filter(cell => cell.flagged))
        return flaggedCells;
    }, []);
};

export const useIsPlayerWon = () => {
    const {numberOfMines} = useGameConfiguration();
    const nonMineCells = useNonMineCells();
    const flaggedCells = useFlaggedCells();

    return flaggedCells.length === numberOfMines
        && nonMineCells.every(cell => cell.revealed)
        && flaggedCells.every(cell => cell.isMine);
};

export const useGameIsOver = () => {
    const {selectGameIsOver} = useSelectors();
    return useSelector(selectGameIsOver);
};