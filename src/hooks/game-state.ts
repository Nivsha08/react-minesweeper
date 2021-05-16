import {useSelector} from "react-redux";
import {useSelectors} from "../store/selectors";

export const useGameConfiguration = () => {
    const {selectGameConfiguration} = useSelectors();
    return useSelector(selectGameConfiguration);
};

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
