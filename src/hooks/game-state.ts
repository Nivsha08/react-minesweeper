import {useSelector} from "react-redux";
import {useSelectors} from "../store/selectors";

export const useGameIsStarted = () => {
    const {selectGameIsStarted} = useSelectors();
    return useSelector(selectGameIsStarted);
};

export const useGameGrid = () => {
    const {selectGrid} = useSelectors();
    return useSelector(selectGrid);
};